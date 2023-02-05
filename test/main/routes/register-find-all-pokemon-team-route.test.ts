import request from 'supertest'

import app from '@/main/config/app'

describe('Find all pokemon team route', () => {
  test('should return an account on success', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/api/find-all-pokemon-team')
      .expect(200)
  })
})
