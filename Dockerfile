FROM node:20-alpine AS builder

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

# STEP 2
FROM node:20-alpine AS production
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY --from=builder /usr/src/app ./

