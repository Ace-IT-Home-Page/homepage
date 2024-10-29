import React, { useEffect, useState } from 'react';
import { getHistory, deleteHistory } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './History.css'; // 공통 스타일 파일 추가

const HistoryList = () => {
    const [historyList, setHistoryList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getHistory()
            .then((response) => setHistoryList(response.data.history))
            .catch((error) => console.error('히스토리를 가져오는 중 오류 발생:', error));
    }, []);

    const handleDelete = (id) => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            deleteHistory(id)
                .then(() => setHistoryList((prev) => prev.filter((history) => history.history_id !== id)))
                .catch((error) => console.error('히스토리 삭제 중 오류 발생:', error));
        }
    };

    const sectionCodeToText = (code) => {
        return code === 1 ? '회사 연혁' : '개발 본부 이력';
    };

    return (
        <div className="history-container">
            <h2>History List</h2>
            <button onClick={() => navigate('/admin')}>관리자 페이지로 돌아가기</button>

            {['회사 연혁', '개발 본부 이력'].map((title, index) => (
                <div key={index}>
                    <h3>{title}</h3>
                    <button onClick={() => navigate(`/addHistory?sectionCode=${index + 1}`)}>{title} 추가</button>
                    <table className="history-table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Date</th>
                            <th>Content</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {historyList
                            .filter(history => history.history_section_code === index + 1)
                            .map((history) => (
                                <tr key={history.history_id}>
                                    <td>{history.history_id}</td>
                                    <td>{history.history_date}</td>
                                    <td>{history.history_content}</td>
                                    <td>
                                        <button onClick={() => navigate(`/editHistory/${history.history_id}`)}>수정</button>
                                        <button onClick={() => handleDelete(history.history_id)}>삭제</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ))}
        </div>
    );
};

export default HistoryList;
