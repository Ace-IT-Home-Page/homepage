from typing import Optional
import os

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

from database.connection import get_db  # 세션을 반환하는 Depends 함수
from database.orm import Download

router = APIRouter(prefix="/download")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

BASE_DOWNLOAD_DIR = os.path.abspath(os.path.join(BASE_DIR, "../../../download"))


@router.get("")
def get_downloads(db: Session = Depends(get_db)):
    """
    (1) 전체 다운로드 목록 조회 (GET /download)
        - download 테이블에 있는 모든 레코드를 리스트로 반환
    """
    data_list = db.query(Download).all()
    return data_list


@router.get("/{download_code}")
def get_download_info(download_code: int, db: Session = Depends(get_db)):
    """
    (2) 단건 다운로드 메타정보 조회 (GET /download/{download_code})
        - download_code가 일치하는 파일의 정보를 JSON으로 반환
    """
    data: Optional[Download] = (
        db.query(Download)
        .filter(Download.download_code == download_code)
        .first()
    )
    if data is None:
        raise HTTPException(status_code=404, detail="Not Found")

    return {
        "download_id": data.download_id,
        "download_name": data.download_name,
        "file_name": data.file_name,
        "file_path": data.file_path,
    }


@router.get("/file/{download_id}")
def download_file(download_id: int, db: Session = Depends(get_db)):
    """
    (3) 일반 파일 다운로드 (GET /download/file/{download_id})
        - DB에서 download_id로 조회 후, 해당 파일을 StreamingResponse로 전송
        - 파일 확장자가 PDF가 아니라면 이 엔드포인트를 사용해도 무방
    """
    data: Optional[Download] = (
        db.query(Download)
        .filter(Download.download_id == download_id)
        .first()
    )

    if data is None:
        raise HTTPException(status_code=404, detail="File metadata not found")
    if not data.file_name:
        raise HTTPException(status_code=400, detail="File name is empty")

    # 파일 전체 경로
    file_path = os.path.join(BASE_DOWNLOAD_DIR, data.file_name)
    print(BASE_DOWNLOAD_DIR)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")

    # 실제로 파일을 조금씩 읽어오는 제너레이터
    def file_iterator(fp, chunk_size=1024 * 1024):
        with open(fp, "rb") as f:
            while True:
                chunk = f.read(chunk_size)
                if not chunk:
                    break
                yield chunk

    download_filename = data.file_name

    # 파일 스트리밍 응답
    return StreamingResponse(
        file_iterator(file_path),
        media_type="application/octet-stream",
        headers={
            "Content-Disposition": f'attachment; filename="{download_filename}"',
            "Access-Control-Expose-Headers": "Content-Disposition"
        }
    )
