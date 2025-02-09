import React from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from '../../Styles/HomeStyle.module.css';
import AnimatedSection from '../../Assets/AnimatedSection';
import { FaSun } from 'react-icons/fa';
const scrollVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.mainWrapper}>
      <section className={styles.heroSection}>
        <Container>
          <AnimatedSection>
            <Row className="align-items-center">
              <Col md={6} className={styles.heroText}>
                <motion.div initial="hidden" animate="visible" variants={scrollVariants}>
                  <h1 className={styles.textShadow}>تعلم اللغات بسهولة معنا</h1>
                  <p className={`lead my-4 ${styles.textShadow} `}>انطلق في رحلة تعلمك مع نظام متطور يعتمد على تقنيات حديثة لتحسين مهاراتك اللغوية.</p>
                  <motion.button 
                    type="submit"
                    className={` ${styles.ctaButton}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {t('ابدأ التعلم الآن')}
                  </motion.button>
                </motion.div>
              </Col>
              <Col md={6} className="d-none d-md-block">
                <motion.img
                  src="/images/busuu-header-hello.png"
                  alt="تعلم اللغات"
                  className={`img-fluid rounded ${styles.heroImage}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                />
              </Col>
            </Row>
          </AnimatedSection> 
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
        <Container>
          <AnimatedSection>
          <motion.h2 className={`text-center mb-5 ${styles.sectionTitle}`} initial="hidden" animate="visible" variants={scrollVariants}>
            مميزات منصتنا
          </motion.h2>
          </AnimatedSection>
          <Row>
            {["🎙️ تحليل نطقك بدقة عالية", "📚 دروس تفاعلية مشوقة", "📱 تطبيق متاح على جميع الأجهزة"].map((feature, index) => (
              <Col md={4} className="mb-4" key={index}>
            <AnimatedSection delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Card className={styles.featureCard}>
                    <Card.Body>
                      <div className={styles.iconWrapper}>{feature.split(" ")[0]}</div>
                      <Card.Title>{feature.substring(2)}</Card.Title>
                      <Card.Text>استفد من تقنياتنا لجعل تعلمك أسرع وأسهل من أي وقت مضى.</Card.Text>
                    </Card.Body>
                  </Card>
                </motion.div>
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className={styles.coursesSection}>
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
        <Container>
          <AnimatedSection>
          <motion.h2 className={`text-center mb-5 ${styles.sectionTitle}`} initial="hidden" animate="visible" variants={scrollVariants}>
            أشهر الدورات لدينا
          </motion.h2>
          </AnimatedSection>
          <Row>
            {["🇬🇧 الإنجليزية للمبتدئين", "🇫🇷 إتقان الفرنسية بسهولة", "🇪🇸 الإسبانية للمسافرين", "🇩🇪 تعلم الألمانية بسرعة"].map((course, index) => (
              <Col lg={3} md={6} className="mb-4" key={index}>
                <AnimatedSection delay={index * 0.2}>
                <motion.div whileHover={{ scale: 1.03 }}>
                  <Card className={styles.courseCard}>
                    <Card.Img variant="top" src={`/images/course-${index +1}.jpg`} />
                    <Card.Body>
                      <Card.Title>{course}</Card.Title>
                      <Card.Text>انضم إلى آلاف الطلاب الذين بدأوا تعلم هذه اللغة معنا.</Card.Text>
                      <Button variant="primary" className="w-100">
                        سجل الآن
                      </Button>
                    </Card.Body>
                  </Card>
                </motion.div>
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
      <section className={styles.communitySection}>
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
        <Container>
          <AnimatedSection>
            <motion.h2 className={`text-center mb-5 ${styles.sectionTitle}`} initial="hidden" animate="visible" variants={scrollVariants}>
              انضم إلى مجتمعنا
            </motion.h2>
            <Row>
              <Col md={6}>
                <motion.img
                  src="/images/communication.png"
                  alt="مجتمع تعلم اللغات"
                  className={`img-fluid rounded ${styles.communityImage}`}
                  variants={scrollVariants}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                />
              </Col>
              <Col md={6} className={styles.communityText}>
                <motion.div initial="hidden" animate="visible" variants={scrollVariants}>
                  <p>انضم إلى مجتمعنا النشط حيث يمكنك التفاعل مع متعلمين آخرين، تبادل الخبرات، وممارسة اللغات مع متحدثين أصليين.</p>
                  <motion.button 
                    type="submit"
                    className={` ${styles.ctaButton}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    {t('انضم إلينا الآن')}
                  </motion.button>
                </motion.div>
              </Col>
            </Row>
          </AnimatedSection>
        </Container>
      </section>
    </div>
  );
};
export default Home;