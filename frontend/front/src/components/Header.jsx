// src/components/Header.jsx
import React from 'react';
import {Link} from 'react-router-dom';
import './layouts/Navigation/NavbarComp.css';
import './Header.css'; // Header 전용 스타일 시트 추가
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome 아이콘 임포트
import {Carousel} from 'react-bootstrap';


const Header = () => {
  // 카드 데이터 배열
  const cardData = [
    {
      id: 1,
      title: '개발사업',
      text: 'This is a smaller card with supporting text below.',
      image: '/AdobeStock_3.jpeg',
      lastUpdated: '3 mins ago'
    },
    {
      id: 2,
      title: 'FMS 모니터링 사업',
      text: 'This card has supporting text below as a natural lead-in.',
      image: '/AdobeStock_2.jpeg',
      lastUpdated: '3 mins ago'
    },
    {
      id: 3,
      title: 'I-T 서비스 관리',
      text: 'This is another service offered.',
      image: '/AdobeStock_3.jpeg',
      lastUpdated: '5 mins ago'
    },
    {
      id: 4,
      title: '솔루션 제공',
      text: 'This is another card with a different service.',
      image: '/AdobeStock_4.jpeg',
      lastUpdated: '6 mins ago'
    },
    {
      id: 5,
      title: '데이터 관리',
      text: 'Advanced data management service.',
      image: '/AdobeStock_5.jpeg',
      lastUpdated: '10 mins ago'
    },
    {
      id: 6,
      title: '보안 솔루션',
      text: 'Security solutions for businesses.',
      image: '/AdobeStock_6.jpeg',
      lastUpdated: '12 mins ago'
    }
  ];

  return (
    <header id="header">
      <div className="banner-container">
        <img src="/AdobeStock_2.jpeg" alt="배너 이미지" className="banner-image"/>
        <div className="hero-text-overlay">

          <h1 className="display-4">Welcome to ACE IT</h1>
          <p className="lead">FMS 시설물 모니터링, 전산실 구축 및 전문 솔루션 제공</p>

          {/* Bootstrap Carousel to rotate cards */}
          <Carousel controls={true} indicators={true} interval={3000}> {/* 네비게이션 및 인디케이터 활성화 */}
            {/* 카드 6개를 2개씩 슬라이드 */}
            {cardData.map((card, index) => {
              if (index % 2 === 0) {
                return (
                  <Carousel.Item key={card.id}>
                    <div className="card-container d-flex justify-content-center">
                      <div className="card small-card">
                        <img src={card.image} className="card-img-top small-card-img" alt={`Card Image ${card.id}`}/>
                        <div className="card-body">
                          <h5 className="card-title">{card.title}</h5>
                          <p className="card-text">{card.text}</p>
                          <Link to="#" className="btn btn-primary btn-sm"  style={{
                            position: "relative",
                            backgroundColor: '#4e61ff',
                            color: '#ffffff',
                          }}>more</Link>
                        </div>
                        <div className="card-footer">
                          <small className="text-muted">Last updated {card.lastUpdated}</small>
                        </div>
                      </div>

                      {/* 다음 카드가 있으면 표시 */}
                      {cardData[index + 1] && (
                        <div className="card small-card">
                          <img src={cardData[index + 1].image} className="card-img-top small-card-img"
                               alt={`Card Image ${cardData[index + 1].id}`}/>
                          <div className="card-body">
                            <h5 className="card-title">{cardData[index + 1].title}</h5>
                            <p className="card-text">{cardData[index + 1].text}</p>
                            <Link to="#" className="btn btn-primary btn-sm" style={{
                              position: "relative",
                              backgroundColor: '#4e61ff',
                              color: '#ffffff',
                            }}>more</Link>
                          </div>
                          <div className="card-footer">
                            <small className="text-muted">Last updated {cardData[index + 1].lastUpdated}</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </Carousel.Item>
                );
              }
              return null;
            })}
          </Carousel>
        </div>
      </div>
    </header>
  );
}

export default Header;
