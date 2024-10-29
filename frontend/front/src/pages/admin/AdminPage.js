import React from 'react';
import {useNavigate} from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
  const navigate = useNavigate();

  const handleNavigateToInformationList = () => {
    navigate('/informationList');
  };

  const handleNavigateToHistoryList = () => {
    navigate('/historyList');
  };

  const handleNavigateToBusinessClient = () => {
    navigate('/businessClientList');
  };

  const handleNavigateToCompanyVisionValues = () => {
    navigate('/companyVisionValuesList');
  };

  const handleNavigateToBusinessArea = () => {
    navigate('/businessAreaList');
  };

  return (
    <div className="admin-page-container">
      <h3>관리자 페이지</h3>
      <button onClick={handleNavigateToInformationList}>
        information 목록 보기
      </button>
      <button onClick={handleNavigateToHistoryList}>
        history 목록 보기
      </button>
      <button onClick={handleNavigateToBusinessClient}>
        business client 목록 보기
      </button>
      <button onClick={handleNavigateToCompanyVisionValues}>
        company vision values 목록 보기
      </button>
      <button onClick={handleNavigateToBusinessArea}>
        business area 목록 보기
      </button>
    </div>

  );
};

export default AdminPage;
