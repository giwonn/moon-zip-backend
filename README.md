# MoonZip

## Requirement
컨테이너만 띄우는 경우 docker만 설치하면 됩니다.
```
node v20
npm
docker
```

## Get Started
```bash
npm install
npm run start:dev
```

## 서버 실행만 해보는 경우
- Docker Compose를 이용하여 실행
```bash
docker compose -f docker-compose.dev.yml up --build -d
```
- Docker Compose 컨테이너 종료 및 삭제
```bash
docker compose -f docker-compose.dev.yml down -v --rmi local
```

