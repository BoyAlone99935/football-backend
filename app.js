// server.js
require('express-async-errors'); // must be on top
require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors')
const notFoundMiddleware = require('./middleware/notFoundMiddleWare');
const errorHandlerMiddleware = require('./middleware/Error-handler-middleware');

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/User');
const matchRoutes = require('./routes/Match');
const me = require('./routes/me');
const getTeams = require('./routes/selectClub')

const app = express();
app.use(cors({
  origin: "http://localhost:5173", // your React app's URL
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // allows cookies or Authorization header
}));
app.options("*", cors());
app.use(express.json());

// --- Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/me', me);
app.use('/api/select' , getTeams)
// --- 404 Middleware ---
app.use(notFoundMiddleware);

// --- Global Error Handler ---
app.use(errorHandlerMiddleware);

// --- Start server with DB connection + WebSocket ---
const startServer = async () => {
  try {
    //  Connect to MongoDB
    await connectDB();
    console.log('✅ MongoDB connected');

    // Create HTTP server for Express + Socket.IO
    const server = http.createServer(app);

    //  Set up Socket.IO
    const io = new Server(server, {
      cors: {
        origin: 'http://localhost:5173', 
        methods: ['GET', 'POST'],
      },
    });

    //  Make io accessible in controllers
    app.set('io', io);

    //  Handle Socket connections
    io.on('connection', (socket) => {
      console.log('✅ User connected:', socket.id);

      socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
      });
    });

    //  Start server
    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};


startServer();
