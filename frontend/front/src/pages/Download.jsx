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
        // 백엔드가 { file_name: 'catalog1_ko.pdf', ... } 식으로 응답한다고 가정
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

  return (
    <div className="download-container">
      <h2>제품 카탈로그</h2>

      <div className="catalog-list">
        {/* 코드 1번 */}
        <div className="catalog-item">
          <h3 className="catalog-title">전산실 시설관리 시스템</h3>
          <div className="download-links">
            <a href={`/download/${fileName1}`} download>
              제품 카탈로그 다운받기
            </a>
          </div>
        </div>

        {/* 코드 2번 */}
        <div className="catalog-item">
          <h3 className="catalog-title">Humidity & Temperature Sensor</h3>
          <div className="download-links">
            {/*
              만약 DB에 “영문 버전”이 별도 코드(예: 3)로 있으면,
              똑같이 getDownloadByCode(3)로 받아서 두 번째 링크로 추가 가능.
            */}
            <a href={`/download/${fileName2}`} download>
              제품 카탈로그 다운받기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
