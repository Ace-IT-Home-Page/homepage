import React, { useEffect, useState } from 'react';
import { getBusinessAreas, deleteBusinessArea } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './BusinessArea.css'; // CSS 파일 추가

const BusinessAreaList = () => {
    const [businessAreas, setBusinessAreas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getBusinessAreas()
            .then((response) => setBusinessAreas(response.data.business_areas))
            .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteBusinessArea(id)
                .then(() => setBusinessAreas((prev) => prev.filter((area) => area.area_id !== id)))
                .catch((error) => console.error('사업 영역 삭제 중 오류 발생:', error));
        }
    };

    return (
        <div className="business-area-container">
            <h2>Business Area List</h2>
            <div className="button-container">
                <button onClick={() => navigate('/addBusinessArea')}>사업 영역 추가</button>
                <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>
            </div>
            <ul className="business-area-list">
                {businessAreas.map((area) => (
                    <li key={area.area_id}>
                        <h5>{area.area_name}</h5>
                        <p>{area.area_content}</p>
                        <pre>{JSON.stringify(area.area_type, null, 2)}</pre>
                        <pre>{JSON.stringify(area.area_details, null, 2)}</pre>
                        <button onClick={() => navigate(`/editBusinessArea/${area.area_id}`)}>수정</button>
                        <button onClick={() => handleDelete(area.area_id)}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessAreaList;
