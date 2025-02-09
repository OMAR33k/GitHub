// routes/user.js
import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import User from '../models/User.js';

const router = Router();

// جلب بيانات الملف الشخصي
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث الاسم
router.put('/update-name', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { name },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json({ success: true, message: 'تم تحديث الاسم بنجاح', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث تاريخ الميلاد وتحديث العمر بناءً عليه
router.put('/update-birthdate', authMiddleware, async (req, res) => {
  try {
    const { birthDate } = req.body;
    const diff = Date.now() - new Date(birthDate).getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { birthDate, age },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json({ success: true, message: 'تم تحديث تاريخ الميلاد والعمر بنجاح', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// تحديث الصورة الشخصية
router.put('/update-profile-image', authMiddleware, async (req, res) => {
  try {
    const { profileImage } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { profileImage },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'المستخدم غير موجود' });
    res.json({ success: true, message: 'تم تحديث الصورة الشخصية بنجاح', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
