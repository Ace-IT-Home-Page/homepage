USE aceitdb;
create table if not exists aceitdb.business_area
(
    area_id      int auto_increment
        primary key,
    area_name    varchar(255)  not null,
    area_type    json          null,
    area_content varchar(3000) null,
    area_details json          null
);

create table if not exists aceitdb.business_client
(
    client_id        int auto_increment
        primary key,
    client_name      varchar(255)  not null,
    client_logo_name varchar(1000) null,
    client_logo_path varchar(1000) null
);

create table if not exists aceitdb.company_vision_values
(
    vv_id      int auto_increment
        primary key,
    vv_name    varchar(255)  not null,
    vv_content varchar(3000) null,
    vv_details json          null
);

create table if not exists aceitdb.history
(
    history_id           int auto_increment
        primary key,
    history_section_code int           not null comment '회사 연혁 = 1, 사업 및 개발 본부 이력 = 2',
    history_date         date          not null,
    history_content      varchar(2000) not null
);

create table if not exists aceitdb.information
(
    information_id      int auto_increment
        primary key,
    information_name    varchar(255)  not null,
    information_content varchar(5000) null
);

INSERT INTO information (information_name, information_content)
VALUES
    ('회사명', '㈜에이스아이티'),
    ('대표이사', '홍승현'),
    ('회사 개요', '응용 소프트웨어 및 엔지니어링 기술 등 축적된 Know-How를 바탕으로 유비쿼터스 세상을 실현하는 핵심요소 기술인 하드웨어 및 응용 소프트웨어를 개발하여 고객의 사용 환경에 적합한 솔루션을 제공합니다. 당사가 제공하는 솔루션 기술을 응용하여 전산실 설비관리, 물류 분야, 환경 감시 등 다양한 분야에 적용하며, 신뢰성 있는 뉴/구설 네트워크, SI(시스템통합) 분야 및 애플리케이션 솔루션을 개발하여 고객에게 제공합니다.'),
    ('주소', '경기도 수원시 권선구 곡반정로 13번길 16-19'),
    ('사업자번호', '480-88-03458'),
    ('기본 연락처', '070-8258-6020'),
    ('FAX 번호', '070-8248-6020'),
    ('이메일', 'sicorx@gmail.com'),
    ('홈페이지', 'www.ace24.kr'),
    ('CEO 메시지', '글로벌 기업으로 성장하겠습니다. 여러분을 향한 (주)에이스아이티의 솔루션과 서비스는 고객에 대해 즐거운 책임을 갖고, 진정한 경쟁력을 약속합니다. 이러한 약속을 통해 (주)에이스아이티는 경쟁력 있는 솔루션 공급과 차별화된 서비스를 제공함으로써 세계 속에서도 인정받는 "글로벌 IT 서비스 회사"가 될 것입니다. "성공은 목적지가 아니라 여정입니다." -제프 베소스-  에이스아이티 대표이사  홍승현'),
    ('운영 시간', '월-금, 09:00 - 18:00');


ALTER TABLE history
    MODIFY COLUMN history_section_code INT NOT NULL COMMENT '회사 연혁 = 1, 사업 및 개발 본부 이력 = 2';

INSERT INTO history (history_section_code, history_date, history_content)VALUES(1, 20240809, '주식회사 에이스아이티 설립(경기도 수원시 권선구)'),(2, 20240809, 'SKT T-지킴이 서비스 시스템 개발'),(2, 20240809, '국민은행 전산센터(염창동, 여의도, 내수동) 내 전산설비 환경감시시스템(FMS) 구축'),(2, 20240809, '몽골 정부전산센타 구축사업 참여 (종합상황실, CCTV, 출입통제, FMS)'),(2, 20240809, '국립재난 안전연구원 기반 환경마감 공사 2개소'),(2, 20240809, 'SKT 등하교 문자서비스용 지그비 테크 3만개 양산 및 납품'),(2, 20240809, '국민은행 염창동 여의도 전산센타 FMS 외 유지보수'),(2, 20240809, '교보생명 전산실 이전 및 FMS 구축'),(2, 20240809, '모로코 정보화교육장 구축'),(2, 20240809, '산업단지공단 전산실 구축'),(2, 20240809, '아시아나 항공 전산실 구축(FMS, 누수, 인테리어 등)'),(2, 20240809, '교육과학기술부 학생안전강화학교 시스템 약 100여개교 보안시스템 구축'),(2, 20240809, '국민은행 염창동 여의도 전산센타 FMS 외 유지보수'),(2, 20240809, 'OOO 시뮬레이터 구축 – 교관 통제석 S/W (시나리오 편집, 훈련통제, 훈련평가 등)'),(2, 20240809, '국민은행 (염창동) 인프라시설 유지보수'),(2, 20240809, '캄보디아 전산실 구축 공사'),(2, 20240809, '서울지방경찰청 항온항습기 설치 공사'),(2, 20240809, '경인양행 전산실 이전공사'),(2, 20240809, '초등학교 비상호출 시스템 구축(서울 시내 242개교)'),(2, 20240809, '해군 대잠전 모의훈련 CBT 개발'),(2, 20240809, '스마트미터 디스플레이(IHD) 보급 1차 사업'),(2, 20240809, '안산 외국인 상담센터 전산실 구축'),(2, 20240809, 'CJ시스템즈 분당 전산실 구축'),(2, 20240809, '국민은행 염창동 여의도 전산센타 FMS 외 유지보수'),(2, 20240809, 'K-MEG 한전저압 표준형 전열량계 모뎀 및 DCU 개발'),(2, 20240809, '산업단지 공단 – 항온항습기, UPS, 소방외 유지보수'),(2, 20240809, '아시아나 인프라시설 유지보수'),(2, 20240809, '대검찰청 사이버 수사대 UPS 전원설비 공사'),(2, 20240809, '국민은행 (염창동) 인프라시설 유지보수'),(2, 20240809, '현대모비스 서산주행시험장 FMS 구축'),(2, 20240809, '우즈베키스탄 거래소 인프라 구축'),(2, 20240809, '교통관리공단 운전 적성검사 시뮬레이터 개발'),(2, 20240809, '용인시청상황실 및 전산실 구축 공사'),(2, 20240809, '스마트그리드 보급사업 한전산업개발 컨소시엄'),(2, 20240809, '국민은행 염창동 여의도 전산센타 FMS 외 유지보수'),(2, 20240809, 'ACE 화재 콜센타 구축'),(2, 20240809, '한국산업단지공단 전산센터 이전'),(2, 20240809, '한국산업단지공단 전산센터 철거 및 원상복구'),(2, 20240809, '호매실 주민센타 FMS 구축'),(2, 20240809, 'LG VNS 인천 캠퍼스 전산실 FMS 구축'),(2, 20240809, '비씨카드 IT 재해복구 센터 이전/증설 및 재구축'),(2, 20240809, '르완다 정부 주요 전산센타 FMS 보안설비 구축(5개소)'),(2, 20240809, '아시아나 항공 전산실 유지보수'),(2, 20240809, 'CJ 제일제당 전산실 유지보수'),(2, 20240809, '강남RND켐퍼스 보안관제센터 구축'),(2, 20240809, '외환펀드서비스 전산센터 이전'),(2, 20240809, 'K-MEG AMI 유지보수'),(2, 20240809, '구리 교통관제센타 FMS 구축'),(2, 20240809, '국민은행 여의도 전산센타 확장(7층) FMS 구축'),(2, 20240809, '인터넷 진흥원 전산실 이전사업'),(2, 20240809, '브이피 IT 재해복구센터 구축'),(2, 20240809, '학술원 전산실 이전사업'),(2, 20240809, '국민은행 염창동 여의도 전산센타 유지보수'),(2, 20240809, '에버랜드 전산실 전원설비 공사'),(2, 20240809, '광주은행 본점 FMS 구축'),(2, 20240809, '현대자동차공장 FMS 구축 3개소'),(2, 20240809, '삼성 토탈백업 전산센터 FMS 구축'),(2, 20240809, '투르크매니스탄 국립대학교 통합시뮬레이션 설치사업 및 기반 환경마감 공사'),(2, 20240809, '현대 모비스 CCR FMS 구축 13개소'),(2, 20240809, '키르키스탄 선거관리시스템 FMS 구축'),(2, 20240809, 'UAE BNPP ADB 데이터센터 보안, 출입통제, FMS 구축'),(2, 20240809, '포항 가속기연구소 FMS 구축'),(2, 20240809, '르완다 키갈리 전산센터 FMS 구축');

INSERT INTO company_vision_values (vv_name, vv_content, vv_details)VALUES('시작말 (ace_it_intro)', 'ACE IT vision', NULL),('컨설팅', NULL, '{"1": "방법론", "2": "Process & Data Modeling", "3": "솔루션 컨설팅", "4": "IT Infra 및 System 관리 등"}'),('솔루션 개발 / 소싱', NULL, '{ "1" : "Product Line 관리", "2" : "국 내외 솔루션 소싱", "3" : "SI 산출물 솔루션화(패키지화)", "4" : "기타 IT 기획 등"}'),('SI & IT Service', NULL, '{ "1" : "프로젝트 수행", "2" : "SW 턴키 / HW 개발", "3" : "패키지 SW 적용", "4" : "공공, 금융, 기업 등"}'),('솔루션 기술 지원', NULL, '{ "1" : "솔루션 설치, 적용", "2" : "솔루션 Trouble Shooting", "3" : "솔루션 교육 지원", "4" : "SW, FW, HW 등"}'),('전기/ 통신 공사', NULL, '{ "1" : "전기 공사 구축", "2" : "통신 공사 구축"}'),('보안시스템', NULL, '{ "1" : "CCTV 시스템 구축", "2" : "출입통제 시스템 구축"}');

INSERT INTO business_area (area_name, area_type, area_content, area_details)
VALUES
    ('시스템 개발',
     '{"1": "SI & IT Service", "2": "솔루션 컨설팅", "3": "솔루션 개발 / 소싱"}',
     NULL,
     '{"컨설팅": ["방법론", "Process & Data Modeling", "솔루션 컨설팅", "IT Infra 및 System 관리 등"],
       "솔루션 개발/소싱": ["Product Line 관리", "국 내외 솔루션 소싱", "SI 산출물 솔루션화(패키지화)", "기타 IT 기획 등"],
       "SI & IT Service": ["프로젝트 수행", "SW 턴키 / HW 개발", "패키지 SW 적용", "공공, 금융, 기업 등"],
       "솔루션 기술 지원": ["솔루션 설치, 적용", "솔루션 Trouble Shooting", "솔루션 교육 지원", "SW, FW, HW 등"]}'),

    ('FMS 모니터링',
     '{"1": "통합 모니터링", "2": "FMS 모니터링", "3": "스마트 공장 모니터링"}',
     '전산 센터내의 각종 설비(UPS, 항온항습기, 소화설비 등) 및 환경(온도, 습도, 연기, 누수 등)에 대한 관리 감시 기능은 물론 국소내 중요 정보에 대한 물리적 보안감시 기능이 통합된 실시간 통합 관리 관제시스템 구축으로 사전 장애 예측을 통한 전산 사고 예방 및 신속한 장애 처리를 통해 업무 손실을 최소화함으로 효율적 운영 유지 관리를 위한 시스템 입니다.',
     '{"기본사항": ["웹 브라우저를 통한 FMS 설정 및 대쉬보드/위젯으로 기반설비 상태와 알람 정보를 GUI로 제공",
       "알람 발생과 복구에 대한 문자 메시지 전송",
       "수요기관에서 운영중 인 문자 발신서버 연동",
       "수집된 데이터에 대한 저장, 검색, 통계 기능",
       "PUE값 제공과 항온항습기 교번운전 프로토콜 연동"],
       "구축방안": ["요구사항에 부합하도록 연계 및 커스터마이징 제공",
         "모니터링 대상에 대한 직관적인 2D, 3D 대시보드 구현",
         "모니터링 대상의 장애 감지 및 경보, 이력관리",
         "수집된 데이터 12개월 이상 보관",
         "각종 센서를 하나의 인터페이스로 구성",
         "온습도 측정, 열연기감지, 분전반 전력 사용량 누수감지, UPS 데이터등 실시간 상태 표시"],
       "적용기술": ["데이터 베이스 구축 및 Web 화면 제공(3D 기반 그래픽 대시보드)",
         "통계관리  : 리포트, 현황정보",
         "고객의 운영에 맞는 GUI 구현",
         "3단계 장애 등급 관리 기능",
         "장애 및 설비 이력관리를 통해 장애 사전예방",
         "Log 정보를 저장하여 조회 및 리포트 출력"]}'),

    ('인프라 시스템',
     '{"1": "전기 공사  구축", "2": "통신 공사 구축", "3": "보안시스템 구축"}',
     '다년간  현장 구축 경험 보유 인력 기반으로 전산 센터 및 다양한 시설에 대한 전기 공사, 통신공사, 보안시스템을 고객 요구사항에 맞게 안정적이고 최적화된 시스템 구축하여 효율적 운영 유지 관리를 위한 시스템 입니다.',
     '{"전기공사": ["전산실 전기 공사",
       "일반 건물 및 상가 건물 전기 공사",
       "산업 현장 전기공사",
       "오피스텔 및 아파트 전기 공사",
       "리조트 전기 공사"],
       "통신공사": ["전산실 통신 공사",
         "일반 건물 및 상가 건물 통신 공사",
         "산업 현장 통신공사",
         "오피스텔 및 아파트 통신 공사",
         "리조트 통신 공사"],
       "보안시스템": ["전산실 출입 보안 시스템 및  CCTV  시스템 공사",
         "일반 건물 및 상가 건물 출입 보안 시스템 및 CCTV 시스템 공사",
         "산업 현장 출입 보안 시스템 및 CCTV 시스템 공사",
         "오피스텔 및 아파트 출입 보안 시스템 및 CCTV 시스템 공사",
         "리조트 출입 보안 시스템 및 CCTV 시스템 공사"]}'),

    ('유지보수',
     '{}',
     '유지보수는 시스템이나 장비가 최적의 상태에서 원활하게 작동하도록 하기 위해 수행하며, 사용자가 최적의 상태에서 장비를 원활하게 사용할 수 있도록 유지시켜 전산업무 효율 증대에 기여합니다.',
     '{"예방정비": ["예방정비 : 시스템 이상 유무점검 및 장애 시 복구",
       "정비주기 : 정기적인 정비(예방 정비)",
       "비정기  : 문제 발생시 및 요청 시",
       "예방정비 서비스 일지 기록 및 보관"],
       "장애조치 긴급정비": ["장애발생시 4시간 이내 현장도착",
         "도착 후 24시간 이내 복구/정상가동"],
       "유지보수 지원범위": ["기본점검 서비스, 설치 전 환경점검 서비스",
         "관제 부문 : 관제 솔루션, FMS 시스템",
         "보안부문 : 출입통제시스템, CCTV 外"],
       "투입장비 측정기" : ["계측기", "접지저항기", "온도미터", "멀티미터"]}');
