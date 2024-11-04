import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();

    // 페이지 로드 시 토큰 확인
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            // 토큰이 없으면 로그인 페이지로 이동
            navigate('/login');
        }
    }, [navigate]);

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
                회사 소개
            </button>
            <button onClick={handleNavigateToCompanyVisionValues}>
                회사 비전 및 가치
            </button>
            <button onClick={handleNavigateToHistoryList}>
                회사 연혁 및 개발본부 이력
            </button>
            <button onClick={handleNavigateToBusinessClient}>
                주요 고객사
            </button>
            <button onClick={handleNavigateToBusinessArea}>
                사업 영역(BUSINESS)
            </button>
        </div>

    );
};

export default AdminPage;