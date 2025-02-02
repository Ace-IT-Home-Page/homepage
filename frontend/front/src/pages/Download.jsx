import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import './Download.css'
import { getDownloadByCode } from '../api/AdminAPI'

/**
 * 세 개 탭 (code=1, 2, 3).
 * 전산실 시설관리 시스템 (code=1),
 * Humidity & Temperature Sensor (code=2),
 * 기반환경 데이터 수집장치 (code=3).
 */
const tabsData = [
  { code: 1, label: '전산실 시설관리 시스템' },
  { code: 2, label: 'Humidity & Temperature Sensor' },
  { code: 3, label: '기반환경 데이터 수집장치' },
]

export default function Download() {
  // 현재 선택된 탭
  const [selectedTab, setSelectedTab] = useState(tabsData[0])

  /**
   * 다운로드 버튼 클릭 시 동작:
   * - getDownloadByCode(selectedTab.code) 요청 → 파일명 받기
   * - 동적으로 <a> 태그 만들어 클릭 → 브라우저 다운로드 진행
   */
  const handleDownload = (code) => {
    getDownloadByCode(code)
      .then((res) => {
        const fileName = res.data.file_name
        if (!fileName) {
          alert('파일이 존재하지 않습니다.')
          return
        }

        const tempLink = document.createElement('a')
        tempLink.href = `/download/${fileName}`
        tempLink.download = fileName
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
      })
      .catch((err) => {
        console.error('다운로드 실패:', err)
        alert('다운로드 요청 중 오류가 발생했습니다.')
      })
  }

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

            {/* 선택된 탭 아래쪽에 움직이는 언더라인 */}
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
            <p>이 탭을 선택 후, "다운로드하기" 버튼을 누르면 DB에서 파일명을 받아 다운로드합니다.</p>

            <button
              className="download-button"
              onClick={() => handleDownload(selectedTab.code)}
            >
              다운로드하기
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
