import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Download.css';
import { getDownloadByCode } from '../api/AdminAPI';

/**
 * 탭 데이터 (2가지)
 * code=1 → 전산실 시설관리 시스템
 * code=2 → Humidity & Temperature Sensor
 */
const tabsData = [
  { code: 1, label: '전산실 시설관리 시스템' },
  { code: 2, label: 'Humidity & Temperature Sensor' },
];

export default function Download() {
  // 파일명 상태: {1: '파일A.pdf', 2: '파일B.pdf'}
  const [fileNames, setFileNames] = useState({ 1: '', 2: '' });

  // 현재 선택된 탭 (기본으로 첫 번째 탭)
  const [selectedTab, setSelectedTab] = useState(tabsData[0]);

  useEffect(() => {
    // code=1,2 두 개를 동시에 불러옴
    Promise.all(
      tabsData.map((tab) =>
        getDownloadByCode(tab.code).then((res) => ({
          code: tab.code,
          fileName: res.data.file_name,
        }))
      )
    )
      .then((results) => {
        // 결과를 fileNames 형태로 변환
        const newFileNames = { ...fileNames };
        results.forEach((r) => {
          newFileNames[r.code] = r.fileName;
        });
        setFileNames(newFileNames);
      })
      .catch((err) => {
        console.error('다운로드 정보 가져오기 실패', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 클릭 시 <a> 태그를 동적으로 생성 → 다운로드
  const handleDownload = (fileName) => {
    if (!fileName) return;
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

      {/* 상단 탭 목록 */}
      <ul className="tab-list">
        {tabsData.map((tab) => (
          <motion.li
            key={tab.code}
            onClick={() => setSelectedTab(tab)}
            className="tab-item"
            animate={{
              backgroundColor:
                tab.code === selectedTab.code ? '#f0f0f0' : '#fff',
            }}
          >
            {tab.label}

            {/* 선택된 탭 아래에 언더라인 표시 */}
            {tab.code === selectedTab.code && (
              <motion.div
                className="tab-underline"
                layoutId="tab-underline"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.li>
        ))}
      </ul>

      {/* 탭 컨텐츠 영역 */}
      <div className="tab-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedTab.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="content-box"
          >
            <h3>{selectedTab.label}</h3>
            <p>이 탭을 클릭하면 DB에서 불러온 파일을 다운로드합니다.</p>

            {/* 다운로드 버튼 */}
            <button
              className="download-button"
              onClick={() => handleDownload(fileNames[selectedTab.code])}
            >
              다운로드하기
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
