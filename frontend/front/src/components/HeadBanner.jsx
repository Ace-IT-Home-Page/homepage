import React from 'react';
import { motion } from 'framer-motion';
import './HeadBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation, Link } from 'react-router-dom';

// 애니메이션 설정 객체
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};
const pageAnimate_1 = {
  initial: { y: 0, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { duration: 0.8 },
};

// 경로와 배너 텍스트 매핑 객체
const bannerTextMapping = {
  '/contact': '문의 & 오시는 길',
  '/login': '관리자 페이지',
  '/admin': '관리자 페이지',
  '/informationList': '회사 소개 및 정보 목록',
  '/addInformation': '등록',
  '/editInformation': '수정',
  '/historyList': '회사 연혁 및 개발본부 이력',
  '/addHistory': '등록',
  '/editHistory': '수정',
  '/listBusinessClient': '주요 고객사 목록',
  '/addBusinessClient': '등록',
  '/editBusinessClient': '수정',
  '/companyVisionValuesList': '회사 비전 및 가치',
  '/addCompanyVisionValue': '등록',
  '/editCompanyVisionValue': '수정',
  '/listBusinessArea': '사업 영역(BUSINESS)',
  '/addBusinessArea': '등록',
  '/editBusinessArea': '수정',
  '/download': '자료실',
};

// 하위 페이지 링크 정의
const aboutPages = [
  { path: '/about', label: '회사소개' },
  { path: '/about/OrganizationHistory', label: '조직도 & 연혁' },
];

const businessPages = [
  { path: '/business/SystemDevelop', label: '시스템 개발' },
  { path: '/business/FMSMonitoring', label: 'FMS 모니터링' },
  { path: '/business/InfrastructureSystem', label: '인프라 시스템' },
  { path: '/business/Maintenance', label: '유지보수' },
];

const HeadBanner = () => {
  const location = useLocation();

  // 경로에서 동적 매개변수를 제거하고 기본 경로 추출
  const extractBasePath = (pathname) => {
    // 정규식을 사용하여 경로에서 동적 매개변수 제거
    const match = pathname.match(/^\/[a-zA-Z]+\/[a-zA-Z]+/);
    if (match) {
      return match[0]; // 매칭된 기본 경로 반환
    }
    const singleSegmentMatch = pathname.match(/^\/[a-zA-Z]+/);
    if (singleSegmentMatch) {
      return singleSegmentMatch[0];
    }
    return pathname; // 매칭이 없는 경우 전체 경로 반환
  };

  const getBannerText = () => {
    const basePath = extractBasePath(location.pathname);
    console.log('현재 경로:', location.pathname, '기본 경로:', basePath);
    return bannerTextMapping[basePath] || '';
  };

  const renderSubpages = () => {
    if (location.pathname.startsWith('/business')) {
      return businessPages.map((page) => (
          <Link
              key={page.path}
              to={page.path}
              className={`business-link ${
                  location.pathname === page.path ? 'active' : ''
              }`}
          >
            {page.label}
          </Link>
      ));
    }
    if (location.pathname.startsWith('/about')) {
      return aboutPages.map((page) => (
          <Link
              key={page.path}
              to={page.path}
              className={`business-link ${
                  location.pathname === page.path ? 'active' : ''
              }`}
          >
            {page.label}
          </Link>
      ));
    }
    return null;
  };

  return (
      <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
      >
        <div className="head-banner-container">
          <motion.div variants={pageAnimate_1}>
            <img
                src="/AdobeStock_banner_3.png"
                alt="배너 이미지"
                className="head-banner-image-container"
            />
            <div className="head-banner-text-about">
              {getBannerText()}
              <div className="business-subpages">{renderSubpages()}</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
  );
};

export default HeadBanner;
