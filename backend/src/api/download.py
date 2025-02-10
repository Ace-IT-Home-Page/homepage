from typing import Optional
import os

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse, StreamingResponse
from sqlalchemy.orm import Session

from database.connection import get_db  # 세션을 반환하는 Depends 함수
from database.orm import Download

# 엔드포인트 라우터
router = APIRouter(prefix="/download")

# 현재 파일이 존재하는 디렉토리 기준, 다운로드 경로 설정
BASE_DIR = os.path.normpath(os.path.join(__file__, "/home/homepage/download"))


@router.get("")
def get_downloads(db: Session = Depends(get_db)):
    """전체 다운로드 목록 조회"""
    data_list = db.query(Download).all()
    return data_list


@router.get("/{download_code}")
def get_download_info(download_code: int, db: Session = Depends(get_db)):
    """단건 다운로드 메타정보 조회"""
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
    data = db.query(Download).filter(Download.download_id == download_id).first()
    if data is None:
        raise HTTPException(status_code=404, detail="File metadata not found")
    
    # 실제 파일 경로 (예: C:/workspace/ace-it/download/파일명)
    file_path = os.path.join(BASE_DIR, data.file_name)

    if not os.path.isfile(file_path):
        raise HTTPException(status_code=404, detail="File not found on server")
    
    # 예: PDF 파일일 경우
    return FileResponse(
        path=file_path,
        filename=data.file_name,  # 다운로드될 때 보여줄 파일명
        media_type="application/pdf",  # 파일 MIME 타입 (필요에 맞게 변경)
        headers={
            # 브라우저에서 Content-Disposition 확인 가능하도록 헤더 노출
            "Access-Control-Expose-Headers": "Content-Disposition"
            }
        )
