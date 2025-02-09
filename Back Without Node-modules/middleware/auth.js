// middleware/auth.js
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  try {
    // استخراج التوكن من الهيدر Authorization (يُتوقع أن يكون بالشكل "Bearer <token>")
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'لم يتم توفير توكن' });
    }

    // التحقق من صحة التوكن وفك تشفيره باستخدام المفتاح السري
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // إضافة بيانات المستخدم المفكوكة إلى الطلب
    next();
  } catch (error) {
    res.status(401).json({ message: 'توكن غير صالح' });
  }
};

export default authMiddleware;
