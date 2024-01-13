#!/bin/sh

# Docker Compose 시작
docker compose -f docker-compose.dev.yml up --build --force-recreate -d

# 로그를 실시간으로 보여줌
docker compose -f docker-compose.dev.yml logs -f

# 로그를 종료하면 Docker Compose 종료 및 삭제
docker compose -f docker-compose.dev.yml down -v  --rmi local --remove-orphans --timeout 0
