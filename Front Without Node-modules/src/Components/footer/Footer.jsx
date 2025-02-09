import React from "react";
import { useTranslation } from "react-i18next";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import styles from "../../Styles/FooterStyle.module.css";

export default function Footer() {
  const { t } = useTranslation();
  return (
  <footer className={styles.footer}>
    <div className={styles.footerWavesContainer}>
      <svg viewBox="0 0 1440 320" 
    className={styles.footerWaves}
    preserveAspectRatio="none">
  <path
    fill="#1c3656"
    d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
  />
  <path
    d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440"
    fill="none"
    stroke="var(--secondary-color)"
    strokeWidth="20"
  />
  
</svg>
    </div>
    <div className={styles.mainContent}>
      <div className={styles.contentGrid}>
        <div className={styles.infoColumn}>
          <h3 className={styles.logo }>EngliGo</h3>
          <p className={styles.companyDescription}>{t("aboutText")}</p>
        </div>
        <div className={styles.linksColumn}>
          <h4 className={styles.sectionTitle}>{t("quickLinks")}</h4>
          <ul className={styles.linkList}>
            <li><a href="/" className={styles.linkItem}>{t("home")}</a></li>
            <li><a href="/about" className={styles.linkItem}>{t("about")}</a></li>
            <li><a href="/contact" className={styles.linkItem}>{t("contact")}</a></li>
          </ul>
        </div>
        <div className={styles.contactColumn}>
          <h4 className={styles.sectionTitle}>{t("contact")}</h4>
          <div className={styles.contactInfo}>
            <p>{t("address")}</p>
            <p>{t("email")}</p>
            <p>{t("phone")}</p>
          </div>
        </div>
        <div className={styles.contactColumn}>
          <h4 className={` ${styles.sectionTitleMobileSocialIcons}`}>{t("followUs")}</h4>
          <div className={styles.containerMenu}>
            <div className={styles.mobileSocialIcons}>
              <a href="https://www.facebook.com"><FaFacebook /></a>
              <a href="#"><FaWhatsapp /></a>
              <a href="#"><FaTwitter/></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaYoutube /></a>
              <a href="#"><FaLinkedin/></a>
            </div>
            <ul className={styles.ulMenu} >      
              <li 
                style={{ "--i": -3, "--clr": "#1877f2" }} 
                data-text="Facebook"
                className={styles.liMenu}>
                <a href="https://www.facebook.com" className={styles.aMenu}>
                  <span className={styles.spanMenu}><FaFacebook /></span>
                  Facebook
                </a>
              </li>
              <li 
                style={{ "--i": -2, "--clr": "#25d366" }} 
                data-text="WhatsApp"
                className={styles.liMenu}>
                <a href="#" className={styles.aMenu}>
                  <span className={styles.spanMenu}><FaWhatsapp /></span>
                  WhatsApp
                </a>
              </li>
              <li 
                style={{ "--i": -1, "--clr": "#1da1f2" }} 
                data-text="Twitter"
                className={styles.liMenu}>
                <a href="#" className={styles.aMenu}>
                  <span className={styles.spanMenu}><FaTwitter/></span>
                  Twitter
                </a>
              </li>
              <li 
                style={{ "--i": 0, "--clr": "#c32aa3" }} 
                data-text="Instagram"
                className={styles.liMenu}>
                <a href="#" className={styles.aMenu}>
                  <span className={styles.spanMenu}><FaInstagram /></span>
                  Instagram
                </a>
              </li>
              <li 
                style={{ "--i": 1, "--clr": "#f00" }} 
                data-text="Youtube"
                className={styles.liMenu}>
                <a href="#" className={styles.aMenu}>
                <span className={styles.spanMenu}><FaYoutube /></span>
                  Youtube
                </a>
              </li>
              <li 
                style={{ "--i": 2, "--clr": "#0a66c2" }} 
                data-text="Linkedin"
                className={styles.liMenu}>
                <a href="#" className={`${styles.aMenu} ${styles.textMenu}`}>
                  <span className={`${styles.spanMenu} `}><FaLinkedin/></span>
                  Linkedin
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className={styles.copyrightContent}>
          © 2025 <span className={styles.companyName}>EngliGo</span> - 
          {t("rightsReserved")}
        </div>
        <div className={styles.scrollTop} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          ↑
        </div>
      </div>
    </div>
  </footer>
  );
}