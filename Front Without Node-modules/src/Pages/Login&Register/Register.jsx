import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import AuthLayout from './AuthLayout';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../../Styles/AuthStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { registerUser } from '../../api/auth';
import { useState } from 'react';
import Loader from '../../Components/Loader/Loader';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('required_field')),
    email: Yup.string().email(t('invalid_email')).required(t('required_field')),
    password: Yup.string().min(8, t('password_requirements')).required(t('required_field')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], t('password_mismatch'))
      .required(t('required_field'))
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const startTime = Date.now();
    try {
      setSubmitting(true);
      setLoading(true);
      const response = await registerUser(values);
      
      // نفترض هنا أن الـ Backend يُعيد كائن يحتوي على خاصية message عند النجاح
      if (response && response.message) {
        toast.success(t('registration_success'));
        resetForm();
        // حساب الوقت المنقضي وإجبار فترة تحميل لا تقل عن 1500 مللي ثانية
        const elapsed = Date.now() - startTime;
        const delay = Math.max(1500 - elapsed, 0);
        await new Promise((resolve) => setTimeout(resolve, delay));
        navigate('/login');
      } else {
        toast.error(response.message || t('registration_failed'));
      }
    } catch (error) {
      toast.error(error.message || t('registration_failed'));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const socialButtonVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 }
  };

  return (
    <AuthLayout titleKey="create_account">
      {/* عرض الـ Loader كطبقة Overlay عند الحاجة */}
      {loading && <Loader />}
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <FiUser className={styles.inputIcon} />
              <input
                type="text"
                name="name"
                placeholder={t('full_name')}
                className={styles.inputField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                aria-label={t('full_name')}
              />
              {touched.name && errors.name && (
                <div className={styles.errorMessage}>{errors.name}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <FiMail className={styles.inputIcon} />
              <input
                type="email"
                name="email"
                placeholder={t('Email')}
                className={styles.inputField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                aria-label={t('Email')}
              />
              {touched.email && errors.email && (
                <div className={styles.errorMessage}>{errors.email}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                name="password"
                placeholder={t('password')}
                className={styles.inputField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                aria-label={t('password')}
              />
              {touched.password && errors.password && (
                <div className={styles.errorMessage}>{errors.password}</div>
              )}
            </div>

            <div className={styles.inputGroup}>
              <FiLock className={styles.inputIcon} />
              <input
                type="password"
                name="confirmPassword"
                placeholder={t('confirm_password')}
                className={styles.inputField}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.confirmPassword}
                aria-label={t('confirm_password')}
              />
              {touched.confirmPassword && errors.confirmPassword && (
                <div className={styles.errorMessage}>{errors.confirmPassword}</div>
              )}
            </div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t('register')}
            </motion.button>
            
            <div className={styles.divider}>
              <span>{t('or_register_with')}</span>
            </div>

            <div className={styles.socialButtonsRow}>
              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.google}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toast.success(t('google_register'))}
              >
                <FaGoogle className={styles.socialIcon} />
              </motion.button>

              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.microsoft}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toast.success(t('microsoft_register'))}
              >
                <FaMicrosoft className={styles.socialIcon} />
              </motion.button>

              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.apple}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toast.success(t('apple_register'))}
              >
                <FaApple className={styles.socialIcon} />
              </motion.button>
            </div>

            <div className={styles.authLinks}>
              <div className={styles.switchLink}>
                {t('have_account')}{' '}
                <Link to="/login" className={styles.linkAccent}>
                  {t('login_now')}
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
