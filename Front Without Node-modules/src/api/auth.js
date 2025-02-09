import axios from 'axios';

// إنشاء كائن Axios مع تعيين الـ baseURL (تأكد من تعيين المتغير المناسب في .env)
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// دالة تسجيل المستخدم
export const registerUser = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData, {
      validateStatus: (status) => status < 500, // قبول جميع الحالات ما عدا 500
    });

    if (response.status >= 400) {
      throw new Error(response.data.message || 'فشل في عملية التسجيل');
    }

    return response.data;
  } catch (error) {
    console.error('تفاصيل الخطأ أثناء التسجيل:', {
      message: error.message,
      request: error.config,
      response: error.response?.data,
    });
    throw error;
  }
};

// دالة تسجيل الدخول
export const loginUser = async (credentials) => {
  try {
    const response = await API.post('/auth/login', credentials, {
      validateStatus: (status) => status < 500,
    });

    if (response.status >= 400) {
      throw new Error(response.data.message || 'فشل في عملية تسجيل الدخول');
    }

    return response.data;
  } catch (error) {
    console.error('تفاصيل الخطأ أثناء تسجيل الدخول:', {
      message: error.message,
      request: error.config,
      response: error.response?.data,
    });
    throw error;
  }
};
