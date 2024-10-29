import axios from 'axios';

export const API_SERVER_HOST = 'http://localhost:8000'

const informationAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/information`,
});

export const getInformation = () => informationAPI.get('');
export const getInformationById = (id) => informationAPI.get(`/${id}`);
export const createInformation = (data) => informationAPI.post('', data);
export const updateInformation = (id, data) => informationAPI.patch(`/${id}`, { request: data });
export const deleteInformation = (id) => informationAPI.delete(`/${id}`);


const historyAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/history`,
});

export const getHistory = () => historyAPI.get('');
export const getHistoryBySection = (sectionCode) => historyAPI.get(`/section_code/${sectionCode}`);
export const getHistoryById = (id) => historyAPI.get(`/id/${id}`);
export const createHistory = (data) => historyAPI.post('', data);
export const updateHistory = (id, data) => historyAPI.patch(`/${id}`, { request: data });
export const deleteHistory = (id) => historyAPI.delete(`/${id}`);


const clientAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/businessClient`,
});

export const getBusinessClients = () => clientAPI.get('');
export const getBusinessClientById = (id) => clientAPI.get(`/${id}`);
export const createBusinessClient = (data) => clientAPI.post('', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const updateBusinessClient = (id, data) => clientAPI.patch(`/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
});
export const deleteBusinessClient = (id) => clientAPI.delete(`/${id}`);


const vvAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/companyVisionValues`,
});

export const getCompanyVisionValues = () => vvAPI.get('');
export const getCompanyVisionValueById = (id) => vvAPI.get(`/${id}`);
export const createCompanyVisionValue = (data) => vvAPI.post('', data);
export const updateCompanyVisionValue = (id, data) => vvAPI.patch(`/${id}`, data);
export const deleteCompanyVisionValue = (id) => vvAPI.delete(`/${id}`);


const areaAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/businessArea`,
});

export const getBusinessAreas = () => areaAPI.get('');
export const getBusinessAreaById = (id) => areaAPI.get(`/${id}`);
export const createBusinessArea = (data) => areaAPI.post('', data);
export const updateBusinessArea = (id, data) => areaAPI.patch(`/${id}`, data);
export const deleteBusinessArea = (id) => areaAPI.delete(`/${id}`);


const inquiryAPI = axios.create({
    baseURL: `${API_SERVER_HOST}/inquiry`
});

export const sendInquiry = (data) => inquiryAPI.post('', data);

