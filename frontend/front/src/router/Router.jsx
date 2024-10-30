// Router.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import About from '../pages/About';
import Home from '../pages/Home';
import Business from '../pages/Business';
import Contact from '../pages/Contact';
import NavbarComp from '../components/layouts/Navigation/NavbarComp';
import Introduction from '../pages/Introduction';
import AdminPage from "../pages/admin/AdminPage";
import AddInformation from "../pages/admin/information/AddInformation";
import InformationList from "../pages/admin/information/InformationList";
import EditInformation from "../pages/admin/information/EditInformation";
import HistoryList from "../pages/admin/history/HistoryList";
import AddHistory from "../pages/admin/history/AddHistory";
import EditHistory from "../pages/admin/history/EditHistory";
import CompanyVisionValuesList from "../pages/admin/company_vision_values/CompanyVisionValuesList";
import AddCompanyVisionValue from "../pages/admin/company_vision_values/AddCompanyVisionValues";
import EditCompanyVisionValue from "../pages/admin/company_vision_values/EditCompanyVisionValues";
import BusinessAreaList from "../pages/admin/business_area/BusinessAreaList";
import AddBusinessArea from "../pages/admin/business_area/AddBusinessArea";
import EditBusinessArea from "../pages/admin/business_area/EditBusinessArea";
import BusinessClientList from "../pages/admin/business_client/BusinessClientList";
import AddBusinessClient from "../pages/admin/business_client/AddBusinessClient";
import EditBusinessClient from "../pages/admin/business_client/EditBusinessClient";
import OrganizationHistory from "../pages/OrganizationHistory";
import SystemDevelop from "../pages/business/SystemDevelop";
import FMSMonitoring from "../pages/business/FMSMonitoring";
import InfrastructureSystem from "../pages/business/InfrastructureSystem";
import Maintenance from "../pages/business/Maintenance";
import HeadBanner from "../components/HeadBanner";
import Head from "../components/Head";
import Login from "../pages/admin/login/Login";

const Router = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        // 로그인 상태가 변경될 때마다 확인합니다.
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]);

    return (
        <div className="app-container">
            {/* Conditionally render HeadBanner if not on home route */}
            {location.pathname !== '/' && <HeadBanner />}
            <Head isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* 로그인 상태 전달 */}
            <div className="main-content">
                <Routes>
                    {/* 일반 페이지 라우트 */}
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about/OrganizationHistory" element={<OrganizationHistory />} />
                    <Route path="/business" element={<Business />} />
                    <Route path="/business/SystemDevelop" element={<SystemDevelop />} />
                    <Route path="/business/FMSMonitoring" element={<FMSMonitoring />} />
                    <Route path="/business/InfrastructureSystem" element={<InfrastructureSystem />} />
                    <Route path="/business/Maintenance" element={<Maintenance />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/introduction" element={<Introduction />} />

                    {/* 로그인 페이지 라우트 */}
                    <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* 관리자 페이지 라우트 (로그인 필요) */}
                    <Route path="/admin" element={isLoggedIn ? <AdminPage /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* information router */}
                    <Route path="/informationList" element={isLoggedIn ? <InformationList /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/addInformation" element={isLoggedIn ? <AddInformation /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/editInformation/:id" element={isLoggedIn ? <EditInformation /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* history router */}
                    <Route path="/historyList" element={isLoggedIn ? <HistoryList /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/addHistory" element={isLoggedIn ? <AddHistory /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/editHistory/:id" element={isLoggedIn ? <EditHistory /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* business client router */}
                    <Route path="/businessClientList" element={isLoggedIn ? <BusinessClientList /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/addBusinessClient" element={isLoggedIn ? <AddBusinessClient /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/editBusinessClient/:id" element={isLoggedIn ? <EditBusinessClient /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* company vision values router */}
                    <Route path="/companyVisionValuesList" element={isLoggedIn ? <CompanyVisionValuesList /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/addCompanyVisionValue" element={isLoggedIn ? <AddCompanyVisionValue /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/editCompanyVisionValue/:id" element={isLoggedIn ? <EditCompanyVisionValue /> : <Login onLogin={() => setIsLoggedIn(true)} />} />

                    {/* business area router */}
                    <Route path="/businessAreaList" element={isLoggedIn ? <BusinessAreaList /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/addBusinessArea" element={isLoggedIn ? <AddBusinessArea /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/editBusinessArea/:id" element={isLoggedIn ? <EditBusinessArea /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Router;
