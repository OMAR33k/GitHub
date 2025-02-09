import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import { FaGlobe, FaChalkboardTeacher, FaUsers } from 'react-icons/fa';
import styles from '../../Styles/AboutStyle.module.css';
import AnimatedSection from '../../Assets/AnimatedSection';

const About = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.aboutContainer}>
      <section className={styles.aboutContent}>
        <Container fluid>
          <Row className="align-items-center">
            <Col xs={12} md={6} className={`order-md-2 ${styles.sectionText}`}>
              <AnimatedSection>
                <h2 className={styles.sectionTitle}>{t('aboutUs')}</h2>
                <p className={styles.sectionDesc}>{t('aboutText')}</p>
              </AnimatedSection>
            </Col>
            <Col xs={12} md={6} className="order-md-1 text-center">
              <AnimatedSection>
                <motion.img
                  src="/images/About.png"
                  alt="Learning"
                  className={styles.aboutImage}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                />
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={styles.featuresSection}>
         <div className={styles.WavesContainer}>
              <svg viewBox="0 0 1440 320" 
                  className={styles.Waves}
                  preserveAspectRatio="none">
                <path
                  fill="#1c3656"
                  d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
              </div>
        <Container fluid>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>{t('ourFeatures')}</h2>
          </AnimatedSection>
          <Row className="mt-4">
            {[
              {
                icon: <FaGlobe />,
                title: t('about.multiLanguage'),
                desc: t('about.multiLanguageDesc')
              },
              {
                icon: <FaChalkboardTeacher />,
                title: t('about.interactiveLessons'),
                desc: t('about.interactiveLessonsDesc')
              },
              {
                icon: <FaUsers />,
                title: t('about.communitySupport'),
                desc: t('about.communitySupportDesc')
              }
            ].map((feature, index) => (
              <Col xs={12} md={4} className="mb-4" key={index}>
                <AnimatedSection delay={index * 0.2}>
                  <motion.div whileHover={{ scale: 1.05 }}>
                    <div className={styles.featureBox}>
                      <div className={styles.featureIcon}>{feature.icon}</div>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureDesc}>{feature.desc}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className={styles.teamSection}>
         <div className={styles.WavesContainerTo}>
              <svg viewBox="0 0 1440 320" 
                  className={styles.WavesTo}
                  preserveAspectRatio="none">
                <path
                  fill="#1c3656"
                  d="M0,160L48,149.3C96,139,192,117,288,128C384,139,480,181,576,186.7C672,192,768,160,864,138.7C960,117,1056,107,1152,117.3C1248,128,1344,160,1392,176L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
              </svg>
              </div>
        <Container fluid>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>{t('Meet Our Team')}</h2>
          </AnimatedSection>
          <Row className="mt-4">
            {[
              {
                name: t('about.teamMember1'),
                role: t('about.teamRole'),
                img: '/images/UserFace.png'
              },
              {
                name: t('about.teamMember2'),
                role: t('about.teamRole'),
                img: '/images/UserFace.png'
              },
              {
                name: t('about.teamMember3'),
                role: t('about.teamRole'),
                img: '/images/UserFace.png'
              }
            ].map((member, index) => (
              <Col xs={12} md={4} className="mb-4" key={index}>
                <AnimatedSection delay={index * 0.2}>
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <div className={styles.teamCard}>
                      <img src={member.img} alt={member.name} className={styles.teamImage} />
                      <h4 className={styles.teamName}>{member.name}</h4>
                      <p className={styles.teamRole}>{member.role}</p>
                    </div>
                  </motion.div>
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};
export default About;