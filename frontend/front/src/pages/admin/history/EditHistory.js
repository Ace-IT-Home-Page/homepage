import React, { useState, useEffect } from 'react';
import { getHistoryById, updateHistory } from '../../../api/AdminAPI';
import { useParams, useNavigate } from 'react-router-dom';
import './History.css'; // 공통 스타일 파일 추가

const EditHistory = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [sectionText, setSectionText] = useState('');
    const [date, setDate] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        getHistoryById(id)
            .then((response) => {
                const history = response.data;
                setSectionText(history.history_section_code === 1 ? '회사 연혁' : '개발 본부 이력');
                setDate(history.history_date);
                setContent(history.history_content);
            })
            .catch((error) => console.error('히스토리를 가져오는 중 오류 발생:', error));
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateHistory(id, {
            history_section_code: sectionText === '회사 연혁' ? 1 : 2,
            history_date: date,
            history_content: content
        })
            .then(() => {
                alert('히스토리가 성공적으로 수정되었습니다.');
                navigate('/historyList');
            })
            .catch((error) => console.error('히스토리 수정 중 오류 발생:', error));
    };

    return (
        <div className="history-container">
            <h2>Edit History</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={sectionText}
                    readOnly
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <div className="form-button-container">
                    <button type="submit">수정</button>
                    <button type="button" onClick={() => navigate('/historyList')}>목록으로 돌아가기</button>
                </div>
            </form>
        </div>
    );
};

export default EditHistory;
