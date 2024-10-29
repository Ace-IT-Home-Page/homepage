import './Footer.css';
import React, { useEffect, useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome 사용
import { getInformation } from '../api/AdminAPI'; // Import getInformation API
import {useNavigate} from 'react-router-dom';

const Footer = () => {
  const [informationData, setInformationData] = useState(null); // 상태 초기값을 null로 설정
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Helper function to find content by name
  const getContentByName = (name) => {
    const info = informationData?.find(item => item.information_name === name);
    return info ? info.information_content : '미등록';
  };

  const handleNavigateToAdminPage = () => {
    navigate('/admin');
  };

  // Fetch the footer data from getInformation API
  useEffect(() => {
    getInformation()
      .then(response => {
        if (response.data.information && Array.isArray(response.data.information)) {
          setInformationData(response.data.information); // information 배열을 설정
        } else {
          console.error('API 응답 형식이 예상과 다릅니다:', response.data);
          setError('Footer 데이터를 처리하는 중 오류가 발생했습니다.');
        }
        setLoading(false);
      })
      .catch(error => {
        setError('Footer 데이터를 가져오는 데 실패했습니다.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading footer...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!informationData) {
    return <div>Footer 정보를 불러오지 못했습니다.</div>;
  }

  return (
      <footer className="footer page-footer" style={{backgroundColor: '#4A6AEC'}}>
        <div className="footer-container-1" style={{backgroundColor: '#8b99a3'}}>
          <div className="button_wrap">
            {/* 대표번호 버튼 */}
            <div className="inline-blocked">
              <a className="btn btn-default" href="tel:1544-0714" style={{borderRadius: '30px'}}>
              <span style={{marginRight: '10px'}}>
                <i aria-hidden="true" className="fa fa-phone"></i>
              </span>
                대표번호 : 1544-0714
              </a>
            </div>

            {/* 온라인 문의 버튼 */}
            <div className="inline-blocked">
              <a
                  className="btn btn-default"
                  target="_blank"
                  href="https://docs.google.com/forms/d/e/1FAIpQLSeZz8_Z66eyGC-yk3a81DLSPSDbDIn5VJ9qPW8pPJXl0FXLVQ/viewform?usp=sf_link/"
                  style={{borderRadius: '30px'}}
              >
              <span style={{marginRight: '10px'}}>
                <i aria-hidden="true" className="fa fa-file-text"></i>
              </span>
                Google 설문지 문의
              </a>
            </div>

            {/* 소셜 미디어 아이콘 */}
            <div className="social-icons">
              {/* Instagram */}
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram"></i>
              </a>
              {/* Naver Blog */}
              <a href="https://blog.naver.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook"></i>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-youtube"></i>
              </a>
              {/* X(Twitter) */}
              <a href="https://www.x.com" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-x-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-top">
          <div className="footer-container-1">
            <div className="row py-4 d-flex align-items-center justify-content-between">
              {/* Dynamically populate company information */}
              <h5 className="company-name" style={{color: '#fff'}}>
                {getContentByName("회사명")}
              </h5>
              <p style={{color: '#fff'}}>
                사업자번호: {getContentByName("사업자번호") || '미등록'} | 대표이사: {getContentByName("대표이사")}<br/>
                주소: {getContentByName("주소")}<br/>
                대표전화: {getContentByName("기본 연락처")} | FAX: {getContentByName("FAX 번호")}<br/>
                이메일: {getContentByName("이메일") || '미등록'} | 홈페이지: <a href={`http://${getContentByName("홈페이지")}`}
                                                                   style={{color: '#fff'}}>{getContentByName("홈페이지")}</a><br/>
                운영 시간: {getContentByName("운영 시간")}
              </p>
            </div>
          </div>
        </div>

        <div className="footer-container-1">
          <p style={{color: '#fff', fontSize: '13px'}}>
            Copyright © {new Date().getFullYear()} {getContentByName("회사명")} ALL RIGHTS RESERVED
            <button onClick={handleNavigateToAdminPage}>
              관리자 페이지
            </button>
          </p>
        </div>
      </footer>
  );
};

export default Footer;
