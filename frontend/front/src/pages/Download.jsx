import React, { useEffect, useState } from 'react';
import './Download.css';
import { getDownloadByCode } from '../api/AdminAPI';

const Download = () => {
  // code=1에 해당하는 다운로드 파일명
  const [fileName1, setFileName1] = useState('');
  // code=2에 해당하는 다운로드 파일명
  const [fileName2, setFileName2] = useState('');

  useEffect(() => {
    // 1) 전산실 시설관리 시스템 (code=1)
    getDownloadByCode(1)
      .then((res) => {
        // 백엔드가 { file_name: 'catalog1_ko.pdf', ... } 형태로 응답한다고 가정
        setFileName1(res.data.file_name);
      })
      .catch((err) => {
        console.error('code=1 다운로드 정보 가져오기 실패:', err);
      });

    // 2) Humidity & Temperature Sensor (code=2)
    getDownloadByCode(2)
      .then((res) => {
        setFileName2(res.data.file_name);
      })
      .catch((err) => {
        console.error('code=2 다운로드 정보 가져오기 실패:', err);
      });
  }, []);

  // 클릭 시, 동적으로 <a>를 생성해서 다운로드
  const handleDownload = (fileName) => {
    if (!fileName) return; // 파일명이 아직 안 왔거나 오류 시
    const tempLink = document.createElement('a');
    tempLink.href = `/download/${fileName}`;
    tempLink.download = fileName;
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
  };

  return (
    <div className="download-container">
      <h2>제품 카탈로그</h2>

      <div className="catalog-list">
        {/* 코드 1번: 전산실 시설관리 시스템 */}
        <div
          className="catalog-item"
          onClick={() => handleDownload(fileName1)}
          style={{ cursor: 'pointer' }} // 클릭 가능 마우스 표시
        >
          <h3 className="catalog-title">전산실 시설관리 시스템</h3>
          {/* 필요한 경우, UI 안내 문구 */}
          <p>이 영역을 클릭하면 해당 파일을 다운로드합니다.</p>
        </div>

        {/* 코드 2번: Humidity & Temperature Sensor */}
        <div
          className="catalog-item"
          onClick={() => handleDownload(fileName2)}
          style={{ cursor: 'pointer' }}
        >
          <h3 className="catalog-title">Humidity & Temperature Sensor</h3>
          <p>이 영역을 클릭하면 해당 파일을 다운로드합니다.</p>
        </div>
      </div>
    </div>
  );
};

export default Download;
