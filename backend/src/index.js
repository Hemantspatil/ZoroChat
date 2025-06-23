import express from 'express';
import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import dotenv from 'dotenv'
import cookieparser from 'cookie-parser'
import cors from 'cors'

import path from 'path'

import { connectDB } from './lib/db.js';
import { app, server } from './lib/socket.js';




dotenv.config();

const PORT  = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json({ limit: '5mb' }));
app.use(cookieparser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true,
}))

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

const frontendPath = path.join(__dirname, "../frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  // Only serve index.html if no API route matched
  app.get("/*", (req, res) => {
    if (req.originalUrl.startsWith("/api")) return;
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}



server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
    connectDB();
});

