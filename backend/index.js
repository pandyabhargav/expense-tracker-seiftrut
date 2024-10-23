import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/expenseRoutes.js'
import userrouter from './routes/userRoutes.js'


dotenv.config()
const app = express()
app.use(cors());
app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173'  
}));


app.use('/expenses', router)
app.use('/api/auth', userrouter)



mongoose
  .connect("mongodb+srv://pandyabhargav707:gBKDS9OLdHqD5OrP@cluster0.t0msy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log('DB CONNECTED SUCCESSFULLY')
  })
  .catch(err => {
    console.error(err)
  })


app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`)
})
