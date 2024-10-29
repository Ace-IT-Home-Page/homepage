import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import './Maintenance.css'; // CSS 파일 추가
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 추가

const Maintenance = () => {
    const [businessAreas, setBusinessAreas] = useState(null);

    useEffect(() => {
        getBusinessAreaById(4) // 사업 영역 ID를 4로 설정
          .then((response) => setBusinessAreas(response.data))
          .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    if (!businessAreas || !businessAreas.area_name) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    const { area_name, area_details, area_content } = businessAreas;

    // '투입장비'를 맨 아래로 이동시키기 위해 키 재정렬
    const keys = Object.keys(area_details);
    const equipmentKey = keys.find(
      (key) => key === '투입장비' || key === '04' || key.includes('투입장비')
    );

    let reorderedKeys = keys.filter((key) => key !== equipmentKey);
    if (equipmentKey) {
        reorderedKeys.push(equipmentKey);
    }

    return (
      <div className="container py-5">
          <h3 className="title_comp_name text-center mb-5">{area_name}</h3>
          <p className="mb-5">{area_content}</p>
          <div className="row justify-content-center">
              {reorderedKeys.map((key, index) => (
                <div key={index} className="col-md-9 mb-5">
                    <div className="custom-card shadow-sm h-100">
                        {/* 숫자와 제목을 같이 배치 */}
                        <div className="d-flex align-items-center custom-header mb-3">
                            <div className="system-develop-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                                {`0${index + 1}`}
                            </div>
                            <h4 className="custom-title mb-0">{key}</h4>
                        </div>
                        <div className="custom-body">
                            <ul className="list-unstyled pl-3">
                                {area_details[key].map((item, itemIndex) => (
                                  <li key={itemIndex} className="system-develop-item mb-4">
                                      <i className="fas fa-check-circle mr-2 text-primary"></i> {item}
                                      {/* '투입장비' 섹션에서 각 아이템에 이미지 추가 */}
                                      {equipmentKey === key && (
                                        <div className="text-center mt-3">
                                            <img
                                              src={`/image_${itemIndex + 1}.jpg`}
                                              alt={item}
                                              className="img-fluid"
                                            />
                                        </div>
                                      )}
                                  </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              ))}
          </div>
      </div>
    );
};

export default Maintenance;
