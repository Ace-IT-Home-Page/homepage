import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import { motion } from 'framer-motion';
import './SystemDevelop.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 추가

const SystemDevelop = () => {
    const [businessAreas, setBusinessAreas] = useState(null);

    useEffect(() => {
        getBusinessAreaById(1)
          .then((response) => setBusinessAreas(response.data))
          .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    if (!businessAreas) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    const { area_name, area_details } = businessAreas;

    return (
      <div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
              <div className="container py-5">
                  <h3 className="title_comp_name text-center mb-4">{area_name}</h3>
                  <div className="row">
                      {Object.keys(area_details).map((key, index) => (
                        <div key={index} className="col-md-6 col-lg-6 mb-4">
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
                  {/* 시스템 개발 프로세스 흐름 */}
                  <div className="process-flow-container text-center mt-5">
                      <div className="process-step mb-3">
                          <div className="process-box">분석 및 설계</div>
                      </div>
                      <div className="process-arrow mb-3">▼</div>
                      <div className="process-step mb-3">
                          <div className="process-box">개발 및 제작</div>
                      </div>
                      <div className="process-arrow mb-3">▼</div>
                      <div className="process-step mb-3">
                          <div className="process-box">평가</div>
                      </div>
                      <div className="process-arrow mb-3">▼</div>
                      <div className="process-step">
                          <div className="process-box">실행 및 운영</div>
                      </div>
                  </div>
              </div>
          </motion.div>
      </div>
    );
};

export default SystemDevelop;
