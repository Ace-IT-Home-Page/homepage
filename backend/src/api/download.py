from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.connection import get_db  # 세션을 반환하는 Depends 함수
from database.orm import Download
router = APIRouter(prefix="/download")

@router.get("/{download_code}")
def get_download_info(download_code: int, db: Session = Depends(get_db)):
    # 여기서 직접 Repository를 생성하거나, 바로 db.query() 사용
    data: Download | None = db.query(Download).filter(Download.download_code == download_code).first()
    if not data:
        raise HTTPException(status_code=404, detail="Not Found")
    return {
        "download_id": data.download_id,
        "file_name": data.file_name,
        "file_path": data.file_path
    }
