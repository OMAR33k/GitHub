import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import AuthLayout from './AuthLayout';
import { FiMail, FiLock } from 'react-icons/fi';
import { FaGoogle, FaMicrosoft, FaApple } from 'react-icons/fa';
import toast from 'react-hot-toast';
import styles from '../../Styles/AuthStyles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loginUser } from '../../api/auth';
import { useEffect, useState } from 'react';
import Loader from '../../Components/Loader/Loader';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email(t('invalid_email')).required(t('required_field')),
    password: Yup.string().min(8, t('password_requirements')).required(t('required_field'))
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    const startTime = Date.now();
    try {
      setSubmitting(true);
      setLoading(true);
      const response = await loginUser({
        email: values.email,
        password: values.password
      });
      
      localStorage.setItem('user', JSON.stringify(response));
      toast.success(t('login_success'));

      // حساب الوقت المنقضي وإجبار فترة تحميل لا تقل عن 1500 مللي ثانية
      const elapsed = Date.now() - startTime;
      const delay = Math.max(1500 - elapsed, 0);
      await new Promise((resolve) => setTimeout(resolve, delay));
      
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || t('login_error'));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const socialButtonVariants = {
    hover: { scale: 1.1, rotate: 5 },
    tap: { scale: 0.95 }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const error = urlParams.get('error');
    if (error) toast.error(t('social_login_error'));
  }, [t]);

  return (
    <AuthLayout titleKey="welcome_back">
      {/* عرض الـ Loader كطبقة Overlay عند الحاجة */}
      {loading && <Loader />}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
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

            <motion.button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? t('logging_in') : t('login')}
            </motion.button>

            <div className={styles.divider}>
              <span>{t('or_login_with')}</span>
            </div>

            <div className={styles.socialButtonsRow}>
              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.google}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() =>
                  window.location.href = `${process.env.REACT_APP_API_URL}/auth/google`
                }
              >
                <FaGoogle className={styles.socialIcon} />
              </motion.button>

              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.microsoft}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toast.success(t('microsoft_login'))}
              >
                <FaMicrosoft className={styles.socialIcon} />
              </motion.button>

              <motion.button
                type="button"
                className={`${styles.socialButton} ${styles.apple}`}
                variants={socialButtonVariants}
                whileHover="hover"
                whileTap="tap"
                onClick={() => toast.success(t('apple_login'))}
              >
                <FaApple className={styles.socialIcon} />
              </motion.button>
            </div>

            <div className={styles.authLinks}>
              <Link to="/forgot-password" className={styles.link}>
                {t('forgot_password')}
              </Link>
              <div className={styles.switchLink}>
                {t('no_account')}{' '}
                <Link to="/register" className={styles.linkAccent}>
                  {t('register_now')}
                </Link>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
