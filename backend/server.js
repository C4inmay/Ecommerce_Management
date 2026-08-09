const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const apiRoutes = require('./routes/storeRoutes')
const { notFoundHandler } = require('./middleware/notFound')
const { errorHandler } = require('./middleware/errorHandler')

const app = express()
const port = Number(process.env.PORT) || 3001

app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN ? process.env.FRONTEND_ORIGIN.split(',').map((origin) => origin.trim()) : true,
  })
)
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.status(200).json({ success: true, message: 'Ecommerce API is running' })
})

app.use('/api', apiRoutes)

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Ecommerce API listening on port ${port}`)
})
