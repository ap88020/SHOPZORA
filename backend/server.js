import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';

// APP CONFIG
const app = express();
const port = process.env.PORT || 3000;
connectDB();

// MIDDLEWARE
app.use(express.json());
app.use(cors())

// API ENDPOINT
app.get('/',(req,res) => {
    res.send('API IS WORKING');
})

app.listen(port , ()=> {
    console.log(`App is listening at port : ${port}`);
})