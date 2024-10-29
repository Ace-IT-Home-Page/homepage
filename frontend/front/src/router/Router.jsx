// Router.jsx
import React from 'react';
import { Routes, Route, useLocation  } from 'react-router-dom';
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

const Router = () => {
    const location = useLocation(); // Get the current location
    return (
        <div className="app-container">
            {/* Conditionally render HeadBanner if not on home route */}
            {location.pathname !== '/' && <HeadBanner />}
            <Head/>
            {/* <NavbarComp /> */}
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

                    {/* 관리자 페이지 라우트 */}
                    <Route path="/admin" element={<AdminPage />} />
                    {/* information router */}
                    <Route path="/informationList" element={<InformationList />} />
                    <Route path="/addInformation" element={<AddInformation />} />
                    <Route path="/editInformation/:id" element={<EditInformation />} />

                    {/* history router */}
                    <Route path="/historyList" element={<HistoryList />} />
                    <Route path="/addHistory" element={<AddHistory />} />
                    <Route path="/editHistory/:id" element={<EditHistory />} />

                    {/* business client router */}
                    <Route path="/businessClientList" element={<BusinessClientList />} />
                    <Route path="/addBusinessClient" element={<AddBusinessClient />} />
                    <Route path="/editBusinessClient/:id" element={<EditBusinessClient />} />

                    {/* company vision values router */}
                    <Route path="/companyVisionValuesList" element={<CompanyVisionValuesList />} />
                    <Route path="/addCompanyVisionValue" element={<AddCompanyVisionValue />} />
                    <Route path="/editCompanyVisionValue/:id" element={<EditCompanyVisionValue />} />

                    {/* business area router */}
                    <Route path="/businessAreaList" element={<BusinessAreaList />} />
                    <Route path="/addBusinessArea" element={<AddBusinessArea />} />
                    <Route path="/editBusinessArea/:id" element={<EditBusinessArea />} />
                </Routes>
            </div>
            <Footer />
        </div>
    );
};

export default Router;

