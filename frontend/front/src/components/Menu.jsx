import React, { useState, useEffect } from 'react';
import { stagger, motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Menu.css';
import './MenuToggle.css';
import OrganizationHistory from "../pages/OrganizationHistory";

// Stagger configuration for menu items
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

export function Menu({ isOpen, toggleMenu }) {
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const [isAboutOpen, setIsAboutOpen] = useState(false);

    useEffect(() => {
        if (isBusinessOpen) {
            setIsAboutOpen(false);
        }
    }, [isBusinessOpen]);

    useEffect(() => {
        if (isAboutOpen) {
            setIsBusinessOpen(false);
        }
    }, [isAboutOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.nav
                    className="menu-container"
                    drag="x" // Enable horizontal drag
                    dragElastic={0.2} // Adds a bit of resistance to the drag
                    onDragEnd={(event, info) => {
                        if (info.offset.x > 100) { // Close menu if dragged more than 100px to the right
                            toggleMenu(false); // Update the menu state after animation
                        }
                    }}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }} // 메뉴가 닫힐 때 빠르게 사라지도록 설정
                    transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.3 }}
                >
                    <ul>
                        <li>
                            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                                HOME
                            </Link>
                        </li>

                        {/* ABOUT Menu with Sub-Menu */}
                        <li>
                            <motion.button
                                whileTap={{ scale: 1.07 }}
                                onClick={() => setIsAboutOpen(!isAboutOpen)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                ABOUT
                                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                                    <svg width="25" height="15" viewBox="0 5 20 20">
                                        <path d="M0 7 L 20 7 L 10 16" />
                                    </svg>
                                </div>
                            </motion.button>

                            <AnimatePresence>
                                {isAboutOpen && (
                                    <motion.ul
                                        className="dropdown-menu"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <li className="dropdown-item">
                                            <Link to="/about" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                회사소개
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/about/OrganizationHistory" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                조직도 & 연혁
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>

                        {/* BUSINESS Dropdown */}
                        <li>
                            <motion.button
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setIsBusinessOpen(!isBusinessOpen)}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontWeight: 'bold',
                                }}
                            >
                                BUSINESS
                                <div className="arrow" style={{ transformOrigin: "50% 55%" }}>
                                    <svg width="25" height="15" viewBox="0 5 20 20">
                                        <path d="M0 7 L 20 7 L 10 16" />
                                    </svg>
                                </div>
                            </motion.button>

                            <AnimatePresence>
                                {isBusinessOpen && (
                                    <motion.ul
                                        className="dropdown-menu"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <li className="dropdown-item">
                                            <Link to="/business/SystemDevelop" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                시스템 개발
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/business/FMSMonitoring" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                FMS 모니터링
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/business/InfrastructureSystem" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                인프라 시스템
                                            </Link>
                                        </li>
                                        <li className="dropdown-item">
                                            <Link to="/business/Maintenance" style={{ textDecoration: 'none', color: 'black', padding: '10px' }}>
                                                유지보수
                                            </Link>
                                        </li>
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>

                        <li>
                            <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Contact Us
                            </Link>
                        </li>
                    </ul>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
