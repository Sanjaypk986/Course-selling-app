import express from 'express'
import apiRouter from './routes/index.js'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'
const app = express()
const port = 3000

// acces req.body
app.use(express.json())
// to get req.cookies
app.use(cookieParser())
// mongodb connection
connectDB();

app.use('/api',apiRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})