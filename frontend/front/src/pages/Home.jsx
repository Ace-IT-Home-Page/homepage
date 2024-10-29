import React, {useEffect} from 'react';
import Header from "../components/Header";
import Introduction from "../pages/Introduction";
import Footer from "../components/Footer";
import ReactFullpage from '@fullpage/react-fullpage';
import './Home.css';

const Home = () => {
  const anchors = ['home', '2', '3'];

  useEffect(() => {
    // 뷰포트 높이 계산 함수
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // 초기 실행 및 리사이즈 이벤트 리스너 등록
    setVh();
    window.addEventListener('resize', setVh);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', setVh);
    };
  }, []);

  return (
    <>
        {/* ReactFullpage Wrapper 내부는 섹션 관리 */}
        <ReactFullpage
          anchors={anchors}
          navigation
          scrollingSpeed={2000}
          touchSensitivity={55}
          scrollOverflow={true}
          fitToSection={true}
          render={({fullpageApi}) => (
            <ReactFullpage.Wrapper>
              <div className="section">
                <Header/>
                {/* 스크롤 다운 화살표 */}
                <div
                  className="scroll-down-arrow"
                  onClick={() => fullpageApi.moveSectionDown()}
                >
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
              <div className="section">
                <div>
                  <Introduction/>
                </div>
                  <div>
                    <Footer/>
                  </div>
                </div>
            </ReactFullpage.Wrapper>
          )}
        />
    </>
  );
};

export default Home;
