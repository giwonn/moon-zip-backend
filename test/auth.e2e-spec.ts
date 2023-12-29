import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from '@/v1/auth/auth.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        // 다른 필요한 필드
      })
      .expect(201) // 상태 코드는 실제 응답에 따라 달라질 수 있습니다.
      .then((response) => {
        expect(response.body).toHaveProperty('accessToken'); // 응답의 구조는 실제 구현에 따라 달라질 수 있습니다.
      });
  });

  it('/auth/token/rotate (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/token/rotate')
      .send({
        refreshToken: 'some-refresh-token',
      })
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveProperty('newRefreshToken');
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
