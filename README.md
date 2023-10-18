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

## db migration guide
### 가장 최근의 마이그레이션 파일을 DB에 덮어쓰기
- 주의 : migrate 히스토리가 하나도 없는 경우에는 DB 데이터까지 초기화시킵니다.
```bash
npx prisma migrate dev
```
### DB 필드 수정하는 경우
1. 마이그레이션 파일 생성
`--name 파일이름`은 optional입니다.
```bash
npx prisma migrate dev --name 파일이름 --create-only
```

2. 생성한 마이그레이션 파일에 내용 작성
```sql
ALTER TABLE "user"
RENAME COLUMN "seq" TO "id"
```

3. 마이그레이션 파일 DB에 적용하기
```bash
npx prisma migrate dev (개발 서버)
npx prisma migrate deploy (실서버)
```

### DB 데이터 유지하면서 schema 수정사항 적용
```bash
npx prisma db push
```

### DB에 초기 데이터 (=더미 데이터) 삽입하기
https://github.com/prisma-korea/prisma-workshop/blob/rest-api/prisma/seed.ts
```
npx prisma db seed
```