import express from 'express'
import apiRouter from './routes/index.js'
import { connectDB } from './config/db.js'
const app = express()
const port = 3000


connectDB();

app.use('/api',apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})