import React, {Component} from 'react';
import {motion} from 'framer-motion'; // Framer Motion 임포트
import './About.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComp from '../components/layouts/Navigation/NavbarComp';

// 애니메이션 설정 객체
const containerVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      when: 'beforeChildren',
      staggerChildren: 0.3,
    },
  },
};
const pageAnimate_1 = {
  initial: {y: 0, opacity: 0},
  animate: {x: 0, opacity: 1},
  transition: {duration: 0.8}
};
export default class About extends Component {
  render() {
    return (
        <div className="container">
          <div className="row align-items-center">
            {/* 왼쪽 이미지 */}
            <motion.div
              className="col-md-6"
              initial={{x: -100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.8}}
            >
              <div className="title_comp_name">
                회사 비전 및 가치
              </div>
              <img
                src="/vision_value.png"
                alt="비전 및 가치"
                className="about-vision-image"
              />
            </motion.div>

            {/* 오른쪽 텍스트 */}
            <motion.div
              className="col-md-6"
              initial={{x: 100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.8, delay: 0.2}}
            >
              <div className="table-container">
                <table className="styled-table">
                  <tbody>
                  <tr>
                    <th>컨설팅</th>
                    <th>솔루션 개발 / 소싱</th>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td>방법론<br/>Process & Data Modeling<br/>솔루션 컨설팅<br/>IT Infra 및 System 관리 등</td>
                    <td>Product Line 관리<br/>국 내외 솔루션 소싱<br/>SI 산출물 솔루션화(패키지화)<br/>기타 IT 기획 등</td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <th>SI & IT Service</th>
                    <th>솔루션 기술 지원</th>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td>프로젝트 수행<br/>SW 턴키 / HW 개발<br/>패키지 SW 적용<br/>공공, 금융, 기업 등</td>
                    <td>솔루션 설치, 적용<br/>솔루션 Trouble Shooting<br/>솔루션 교육 지원<br/>SW, FW, HW 등</td>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <th>전기/ 통신 공사</th>
                    <th>보안시스템</th>
                  </tr>
                  </tbody>
                  <tbody>
                  <tr>
                    <td>전기 공사 구축<br/>통신 공사 구축</td>
                    <td>CCTV 시스템 구축<br/>출입통제 시스템 구축</td>
                  </tr>
                  </tbody>
                </table>
              </div>

            </motion.div>
          </div>

        <div className="container">
          <div className="row align-items-center">

            {/* 왼쪽 이미지 */}
            <motion.div
              className="col-md-6"
              initial={{x: -100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.8}}
            >
              <img
                src="/AdobeStock_global.jpeg"
                alt="비전 및 가치"
                className="about-ceo-image"
              />
            </motion.div>

            {/* 오른쪽 텍스트 */}
            <motion.div
              className="col-md-6"
              initial={{x: 100, opacity: 0}}
              animate={{x: 0, opacity: 1}}
              transition={{duration: 0.8, delay: 0.2}}
            >
              <div className="about-CEO-text-container">
                <h1>CEO 인사말</h1>
                <p className="subheading">글로벌 기업으로 성장하겠습니다.</p>
                <ul>
                  <li>여러분을 향한 (주)에이스아이티의 솔루션과 서비스는 고객에 대해 즐거운 책임을 갖고, 진정한 경쟁력을 약속합니다.
                    이러한 약속을 통해 (주)에이스아이티는 경쟁력 있는 솔루션 공급과 차별화된 서비스를 제공함으로써 세계 속에서도 인정받는 ‘글로벌 IT 서비스 회사’ 가 될 것입니다.
                    “ 성공은 목적지가 아니라 여정입니다.” –제프 베조스-
                  </li>
                  <li>대표이사 홍승현</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }
}