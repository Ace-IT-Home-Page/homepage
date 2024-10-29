import React, { useState } from 'react';
import { createBusinessArea } from '../../../api/AdminAPI';
import { useNavigate } from 'react-router-dom';
import './BusinessArea.css'; // CSS 파일 추가

const AddBusinessArea = () => {
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [areaType, setAreaType] = useState([{ key: '', value: '' }]);
    const [details, setDetails] = useState([{ key: '', value: '' }]);
    const navigate = useNavigate();

    // key-value 쌍 추가
    const handleAddDetail = (setter) => {
        setter((prev) => [...prev, { key: '', value: '' }]);
    };

    // key-value 쌍 삭제
    const handleRemoveDetail = (setter, index) => {
        setter((prev) => prev.filter((_, i) => i !== index));
    };

    // key-value 입력값 변경 핸들러
    const handleDetailChange = (setter, index, field, value) => {
        setter((prev) => {
            const newDetails = [...prev];
            newDetails[index][field] = value;
            return newDetails;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedAreaType = areaType.reduce((acc, item) => {
            if (item.key && item.value) {
                acc[item.key] = item.value;
            }
            return acc;
        }, {});

        const formattedDetails = details.reduce((acc, item) => {
            if (item.key && item.value) {
                acc[item.key] = item.value;
            }
            return acc;
        }, {});

        createBusinessArea({
            area_name: name,
            area_content: content || null,
            area_type: Object.keys(formattedAreaType).length > 0 ? formattedAreaType : null,
            area_details: Object.keys(formattedDetails).length > 0 ? formattedDetails : null,
        })
            .then(() => {
                alert('사업 영역이 성공적으로 추가되었습니다.');
                navigate('/businessAreaList');
            })
            .catch((error) => console.error('사업 영역 추가 중 오류 발생:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="business-area-container">
            <h2>Add Business Area</h2>
            <input
                type="text"
                placeholder="사업 영역 이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <textarea
                placeholder="사업 영역 내용 (선택 사항)"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />

            <h3>사업 유형</h3>
            {areaType.map((item, index) => (
                <div key={index} className="details-row">
                    <input
                        type="text"
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) => handleDetailChange(setAreaType, index, 'key', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) => handleDetailChange(setAreaType, index, 'value', e.target.value)}
                    />
                    {areaType.length > 1 && (
                        <button type="button" onClick={() => handleRemoveDetail(setAreaType, index)}>삭제</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => handleAddDetail(setAreaType)}>사업 유형 추가</button>

            <h3>사업 세부 사항</h3>
            {details.map((item, index) => (
                <div key={index} className="details-row">
                    <input
                        type="text"
                        placeholder="Key"
                        value={item.key}
                        onChange={(e) => handleDetailChange(setDetails, index, 'key', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Value"
                        value={item.value}
                        onChange={(e) => handleDetailChange(setDetails, index, 'value', e.target.value)}
                    />
                    {details.length > 1 && (
                        <button type="button" onClick={() => handleRemoveDetail(setDetails, index)}>삭제</button>
                    )}
                </div>
            ))}
            <button type="button" onClick={() => handleAddDetail(setDetails)}>세부 사항 추가</button>

            <div className="form-button-container">
                <button type="submit">등록</button>
                <button type="button" onClick={() => navigate('/businessAreaList')}>목록으로 돌아가기</button>
            </div>
        </form>
    );
};

export default AddBusinessArea;
