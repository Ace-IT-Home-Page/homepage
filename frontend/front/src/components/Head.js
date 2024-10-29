import React, { useState, useEffect } from 'react';
import './Head.css';
import NavbarComp from "./layouts/Navigation/NavbarComp"; // 로고 이미지 경로

const Head = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        let prevScrollPos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const scrollingDown = currentScrollPos > prevScrollPos;

            if (window.innerWidth > 768) { // PC 화면에서는 스크롤에 따라 헤더가 나타나거나 사라지게
                setIsVisible(!scrollingDown || currentScrollPos < 10); // 상단 근처에서는 항상 보이도록 설정
            } else { // 모바일 화면에서는 항상 헤더가 고정됨
                setIsVisible(true);
            }

            prevScrollPos = currentScrollPos;
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`head ${isVisible ? 'visible' : 'hidden'}`}>
            <div className="head-container">
                <img src="/aceit_logo.png" alt="Ace IT Logo" className="head-image" />
            </div>
            <NavbarComp isVisible={isVisible}/> {/* isVisible을 NavbarComp에 전달 */}
        </header>
    );
};

export default Head;
