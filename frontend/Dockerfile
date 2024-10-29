# Node.js 베이스 이미지 사용
FROM node:18-alpine AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY aceit/package.json aceit/package-lock.json ./

# 의존성 설치
RUN npm install

# 전체 프로젝트 파일 복사
COPY aceit /app

# 애플리케이션 빌드
RUN npm run build

# Nginx 베이스 이미지 사용
FROM nginx:stable-alpine

# Nginx 설정 파일 복사 (nginx.conf가 있다면)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 결과물을 Nginx의 기본 경로로 복사
COPY --from=build /app/build /usr/share/nginx/html

# 포트 노출
EXPOSE 80

# Nginx

