import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import './InfrastructureSystem.css'; // CSS 파일 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 추가

const InfrastructureSystem = () => {
    const [businessAreas, setBusinessAreas] = useState(null);

    useEffect(() => {
        getBusinessAreaById(3)
          .then((response) => setBusinessAreas(response.data))
          .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    if (!businessAreas || !businessAreas.area_name) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    const { area_name, area_details, area_content } = businessAreas;

    return (
      <div className="container py-5">
        <h3 className="title_comp_name text-center mb-5">{area_name}</h3>
        <p className="mb-5">{area_content}</p>
        <div className="row justify-content-center">
          {Object.keys(area_details).map((key, index) => (
            <div key={index} className="col-md-9 mb-5">
              <div className="custom-card shadow-sm h-100">
                {/* 숫자와 제목을 같이 배치 */}
                <div className="d-flex align-items-center custom-header mb-3">
                  <div
                    className="system-develop-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                    {`0${index + 1}`}
                  </div>
                  <h4 className="custom-title mb-0">{key}</h4>
                </div>
                <div className="custom-body">
                  <ul className="list-unstyled pl-3">
                    {area_details[key].map((item, itemIndex) => (
                      <li key={itemIndex} className="system-develop-item mb-2">
                        <i className="fas fa-check-circle mr-2 text-primary"></i> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="introduction-image-container text-center">
          <img src="/InfrastructureSystem.jpg" alt="회사 이미지" className="introduction-company-image img-fluid"/>
        </div>
      </div>
    );
};

export default InfrastructureSystem;
