import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './Download.css';
import { getDownloadByCode } from '../api/AdminAPI';

/**
 * 세 개 탭:
 *   - code=1: 전산실 시설관리 시스템   (기존 파일 #1)
 *   - code=2: Humidity & Temperature Sensor (기존 파일 #2)
 *   - code=3: 기반환경 데이터 수집장치  (새 탭, 여기서는 임시로 다운로드 없음)
 */
const tabsData = [
  { code: 1, label: '전산실 시설관리 시스템' },
  { code: 2, label: 'Humidity & Temperature Sensor' },
  { code: 3, label: '기반환경 데이터 수집장치' },
];

export default function Download() {
  // 기존 코드와 동일하게 code=1,2에 대해만 실제 PDF 파일명을 가져옴
  const [fileNames, setFileNames] = useState({ 1: '', 2: '', 3: '' });

  // 현재 선택된 탭 (기본 첫 번째 탭)
  const [selectedTab, setSelectedTab] = useState(tabsData[0]);

  useEffect(() => {
    // code=1,2 두 개만 백엔드에서 불러옴
    Promise.all([
      getDownloadByCode(1).then((res) => ({ code: 1, fileName: res.data.file_name })),
      getDownloadByCode(2).then((res) => ({ code: 2, fileName: res.data.file_name })),
    ])
      .then((results) => {
        // 결과 예: [{ code:1, fileName:'xxx.pdf'}, { code:2, fileName:'yyy.pdf'}]
        const newFileNames = { ...fileNames };
        results.forEach((r) => {
          newFileNames[r.code] = r.fileName;
        });
        // code=3 은 파일명이 없으므로 '', 필요하다면 getDownloadByCode(3) 추가 가능
        setFileNames(newFileNames);
      })
      .catch((err) => {
        console.error('다운로드 정보 가져오기 실패', err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 클릭 시 <a> 동적 생성 → 다운로드
  const handleDownload = (fileName) => {
    if (!fileName) {
      // fileName이 '' (빈 문자열)인 경우, 다운로드 불가
      alert('파일이 존재하지 않습니다.');
      return;
    }
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

      {/* 탭 목록 */}
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

            {/* 선택된 탭 아래에 움직이는 언더라인 */}
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

      {/* 중앙 컨텐츠: AnimatePresence로 탭 전환 애니메이션 */}
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
