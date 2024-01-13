# MoonZip

## Requirement
```
docker
```

## Get Started
```bash
bash dev.sh
```

## db migration guide
### 가장 최근의 마이그레이션 파일을 DB에 덮어쓰기
- 주의 : migrate 히스토리가 하나도 없는 경우에는 DB 데이터까지 초기화시킵니다.
```bash
docker-compose exec server npx prisma migrate dev
```

### DB 수정하는 경우 (로컬에서!)
1. schema.prisma 수정
2. `docker compose exec server npx prisma db push`
3. 마이그레이션 파일 생성
```bash
docker-compose exec server npx prisma migrate dev --name 파일이름
```

### DB 필드명 변경하는 경우
1. 마이그레이션 파일 생성
`--name 파일이름`은 optional입니다.
```bash
docker-compose exec server npx prisma migrate dev --name 파일이름 --create-only
```

2. 생성한 마이그레이션 파일에 내용 작성
```sql
ALTER TABLE "user"
RENAME COLUMN "seq" TO "id"
```

3. 마이그레이션 파일 DB에 적용하기
```bash
docker-compose exec server npx prisma migrate dev (개발 서버)
docker-compose exec server npx prisma migrate deploy (실서버)
```

### DB 데이터 유지하면서 schema 수정사항 적용
```bash
docker-compose exec server npx prisma db push
```

### DB에 초기 데이터 (=더미 데이터) 삽입하기
https://github.com/prisma-korea/prisma-workshop/blob/rest-api/prisma/seed.ts
```bash
docker-compose exec server npx prisma db seed
```
