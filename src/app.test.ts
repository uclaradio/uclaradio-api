import * as request from 'supertest';
import * as app from './app';

describe('GET /', () => {
  it('should return hello world', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/);
  });
});
