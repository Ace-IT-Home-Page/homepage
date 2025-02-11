import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getHistory } from '../api/AdminAPI';
import './CompanyHistory.css';

const CompanyHistory = () => {
  const [companyHistory, setCompanyHistory] = useState([]);

  useEffect(() => {
    getHistory()
      .then((res) => {
        if (!res.data) return;
        let histories = Array.isArray(res.data) ? res.data : res.data.history || [];
        // history_section_code가 1인 항목만 사용
        histories = histories.filter((h) => h.history_section_code === 1);
        // 내림차순 정렬 (최신 항목이 먼저 나오도록)
        histories.sort((a, b) => new Date(b.history_date) - new Date(a.history_date));
        setCompanyHistory(histories);
      })
      .catch((err) => console.error('회사 연혁 로드 오류:', err));
  }, []);

  let lastYear = null;
  let timelineCounter = 0; // 타임라인 항목 배치를 위한 카운터
  const timelineItems = companyHistory.reduce((acc, item) => {
    const dateObj = new Date(item.history_date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;

    // 연도가 변경되었으면 중앙에 연도 라벨을 추가
    if (year !== lastYear) {
      lastYear = year;
      acc.push(
        <motion.li
          key={`year-${year}`}
          className="year-label"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {year}
        </motion.li>
      );
    }

    // 좌우 번갈아 배치 (year-label은 제외)
    const side = timelineCounter % 2 === 0 ? 'left' : 'right';
    timelineCounter++;

    acc.push(
      <motion.li
        key={item.history_id}
        className={side}
        initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4>{`${year}.${month} ${item.history_title || ''}`}</h4>
        <p>{item.history_content}</p>
        {item.history_image && (
          <img
            src='/comp_img.jpeg'
            alt={`${year}.${month} ${item.history_title || ''}`}
            className="timeline-image"
          />
        )}
      </motion.li>
    );
    return acc;
  }, []);

  return (
    <div className="history-wrapper">
      {/* 1) 패럴랙스 배너 */}
      <div className="history-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">회사 연혁</h1>
        </div>
      </div>

      {/* 2) 좌우 교차 타임라인 */}
      <motion.ul
        className="timeline"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {timelineItems}
      </motion.ul>
    </div>
  );
};

export default CompanyHistory;
