import supertest from 'supertest';
import { createServer } from '@config/express';

describe('Server', () => {
  const app = createServer();

  it('should pass ping', (done) => {
    supertest(app).get('/ping').expect('PONG', done);
  });

  it('should return albums', async () => {
    const result = await supertest(app).get('/api/albums?artist=drake');
    
    expect(result.body).toBeDefined(); 
    expect(result.body.length).toBeGreaterThan(100);
  });

  it('should return error if no artist', async () => {
    const result = await supertest(app).get('/api/albums');
    
    expect(result.body).toBeDefined(); 
    expect(result.body.status).toBe(400);
  });
});
