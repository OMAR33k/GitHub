import styles from '../../Styles/AuthStyles.module.css';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from "@react-spring/web";

const AuthLayout = ({ children, titleKey }) => {
  const { t } = useTranslation();
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(30px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { duration: 600 }
  });

  return (
    <animated.div style={fadeIn} className={styles.authContainer}>
      <div className={styles.authForm}>
        <h1 className={styles.authTitle}>{t(titleKey)}</h1>
        {children}
      </div>
    </animated.div>
  );
};

export default AuthLayout;
