import React, { useEffect, useState } from 'react';
import { getCompanyVisionValues, deleteCompanyVisionValue } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './CompanyVisionValues.css'; // CSS 파일 추가

const CompanyVisionValuesList = () => {
    const [companyVisionValues, setCompanyVisionValues] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCompanyVisionValues()
            .then((response) => setCompanyVisionValues(response.data.company_vision_values))
            .catch((error) => console.error('비전 값을 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteCompanyVisionValue(id)
                .then(() => setCompanyVisionValues((prev) => prev.filter((visionValue) => visionValue.vv_id !== id)))
                .catch((error) => console.error('비전 값 삭제 중 오류 발생:', error));
        }
    };

    return (
        <div className="vision-values-container">
            <h2>Company Vision Value List</h2>
            <div className="button-container">
                <button onClick={() => navigate('/addCompanyVisionValue')}>추가 등록</button>
                <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>
            </div>
            <table className="vision-values-table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Content</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {companyVisionValues.map((visionValue) => (
                    <tr key={visionValue.vv_id}>
                        <td>{visionValue.vv_id}</td>
                        <td>{visionValue.vv_name}</td>
                        <td>{visionValue.vv_content}</td>
                        <td>
                            <pre>{JSON.stringify(visionValue.vv_details, null, 2)}</pre> {/* JSON을 보기 쉽게 출력 */}
                        </td>
                        <td>
                            <button onClick={() => navigate(`/editCompanyVisionValue/${visionValue.vv_id}`)}>수정</button>
                            <button onClick={() => handleDelete(visionValue.vv_id)}>삭제</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompanyVisionValuesList;
