import React, { useState, useEffect } from 'react';
import './NavbarComp.css';
import { MenuToggle } from '../../MenuToggle';
import { Menu } from '../../Menu';
import { useLocation } from 'react-router-dom';

export default function NavbarComp({ isVisible }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // 경로가 변경될 때 메뉴를 즉시 닫음
  useEffect(() => {
    setIsOpen(false); // 메뉴를 닫음
  }, [location.pathname]);

  return (
    <div className={`navbar-comp ${isOpen ? 'menu-open' : ''} ${isVisible ? 'visible' : 'hidden'}`}>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen}  /> {/* immediateClose 전달 */}
      <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </div>
  );
}
