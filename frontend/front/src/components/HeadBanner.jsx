import React from 'react';
import { motion } from 'framer-motion';
import './HeadBanner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import InfrastructureSystem from "../pages/business/InfrastructureSystem";

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
  '/about': '회사소개',
  '/about/OrganizationHistory': '조직도 & 연혁',
  '/business': '사업영역',
  '/business/SystemDevelop': '시스템 개발',
  '/business/FMSMonitoring': 'FMS 모니터링',
  '/business/InfrastructureSystem': '인프라 시스템',
  '/business/Maintenance': '유지보수',
  '/contact': '문의 & 오시는 길',
};

const HeadBanner = () => {
  const location = useLocation();

  const getBannerText = () => {
    return bannerTextMapping[location.pathname] || '기본 배너 텍스트';
  };

  return (
    <div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div>
          <motion.div variants={pageAnimate_1}>
            <img
              src="/AdobeStock_banner_2-1.png"
              alt="배너 이미지"
              className="banner-image-container"
            />
            <div className="banner-text-about">{getBannerText()}</div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeadBanner;
