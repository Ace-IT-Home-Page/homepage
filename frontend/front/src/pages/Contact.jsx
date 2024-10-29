import React, {Component} from 'react';
import {GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import NavbarComp from '../components/layouts/Navigation/NavbarComp';
import {motion} from 'framer-motion'; // framer-motion 임포트
import './Contact.css'; // CSS 파일 임포트
import {sendInquiry} from '../api/AdminAPI'

const containerStyle = {
  width: '100%',
  height: '400px',
  margin: '0 auto',
};

const center = {
  lat: 37.232579803113,
  lng: 127.02345429284,
};

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

const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {opacity: 1, y: 0},
};

const pageAnimate_1 = {
  initial: {y: 0, opacity: 0},
  animate: {x: 0, opacity: 1},
  transition: {duration: 0.8}
};

export default class Contact extends Component {

  state = {
    name: '',
    call_num: '',
    email: '',
    message: '',
  };

  // 폼 제출 이벤트 핸들러
  handleSubmit = async (e) => {
    e.preventDefault();

    const inquiryData = {
      message: {
        inquiry_writer: this.state.name,
        inquiry_writer_email: this.state.email,
        inquiry_writer_contact_number: this.state.call_num,
        inquiry_details: this.state.message,
      },
    };

    try {
      await sendInquiry(inquiryData);
      alert('문의가 성공적으로 전송되었습니다.');
      // 입력 필드 초기화
      this.setState({
        name: '',
        call_num: '',
        email: '',
        message: '',
      });
    } catch (error) {
      alert('문의 전송 중 오류가 발생했습니다.');
      console.error(error);
    }
  };

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  };

  render() {
    return (
      <div>
        <NavbarComp/>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <div className="google-map-container">
            <motion.div initial="hidden"
                        animate="visible"
                        variants={containerVariants}>
              <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center}/>
                </GoogleMap>
              </LoadScript>
            </motion.div>
          </div>
          <motion.section
            className="contact-container"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>

            <article className="waytocome-item_title">
              <dt>㈜ 에이스아이티</dt>
              <dd className="waytocome-address">
                <span>경기도 수원시 권선구 곡반정로 13번길 16-19&nbsp;</span>
                <span>디타워 서울포레스트 3~5층</span>
              </dd>
            </article>
            <article className="waytocome-item_callnum">
              <dt>전화</dt>
              <dd>070-8258-6020</dd>
            </article>
            <article className="waytocome-item_fax">
              <dt>팩스</dt>
              <dd>070-8248-6020</dd>
            </article>
            <article className="waytocome-item-email">
              <dt>이메일</dt>
              <dd>aceitcompany@aceit.com</dd>
            </article>
          </motion.section>

          <motion.section
            className="email-form"
            initial="hidden"
            animate="visible"
            variants={containerVariants}>
            <h3>문의하기</h3>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="name">이름</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="이름을 입력하세요"
                value={this.state.name}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="call_num">연락처</label>
              <input
                type="text"
                id="call_num"
                name="call_num"
                placeholder="연락처를 입력하세요"
                value={this.state.call_num}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="email">이메일</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="이메일을 입력하세요"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />

              <label htmlFor="message">메시지</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="메시지를 입력하세요"
                value={this.state.message}
                onChange={this.handleChange}
                required
              />

              <button type="submit">보내기</button>
            </form>
          </motion.section>
        </motion.div>
      </div>
    );
  }
}
