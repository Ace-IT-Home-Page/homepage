import React, { useState, useEffect } from 'react';
import { useAnimate, stagger, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Menu.css';
import OrganizationHistory from "../pages/OrganizationHistory";

// Stagger configuration for menu items
const staggerMenuItems = stagger(0.1, { startDelay: 0.15 });

// Custom hook for animating dropdown menus
function useDropdownMenuAnimation(isOpen) {
    const [scope, animate] = useAnimate();

    useEffect(() => {
        // Animate the arrow rotation
        animate(".arrow", { rotate: isOpen ? 180 : 0 }, { duration: 0.2 });

        // Animate the dropdown menu's clip-path for smooth opening/closing
        animate(
            ".dropdown-menu",
            {
                clipPath: isOpen
                    ? "inset(0% 0% 0% 0% round 10px)"
                    : "inset(10% 50% 90% 50% round 10px)",
            },
            {
                type: "spring",
                bounce: 0,
                duration: 0.5,
            }
        );

        // Animate individual dropdown items with stagger effect
        animate(
            ".dropdown-item",
            isOpen
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.3, filter: "blur(20px)" },
            {
                duration: 0.2,
                delay: isOpen ? staggerMenuItems : 0,
            }
        );
    }, [isOpen, animate]);

    return scope;
}

export function Menu({ isOpen }) {
    // State for BUSINESS dropdown
    const [isBusinessOpen, setIsBusinessOpen] = useState(false);
    const businessScope = useDropdownMenuAnimation(isBusinessOpen);

    // State for ABOUT sub-menu
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const aboutScope = useDropdownMenuAnimation(isAboutOpen);

    // Optional: Close other menus when one is opened
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
        <nav className="menu-container">
            <ul>
                <li>
                    <Link to="/" style={{textDecoration: 'none', color: 'inherit'}}>
                        HOME
                    </Link>
                </li>

                {/* ABOUT Menu with Sub-Menu */}
                <li ref={aboutScope}>
                    <motion.button
                        whileTap={{scale: 1.07}}
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
                        <div className="arrow" style={{transformOrigin: "50% 55%"}}>
                            <svg width="25" height="15" viewBox="0 5 20 20">
                                <path d="M0 7 L 20 7 L 10 16"/>
                            </svg>
                        </div>
                    </motion.button>

                    <ul
                        className="dropdown-menu"
                        style={{
                            display: isAboutOpen ? "block" : "none",
                            pointerEvents: isAboutOpen ? "auto" : "none",
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                        }}
                    >
                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/about" style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                회사소개
                            </Link>
                        </li>
                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/about/OrganizationHistory"
                                  style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                조직도 & 연혁
                            </Link>
                        </li>
                    </ul>
                </li>

                {/* BUSINESS Dropdown */}
                <li ref={businessScope}>
                    <motion.button
                        whileTap={{scale: 0.97}}
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
                        <div className="arrow" style={{transformOrigin: "50% 55%"}}>
                            <svg width="25" height="15" viewBox="0 5 20 20">
                                <path d="M0 7 L 20 7 L 10 16"/>
                            </svg>
                        </div>
                    </motion.button>

                    <ul
                        className="dropdown-menu"
                        style={{
                            display: isBusinessOpen ? "block" : "none",
                            pointerEvents: isBusinessOpen ? "auto" : "none",
                            clipPath: "inset(10% 50% 90% 50% round 10px)",
                        }}
                    >

                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/business/SystemDevelop"
                                  style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                시스템 개발
                            </Link>
                        </li>
                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/business/FMSMonitoring"
                                  style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                FMS 모니터링
                            </Link>
                        </li>
                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/business/InfrastructureSystem"
                                  style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                인프라 시스템
                            </Link>
                        </li>
                        <li className="dropdown-item" style={{opacity: 0, transform: 'scale(0.3)'}}>
                            <Link to="/business/Maintenance"
                                  style={{textDecoration: 'none', color: 'black', padding: '10px'}}>
                                유지보수
                            </Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Contact Us
                    </Link>
                </li>
            </ul>
        </nav>
    );
}