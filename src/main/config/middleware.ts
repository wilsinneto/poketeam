import { bodyParser } from '@/main/middleware'
import { Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
}
