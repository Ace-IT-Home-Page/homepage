import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './layouts/Navigation/NavbarComp.css';
import './Header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getBusinessAreas } from '../api/AdminAPI';

const Header = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage, setCardsPerPage] = useState(6); // 초기값은 데스크탑 기준

  // Effect to handle window resize and set cardsPerPage accordingly
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) { // 모바일 기준 너비 (예: 768px 이하)
        setCardsPerPage(4);
      } else {
        setCardsPerPage(6);
      }
    };

    // 초기 설정
    handleResize();

    // 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 클린업
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBusinessAreas();
        const visionValues = response.data.business_areas;

        const imageList = [
          '/AdobeStock_2.jpeg',
          '/AdobeStock_3.jpeg',
          '/AdobeStock_4.jpeg',
          '/AdobeStock_maintenance.jpeg',
          '/AdobeStock_communications.jpeg',
          '/AdobeStock_guard.jpg',
        ];

        const processedData = visionValues
          .filter(item => item.area_id)
          .map((item, index) => {
            let linkPath = '#';
            switch (item.area_name) {
              case '시스템 개발':
                linkPath = '/business/SystemDevelop';
                break;
              case 'FMS 모니터링':
                linkPath = '/business/FMSMonitoring';
                break;
              case '인프라 시스템':
                linkPath = '/business/InfrastructureSystem';
                break;
              case '유지보수':
                linkPath = '/business/Maintenance';
                break;
              default:
                linkPath = '#';
            }

            return {
              id: item.area_id,
              title: item.area_name,
              image: imageList[index % imageList.length],
              lastUpdated: 'Recently',
              link: linkPath,
            };
          });

        setCardData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching company vision values:', err);
        setError('데이터를 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <header id="header">
        <div className="banner-container">
          <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
          <div className="hero-text-overlay">
            <h1 className="display-4">Welcome to ACE IT</h1>
            <p className="lead">FMS 시설물 모니터링, 전산실 구축 및 전문 솔루션 제공</p>
            <p>Loading...</p>
          </div>
        </div>
      </header>
    );
  }

  if (error) {
    return (
      <header id="header">
        <div className="banner-container">
          <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
          <div className="hero-text-overlay">
            <h1 className="display-4">Welcome to ACE IT</h1>
            <p className="lead">FMS 시설물 모니터링, 전산실 구축 및 전문 솔루션 제공</p>
            <p>{error}</p>
          </div>
        </div>
      </header>
    );
  }

  // Calculate total pages based on cardsPerPage
  const totalPages = Math.ceil(cardData.length / cardsPerPage);

  // Get current page cards
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = cardData.slice(indexOfFirstCard, indexOfLastCard);

  // Helper function to split currentCards into chunks (2 per row for desktop, adjust as needed)
  const getRows = (cards, itemsPerRow) => {
    const rows = [];
    for (let i = 0; i < cards.length; i += itemsPerRow) {
      rows.push(cards.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  // Determine items per row based on screen size
  const itemsPerRow = window.innerWidth <= 768 ? 2 : 2; // 예: 모바일과 데스크탑 모두 한 행에 2개씩
  const rows = getRows(currentCards, itemsPerRow);

  // Handler for page change
  const handlePageChange = (pageNumber) => {
    // 페이지 번호가 유효한지 확인
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    // window.scrollTo({ top: 0, behavior: 'smooth' }); // 스크롤 제거
  };

  return (
    <header id="header">
      <div className="banner-container">
        <img src="/AdobeStock_2.jpeg" alt="배너" className="banner-image" />
        <p className="main-text">
          FMS 시설물 모니터링, <br />
          전산실 구축 및 전문 솔루션 제공
        </p>
      </div>

      <div className="hero-text-overlay">
        <h1 className="display-4">Welcome to ACE IT</h1>
        <p className="lead">
          FMS 시설물 모니터링,
          <br />
          전산실 구축 및 전문 솔루션 제공
        </p>

        {/* 카드 배치 */}
        <div className="card-container">
          {rows.map((row, rowIndex) => (
            <div className="card-row" key={rowIndex}>
              {row.map((card) => (
                <div key={card.id} className="card small-card">
                  <img
                    src={card.image}
                    className="card-img-top small-card-img"
                    alt={card.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <Link
                      to={card.link}
                      className="btn btn-sm"
                      style={{
                        backgroundColor: '#4e61aa',
                        color: '#ffffff',
                      }}
                    >
                      more
                    </Link>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Last updated {card.lastUpdated}</small>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Pagination Buttons */}
        {totalPages > 1 && (
          <div className="pagination-container" style={{ marginTop: '20px', textAlign: 'center' }}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="btn btn-secondary"
              style={{ marginRight: '10px' }}
              type="button" // 버튼 타입 명시
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
                style={{ margin: '0 5px' }}
                type="button" // 버튼 타입 명시
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="btn btn-secondary"
              style={{ marginLeft: '10px' }}
              type="button" // 버튼 타입 명시
            >
              Next
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
