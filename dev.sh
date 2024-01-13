#!/bin/bash

docker_stop() {
  docker compose -f docker-compose.dev.yml down -v  --rmi local --remove-orphans --timeout 0
}

docker_start() {
  docker compose -f docker-compose.dev.yml up --build --force-recreate
}

clear() {
  # 컨테이너 생성중에 종료시 에러 발생하여 딜레이를 줌
  sleep 1.5
  docker_stop
}

# SIGINT : Ctrl + C 와 같이 강제로 종료되면 실행
# EXIT : 스크립트가 종료되면 실행
trap clear EXIT

# 실행중인 컴포즈가 있다면 종료 및 삭제
docker_stop

# 도커 컴포즈 실행
docker_start
