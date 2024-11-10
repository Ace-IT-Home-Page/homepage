import React, { useEffect, useState } from 'react';
import { getBusinessAreaById } from '../../api/AdminAPI';
import './Maintenance.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Maintenance = () => {
    const [businessAreas, setBusinessAreas] = useState(null);

    useEffect(() => {
        getBusinessAreaById(4)
            .then((response) => setBusinessAreas(response.data))
            .catch((error) => console.error('사업 영역을 가져오는 중 오류 발생:', error));
    }, []);

    if (!businessAreas || !businessAreas.area_name) {
        return <p>데이터를 불러오는 중입니다...</p>;
    }

    const { area_name, area_details, area_content } = businessAreas;

    const keys = Object.keys(area_details);
    const equipmentKey = keys.find(
        (key) => key === '투입장비' || key === '04' || key.includes('투입장비')
    );

    let reorderedKeys = keys.filter((key) => key !== equipmentKey);
    if (equipmentKey) {
        reorderedKeys.push(equipmentKey);
    }

    return (
        <div className="container py-5">
            <h3 className="maintenance-title-comp-name text-center mb-5">{area_name}</h3>
            <div className="row justify-content-center">
                {reorderedKeys.map((key, index) => (
                    <div key={index} className="col-md-9 mb-5">
                        <div className="maintenance-custom-card shadow-sm h-100">
                            <div className="d-flex align-items-center maintenance-custom-header mb-3">
                                <div className="maintenance-section-id rounded-circle d-flex align-items-center justify-content-center mr-3">
                                    {`0${index + 1}`}
                                </div>
                                <h4 className="maintenance-custom-title mb-0">{key}</h4>
                            </div>
                            <div className="maintenance-custom-body">
                                <ul className="maintenance-list pl-3">
                                    {area_details[key].map((item, itemIndex) => (
                                        <li key={itemIndex} className="maintenance-item mb-4">
                                            <i className="fas fa-check-circle mr-2 text-primary"></i> {item}
                                            {equipmentKey === key && (
                                                <div className="maintenance-image-container text-center mt-3">
                                                    <img
                                                        src={`/image_${itemIndex + 1}.jpg`}
                                                        alt={item}
                                                        className="maintenance-img-fluid"
                                                    />
                                                </div>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Maintenance;