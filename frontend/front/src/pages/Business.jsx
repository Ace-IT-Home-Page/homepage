import React from 'react';
import {motion} from 'framer-motion';
import './Business.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getInformation } from '../api/AdminAPI'; // Import getInformation API

// 아이템 목록
const items = [
  {
    id: "1",
    title: "배달플랫폼, 외식 산업에서 어떤 역할을 하고 있을까?",
    description: "<배달플랫폼의 7가지 역할>",
    category: "파트너 성장",
    image: "/AdobeStock_global.jpeg"
  },
  {
    id: "2",
    title: "함께가치를 위한 배민다운 이야기",
    description: "가치경영보고서 <배민스토리 2024>",
    category: "파트너 성장",
    image: "/AdobeStock_global.jpeg"
  },
  {
    id: "3",
    title: "사장님 걱정마세요! 급여 문제는 저희가 해결할게요",
    description: "2024 우아한 노무해결사",
    category: "파트너 성장",
    image: "/AdobeStock_global.jpeg"
  },
  {
    id: "4",
    title: "사장님 걱정마세요! 급여 문제는 저희가 해결할게요",
    description: "2024 우아한 노무해결사",
    category: "파트너 성장",
    image: "/AdobeStock_global.jpeg"
  },
  // 나머지 아이템들도 동일하게 추가해주세요.
];

export default function Business() {
  return (
    <div className="container">
      <section>
        <div className="together-title-wrap">
          <h4 className="together-title"></h4>
          <div className="together-title-sub"></div>
        </div>
        <div className="list list-grid together-list">
          {items.map((item) => (
            <div className="list-box" key={item.id} data-is-exposed="true">
              <div className="list-thumb">
                <motion.img
                  src={item.image}
                  alt=""
                  whileHover={{scale: 1.03}}
                  transition={{duration: 0.3}}
                />
              </div>
              <div className="list-cont">
                <p className="list-title">{item.title}</p>
                <p className="list-desc">{item.description}</p>
                <div>
                  <span className="list-category">{item.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
