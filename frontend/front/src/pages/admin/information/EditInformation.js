import React, { useState, useEffect } from 'react';
import { getInformationById, updateInformation } from '../../../api/AdminAPI';
import { useParams, useNavigate } from 'react-router-dom';
import './Information.css'; // 공통 스타일 파일 추가

const EditInformation = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        getInformationById(id)
            .then((response) => {
                setName(response.data.information_name);
                setContent(response.data.information_content);
            })
            .catch((error) => console.error('정보를 가져오는 중 오류 발생:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateInformation(id, { information_name: name, information_content: content })
            .then(() => {
                alert('정보가 성공적으로 수정되었습니다.');
                navigate('/informationList');
            })
            .catch((error) => console.error('정보 수정 중 오류 발생:', error));
    };

    return (
        <div className="information-container">
            <h2>Edit Information</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="정보 이름"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <textarea
                    placeholder="정보 내용"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="form-button-container">
                    <button type="submit">수정</button>
                    <button type="button" onClick={() => navigate('/informationList')}>
                        목록으로 돌아가기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditInformation;
