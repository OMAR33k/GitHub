import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import styles from '../../Styles/AuthStyles.module.css';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage(t('reset_link_sent'));
    } catch (error) {
      setMessage(t('reset_error'));
    }
  };

  return (
    <AuthLayout titleKey="forgot_password">
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <FiMail className={styles.inputIcon} />
          <input
            type="email"
            placeholder={t('Email')}
            value={email}
            className={styles.inputField}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          {t('send_reset_link')}
        </button>
        {message && <div className={styles.message}>{message}</div>}
        <div className={styles.authLinks}>
        <Link to="/login" className={`${styles.link }  `}>
          {t('back_to_login')}
        </Link>
        </div>
        
      </form>
    </AuthLayout>
  );
};
export default ForgotPassword;