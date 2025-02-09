// models/User.js
import mongoose, { isValidObjectId } from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'student' },
  profileImage: { type: String, default: '/images/Avatar-default-profile.png' },
  birthDate: { type: Date, default: null },
  age: { type: Number, default: 0 }
});

// تشفير كلمة المرور قبل حفظها
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export default mongoose.model('User', userSchema);
