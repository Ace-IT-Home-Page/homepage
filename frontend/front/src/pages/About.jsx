// About.jsx
import React, { useEffect, useState } from 'react';
import { getCompanyVisionValues } from '../api/AdminAPI';
import './About.css';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const About = () => {
  const [visionData, setVisionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisionData = async () => {
      try {
        const response = await getCompanyVisionValues();
        setVisionData(response.data.company_vision_values || []);
      } catch (err) {
        console.error('Error fetching company vision values:', err);
        setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchVisionData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="about-full-width-background">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 bottom50">
          </div>
        </div>
        <div className="row">
          <ul className="about-process-wrapp">
            {visionData.slice(1, 7).map((item, index) => (
              <li
                key={item.vv_id}
                className="wow fadeIn"
                data-wow-delay={`${300 + index * 100}ms`}
              >
                <span className="about-pro-ico bottom20">
                  <img src={`/about_icon_${index + 1}.png`} alt="icon" />
                </span>
                <h2 className="about-font-normal bottom25">{item.vv_name}</h2>
                <p className="about-check">{item.vv_content}</p>
                {item.vv_details &&
                  Object.values(item.vv_details).map((detail, idx) => (
                    <p key={idx} className="about-check">
                      {detail}
                    </p>
                  ))}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 추가된 코드 시작 */}
      <div className="container">
        <div className="row align-items-center">
          {/* 왼쪽 이미지 */}
          <motion.div
            className="col-md-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src="/AdobeStock_global.jpeg"
              alt="비전 및 가치"
              className="about-ceo-image"
            />
          </motion.div>

          {/* 오른쪽 텍스트 */}
          <motion.div
            className="col-md-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="about-ceo-text-container">
              <div className="about-ceo-title">CEO 인사말</div>
              <p className="about-ceo-subheading">글로벌 기업으로 성장하겠습니다.</p>
              <ul>
                <li>
                  여러분을 향한 (주)에이스아이티의 솔루션과 서비스는 고객에 대해 즐거운 책임을 갖고,
                  진정한 경쟁력을 약속합니다. 이러한 약속을 통해 (주)에이스아이티는 경쟁력 있는
                  솔루션 공급과 차별화된 서비스를 제공함으로써 세계 속에서도 인정받는 ‘글로벌 IT 서비스
                  회사’가 될 것입니다.
                  <br/>
                  <br/>“성공은 목적지가 아니라 여정입니다.” –제프 베조스-
                </li>
                <li>대표이사 홍승현</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 추가된 코드 끝 */}
    </div>
  );
};

export default About;
