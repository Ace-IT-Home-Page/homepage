import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Head.css';
import NavbarComp from "./layouts/Navigation/NavbarComp";

const Head = ({ isLoggedIn, setIsLoggedIn }) => {
    const [isVisible, setIsVisible] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const scrollingDown = currentScrollPos > prevScrollPos;

            if (window.innerWidth > 768) {
                setIsVisible(!scrollingDown || currentScrollPos < 10);
            } else {
                setIsVisible(true);
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className={`head ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="head-container">
                <img src="/aceit_logo.png" alt="Ace IT Logo" className="head-image" />
                <div className="nav-logout-container">
                    {isLoggedIn && (
                        <button onClick={handleLogout} className="logout-button">
                            로그아웃
                        </button>
                    )}
                    <NavbarComp isVisible={isVisible} />
                </div>
            </div>
        </header>
    );
};

export default Head;
