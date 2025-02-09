import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';  

const app = express();

// إعدادات الأمان والـ Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);
app.use(express.static('public'));
app.use(express.json({ limit: '10kb' }));
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// تعريف المسارات
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);  // ربط مسارات المستخدم

// معالجة الأخطاء المركزية
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({
    status: 'error',
    message: 'حدث خطأ غير متوقع!',
  });
});

// الاتصال بقاعدة البيانات وتشغيل الخادم كما هو موجود
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
  });
  console.log('✅ Connected to MongoDB');
};

const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    const server = app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );

    const shutdown = async () => {
      console.log('🛑 Shutting down server...');
      await server.close();
      await mongoose.disconnect();
      process.exit(0);
    };

    process.on('SIGINT', shutdown);
    process.on('SIGTERM', shutdown);
    process.on('unhandledRejection', (err) => {
      console.error('‼️ Unhandled Rejection:', err);
      shutdown();
    });
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
};

startServer();
