// routes/auth.js
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import authMiddleware from '../middleware/auth.js';

const router = Router();

// تسجيل مستخدم جديد بدون إرسال بريد التحقق
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // التأكد من عدم وجود مستخدم بنفس البريد الإلكتروني
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'البريد الإلكتروني مُستخدم!' });
    }

    // إنشاء مستخدم جديد وحفظه في قاعدة البيانات
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'تم التسجيل بنجاح!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تسجيل الدخول
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // البحث عن المستخدم والتأكد من صحة بيانات الدخول
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'بيانات الدخول غير صحيحة!' });
    }

    // إنشاء التوكن بعد التحقق من صحة البيانات
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        birthDate: user.birthDate, // تأكد من وجود هذا الحقل في نموذج المستخدم أو قم بحذفه إذا لم يكن مستخدمًا
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// تغيير كلمة المرور
router.put('/change-password', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    
    // التحقق من صحة كلمة المرور القديمة
    const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'كلمة المرور القديمة غير صحيحة' });
    }

    // التأكد من أن كلمة المرور الجديدة ليست نفس القديمة
    const isSame = await bcrypt.compare(req.body.newPassword, user.password);
    if (isSame) {
      return res.status(400).json({ message: 'لا يمكن استخدام كلمة المرور القديمة' });
    }

    // تحديث كلمة المرور
    user.password = req.body.newPassword;
    await user.save();

    res.json({ success: true, message: 'تم تغيير كلمة المرور بنجاح' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
