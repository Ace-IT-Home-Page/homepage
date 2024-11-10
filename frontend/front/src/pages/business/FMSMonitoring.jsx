import React, {useEffect, useState} from 'react';
import {getBusinessAreaById} from '../../api/AdminAPI';
import './FMSMonitoring.css'; // CSS 파일 추가

const FMSMonitoring = () => {
  const [businessAreas, setBusinessAreas] = useState({});

  useEffect(() => {
    getBusinessAreaById(2)
      .then((response) => setBusinessAreas(response.data))
      .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
  }, []);

  if (!businessAreas || !businessAreas.area_name) {
    return <p>데이터를 불러오는 중입니다...</p>;
  }

  const {area_name, area_details, area_content} = businessAreas;

  return (
    <div className="container">
      <div className="monitoring-container py-5">
        <p className="monitoring-content text-center mb-5">{area_content}</p>
        <div className="row justify-content-center">
          {Object.keys(area_details).map((key, index) => (
            <div key={index} className="col-md-9 mb-5">
              <div className="monitoring-custom-card shadow-sm h-100">
                <div className="d-flex align-items-center monitoring-custom-header mb-3">
                  <div
                    className="monitoring-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                    {`0${index + 1}`}
                  </div>
                  <h4 className="monitoring-custom-title mb-0">{key}</h4>
                </div>
                <div className="monitoring-custom-body">
                  <ul className="monitoring-list pl-3">
                    {area_details[key].map((item, itemIndex) => (
                      <li key={itemIndex} className="monitoring-item mb-2">
                        <i className="fas fa-check-circle mr-2 text-primary"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="monitoring-introduction-image-container text-center">
          <img src="/FMS_monitoring.png" alt="회사 이미지" className="monitoring-introduction-company-image img-fluid"/>
        </div>
      </div>
    </div>
  );
};

export default FMSMonitoring;