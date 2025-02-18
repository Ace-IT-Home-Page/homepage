import os
import logging
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session

from database.connection import get_db  # 세션을 반환하는 Depends 함수
from database.orm import Download

# 로거 설정 (필요하다면 별도 config나 포맷, 핸들러 등을 더 추가 가능)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# 엔드포인트 라우터
router = APIRouter(prefix="/download")

# 현재 파일이 존재하는 디렉토리 기준, 다운로드 경로 설정
# __file__를 그대로 사용할 경우 경로가 꼬일 수 있으니 주의
# 예: BASE_DIR = os.path.join(os.path.dirname(__file__), "home", "homepage", "download")
BASE_DIR = os.path.normpath(os.path.join(__file__, "/home/homepage/download"))


@router.get("")
def get_downloads(db: Session = Depends(get_db)):
    """전체 다운로드 목록 조회"""
    logger.info("Called get_downloads endpoint.")
    data_list = db.query(Download).all()
    logger.info(f"Retrieved {len(data_list)} items from 'download' table.")
    return data_list


@router.get("/{download_code}")
def get_download_info(download_code: int, db: Session = Depends(get_db)):
    """단건 다운로드 메타정보 조회"""
    logger.info(f"Called get_download_info with download_code={download_code}")
    data: Optional[Download] = (
        db.query(Download)
        .filter(Download.download_code == download_code)
        .first()
    )
    if data is None:
        logger.warning(f"No download info found for download_code={download_code}")
        raise HTTPException(status_code=404, detail="Not Found")
    
    logger.info(f"Found download info: {data}")
    return {
        "download_id": data.download_id,
        "download_name": data.download_name,
        "file_name": data.file_name,
        "file_path": data.file_path,
        "exam_image": data.exam_image,
        }


@router.get("/file/{download_id}")
def download_file(download_id: int, db: Session = Depends(get_db)):
    """
    1) DB에서 download_id로 파일 정보를 조회
    2) 실제 파일이 서버에 존재하는지 확인
    3) 존재한다면 NGINX가 서빙하는 정적 경로(/static/...)를 JSON으로 응답
    """
    logger.info(f"Called download_file with download_id={download_id}")
    
    data = db.query(Download).filter(Download.download_id == download_id).first()
    if not data:
        logger.warning(f"No file info found for download_id={download_id}")
        raise HTTPException(status_code=404, detail="File not found in DB")
    
    file_name = data.file_name  # 예: "250213_FMS_수집장치_카다로그_v0.1.pdf"
    
    # 실제 서버 디렉토리에 파일이 존재하는지 체크
    file_path = BASE_DIR
    print(file_path)
    if not os.path.isfile(file_path):
        logger.warning(f"File not found on disk: {file_path}")
        raise HTTPException(status_code=404, detail="File not found on disk")
    
    # NGINX로 접근할 수 있는 정적 URL (예: /static/ + 파일명)
    # NGINX 설정이 alias /home/homepage/download/ -> /static/ 이라 가정
    nginx_url = f"/download/{file_name}"
    
    # 1) JSON 형태로 URL만 돌려주는 방법
    return {"url": nginx_url}