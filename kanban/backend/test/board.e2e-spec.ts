import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('BoardsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /boards creates a board', async () => {
    const response = await request(app.getHttpServer())
      .post('/boards')
      .send({ name: 'My first board' })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('My first board');
  });

  it('GET /boards returns boards', async () => {
    const response = await request(app.getHttpServer())
      .get('/boards')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
