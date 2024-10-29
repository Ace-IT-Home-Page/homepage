// Introduction.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Introduction.css';

const Introduction = () => {
  const [visionData, setVisionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCompanyVisionValues = async () => {
      try {
        const res = await axios.get('/companyVisionValues');
        console.log('Response List:', res);
        setVisionData(res.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getCompanyVisionValues();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="introduction-container">
      <div className="introduction-image-container">
        <img src="/AdobeStock_vision.jpeg" alt="회사 이미지" className="introduction-company-image" />
      </div>
      <div className="text-container">
        <h2>ACE IT VISION</h2>
        <p className="subheading">새로운 기술, 고객과의 소통을 통한 새로운 패러다임을 제시</p>
        <ul>
          {visionData.company_vision_values
            .filter((item) => item.vv_id >= 2)
            .map((item) => (
              <li key={item.vv_id}>
                <span className="vv_text">
                  {item.vv_name}
                  {item.vv_content ? `: ${item.vv_content}` : ''}
                </span>
                {item.vv_details && <p>{Object.values(item.vv_details).join(', ')}</p>}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Introduction;
