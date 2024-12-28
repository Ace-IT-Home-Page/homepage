import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './layouts/Navigation/NavbarComp.css';
import './Header.css'; // Header 전용 스타일 시트 추가
import '@fortawesome/fontawesome-free/css/all.min.css'; // Font Awesome 아이콘 임포트
import { getBusinessAreas } from '../api/AdminAPI'; // Import getCompanyVisionValues API

const Header = () => {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getBusinessAreas();
        const visionValues = response.data.business_areas;
        console.log(visionValues);

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
            try {
              if (item.area_details) {
                const parsedDetails = JSON.parse(item.area_details);
              }
            } catch (e) {
              console.error(`Error parsing details for item ${item.area_id}:`, e);
            }

            return {
              id: item.area_id,
              title: item.area_name,
              image: imageList[index % imageList.length],
              lastUpdated: 'Recently'
            };
          });
        setCardData(processedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching company vision values:', err);
        setError('Failed to load data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <header id="header">
        <div className="banner-container">
          <img src="/AdobeStock_2.jpeg" alt="배너 이미지" className="banner-image" />
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
          <img src="/AdobeStock_2.jpeg" alt="배너 이미지" className="banner-image" />
          <div className="hero-text-overlay">
            <h1 className="display-4">Welcome to ACE IT</h1>
            <p className="lead">FMS 시설물 모니터링, 전산실 구축 및 전문 솔루션 제공</p>
            <p>{error}</p>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header id="header">
      <div className="banner-container">
        <img src="/AdobeStock_2.jpeg" alt="배너 이미지" className="banner-image"/>
        <p className="main-text">
          FMS 시설물 모니터링, <br />전산실 구축 및 전문 솔루션 제공</p>
      </div>

      <div className="hero-text-overlay">
        <h1 className="display-4">Welcome to ACE IT</h1>
        <p className="lead">FMS 시설물 모니터링, <br />전산실 구축 및 전문 솔루션 제공</p>

        {/* Centered Cards without Carousel */}
        <div className="card-container d-flex justify-content-center flex-wrap">
          {cardData.map((card) => (
            <div key={card.id} className="card small-card m-2">
              <img src={card.image} className="card-img-top small-card-img" alt={`Card Image ${card.id}`}/>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <Link to="#" className="btn btn-sm" style={{
                  position: "relative",
                  backgroundColor: '#4e61aa',
                  color: '#ffffff',
                }}>more</Link>
              </div>
              <div className="card-footer">
                <small className="text-muted">Last updated {card.lastUpdated}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
