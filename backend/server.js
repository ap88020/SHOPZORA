import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// MIDDLEWARE
app.use(express.json());
app.use(cors())

// API ENDPOINT
app.get('/',(req,res) => {
    res.send('API IS WORKING');
})

app.use('/api/user',userRouter); 
app.use('/api/product',productRouter); 

app.listen(port , ()=> {
    console.log(`App is listening at port : ${port}`);
})