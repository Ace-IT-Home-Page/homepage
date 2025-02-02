import React from 'react';
import './Download.css'; // CSS 경로는 상황에 맞게 조정

const Download = () => {
  return (
    <div className="download-container">
      <h2>제품 카탈로그</h2>

      <div className="catalog-list">
        {/* 1. 기반환경 데이터 수집장치 */}
        <div className="catalog-item">
          <h3 className="catalog-title">기반환경 데이터 수집장치</h3>
          <div className="download-links">
            {/* TXT 파일 예시 (public/download/asds.txt) */}
            <a href="/download/asds.txt" download>
              제품 카탈로그 다운받기
            </a>
          </div>
        </div>

        {/* 2. 전산실 시설관리 시스템 */}
        <div className="catalog-item">
          <h3 className="catalog-title">전산실 시설관리 시스템</h3>
          <div className="download-links">
            {/* PDF 파일 예시 (public/download/catalog1_ko.pdf) */}
            <a href="/download/catalog1_ko.pdf" download>
              제품 카탈로그 다운받기
            </a>
          </div>
        </div>

        {/* 3. Humidity & Temperature Sensor */}
        <div className="catalog-item">
          <h3 className="catalog-title">Humidity & Temperature Sensor</h3>
          <div className="download-links">
            {/* 나머지 PDF 파일들도 동일한 경로 규칙 적용 */}
            <a href="/download/catalog3_ko.pdf" download>
              제품 카탈로그 다운받기
            </a>
            <a href="/download/catalog3_en.pdf" download>
              (영문) 제품 카탈로그 다운받기
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Download;
