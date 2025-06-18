import express from 'express';
import authRoutes from './routes/auth.route.js'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'


import { connectDB } from './lib/db.js';


const app = express();

dotenv.config();

const PORT  = process.env.PORT;
app.use(express.json());
app.use(cookieparser());
app.use('/api/auth', authRoutes);




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
    connectDB();
});

