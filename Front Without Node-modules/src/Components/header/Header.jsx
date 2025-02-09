import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../Styles/HeaderStyle.module.css';
import { useSpring, animated } from "@react-spring/web";
import { FaBars, FaTimes } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

export default function Header() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // التحقق من حالة تسجيل الدخول عبر localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // نفترض أن وجود التوكن يعني تسجيل الدخول
        setIsLoggedIn(userData && userData.token ? true : false);
      } catch (error) {
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const fadeIn = useSpring({
      from: { opacity: 0, transform: 'translateY(-100%)' },
      to: { opacity: 1, transform: 'translateY(0%)' },
      config: { duration: 800 }
  });

  return (
    <animated.header style={fadeIn} className={styles.fixedHeader}>
      <div className={styles.headerContainer}>
        <Link to="/" className={styles.logo}>
          EngliGo
        </Link>
        <button 
          className={`btn d-lg-none ${styles.menuButton}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation">
            {menuOpen ? (
              <FaTimes size={24} color="white" className={styles.menuIcon} />
            ) : (
              <FaBars size={24} color="white"  className={styles.menuIcon}/>
             )}
        </button>
        <nav className={`${styles.navbar} ${menuOpen ? styles.navbarOpen : ''} d-lg-flex`}>
          <ul className={styles.navList}>
            <li className={`${styles.navItem} ${location.pathname === '/' ? styles.active : ''}`}>
              <Link to="/">{t('home')}</Link>
            </li>
            <li className={`${styles.navItem} ${location.pathname === '/about' ? styles.active : ''}`}>
              <Link to="/about">{t('about')}</Link>
            </li>
            <li className={`${styles.navItem} ${location.pathname === '/contact' ? styles.active : ''}`}>
              <Link to="/contact">{t('contact')}</Link>
            </li>
            <li className={`${styles.navItem} ${styles.dropdown}`}>
              <span>{t('language')}</span>
              <ul className={styles.dropdownMenu}> 
                <li onClick={() => changeLanguage('en')}>English</li>
                <li onClick={() => changeLanguage('ar')}>العربية</li>
                <li onClick={() => changeLanguage('fr')}>Français</li>
                <li onClick={() => changeLanguage('ru')}>Русский</li>
                <li onClick={() => changeLanguage('de')}>Deutsch</li>
              </ul>
            </li>
            {/* إذا كان المستخدم غير مسجّل تظهر روابط التسجيل وتسجيل الدخول */}
            {!isLoggedIn && (
              <>
                <li className={styles.navItemLink}>
                  <Link to="/register" className={styles.signUpButton}>
                    {t('signUp')}
                  </Link>
                </li>
                
              </>
            )}
            {/* إذا كان المستخدم مسجّل الدخول تظهر رابط الـ Dashboard */}
            {isLoggedIn && (
              <>
            <li className={`${styles.navItemLink} ${styles.navItem} `}>
              <Link to="/dashboard/profile" className={styles.profileIconLink}>
                <FiUser size={30} />
              </Link>
            </li>
              <li className={styles.navItemLink}>
                <Link to="/dashboard/Statistics" className={styles.signUpButton}>
                  {t('dashboard')}
                </Link>
              </li>
              </>
            )}
          </ul>
        </nav>
      </div>
      <div className={styles.wavesContainer}>
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className={styles.waves}>
          <path 
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" 
            fill="var(--third-color)"
          />
          <path 
            d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98" 
            fill="none" 
            stroke="var(--secondary-color)" 
            strokeWidth="10"
          />
        </svg>
      </div>
    </animated.header>
  );
}
