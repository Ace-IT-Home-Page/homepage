from fastapi import APIRouter, Depends, HTTPException
from database.repository import DownloadRepository
from database.orm import Download

router = APIRouter(prefix="/download")

@router.get("/{download_code}")
def get_download_info(download_code: int, repo: DownloadRepository = Depends()):
    data: Download | None = repo.get_by_code(download_code)
    if not data:
        raise HTTPException(status_code=404, detail="Not Found")
    return {
        "download_id": data.download_id,
        "file_name": data.file_name,
        "file_path": data.file_path
    }
