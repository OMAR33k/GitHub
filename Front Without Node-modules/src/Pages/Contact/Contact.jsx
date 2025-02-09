import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from '../../Styles/ContactStyle.module.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const { t } = useTranslation();

  // إعدادات الأنيميشن
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.2, when: "beforeChildren" }
    }
  };

  const itemVariantsLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const itemVariantsRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className={styles.contactContainer}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container py-5">
        <motion.h2 
          className={`text-center ${styles.contactTitle}`}
          variants={itemVariantsLeft}
        >
          {t('contact')}
        </motion.h2>
        
        <div className="row mt-5">
          {/* الجانب الأيسر - معلومات الاتصال */}
          <motion.div 
            className="col-md-6"
            variants={containerVariants}
          >
            <motion.div className={styles.contactInfo} variants={itemVariantsLeft}>
              <motion.div className={styles.contactItem} variants={itemVariantsLeft}>
                <FaMapMarkerAlt className={styles.icon} />
                <p className={styles.text}>{t('address')}</p>
              </motion.div>
              
              <motion.div className={styles.contactItem} variants={itemVariantsLeft}>
                <FaPhone className={styles.icon} />
                <p className={styles.text}>{t('phone')}</p>
              </motion.div>
              
              <motion.div className={styles.contactItem} variants={itemVariantsLeft}>
                <FaEnvelope className={styles.icon} />
                <p className={styles.text}>{t('email')}</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* الجانب الأيمن - نموذج الاتصال */}
          <motion.div 
            className="col-md-6"
            variants={containerVariants}
          >
            <motion.form 
              className={styles.contactForm}
              variants={itemVariantsRight}
            >
              <motion.div variants={itemVariantsRight}>
                <div className="mb-3">
                  <label className={`form-label ${styles.label}`}>{t('YourName')}</label>
                  <input 
                    type="text" 
                    className={`form-control ${styles.input}`} 
                    placeholder={t('name')} 
                    required 
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariantsRight}>
                <div className="mb-3">
                  <label className={`form-label ${styles.label}`}>{t('YourEmail')}</label>
                  <input 
                    type="email" 
                    className={`form-control ${styles.input}`} 
                    placeholder={t('email')} 
                    required 
                  />
                </div>
              </motion.div>
              
              <motion.div variants={itemVariantsRight}>
                <div className="mb-3">
                  <label className={`form-label ${styles.label}`}>{t('YourMessage')}</label>
                  <textarea 
                    className={`form-control ${styles.input}`} 
                    rows="4" 
                    placeholder={t('message')} 
                    required
                  ></textarea>
                </div>
              </motion.div>
              
              <motion.button 
                type="submit" 
                className={`w-100 ${styles.submit}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('SendMessage')}
              </motion.button>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;