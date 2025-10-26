import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import foodRouter from './routes/foodRoute.js'
import userRouter from './routes/UserRoute.js'
import 'dotenv/config.js'
import cartRouter from './routes/CartRoute.js'
import orderRouter from './routes/orderRoute.js'
import path from 'path'
import { fileURLToPath } from 'url'

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app config
const app = express()
const port = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors({
  origin: [
    'http://localhost:4000',
    'https://your-frontend-app.vercel.app' // Update after frontend deployment
  ],
  credentials: true
}))

//DB connection
connectDB();

//api endpoints
app.use("/api/food", foodRouter)
app.use('/images', express.static(path.join(__dirname, 'uploads')))
app.use('/api/user', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get("/", (req, res) => {
  res.json({ 
    message: "API working",
    status: "Server is running successfully",
    timestamp: new Date().toISOString()
  })
})

// Health check route for Vercel
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  })
})

// Only listen locally, not in Vercel production
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`)
  })
}

// Export for Vercel
export default app