import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import authRoutes from './routes/auth.js';
import vendorRoutes from './routes/vendors.js';

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    // sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vendors', vendorRoutes);

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

app.get('/', (req, res) => {
  res.send('Backend is deployed and working!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});