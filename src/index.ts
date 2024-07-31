import express from 'express';
import path from 'path';
import router from './routes/index';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/dbConnection';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('dev'));

// connect Db--------------
connectDB()

// Use routes
app.use('/api', router); 

// Test route to ensure server is working
app.get('/hop', (req, res) => {
  console.log('Request received at /hop');
  res.send('Hello from /hop');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
