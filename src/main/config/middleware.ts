import { bodyParser } from '@/main/middleware'
import { cors } from '@/main/middleware/cors'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
