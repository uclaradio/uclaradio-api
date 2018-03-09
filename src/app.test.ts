import * as request from 'supertest';
import * as app from './app';

describe('GET /', () => {
  it('should redirect to /graphiql', () => {
    return request(app)
      .get('/')
      .expect(302)
      .expect('Location', '/graphiql');
  });
});
