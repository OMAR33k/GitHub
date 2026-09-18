import { Container, Button, Row, Col, Card, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  FaBootstrap,
  FaBrain,
  FaCss3Alt,
  FaHtml5,
  FaJs,
  FaLaravel,
  FaReact,
  FaRocket,
  FaServer,
} from 'react-icons/fa';
import { SiDotnet, SiVite } from 'react-icons/si';
import styles from '../../Styles/HomeStyle.module.css';
import AnimatedSection from '../../Assets/AnimatedSection';

const scrollVariants = {
  hidden: { opacity: 0, y: 80 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: 'easeOut' } },
};

const techStack = [
  { name: 'React', icon: <FaReact />, tone: '#61dafb' },
  { name: 'Vite', icon: <SiVite />, tone: '#bd34fe' },
  { name: 'HTML5', icon: <FaHtml5 />, tone: '#ff6b35' },
  { name: 'CSS3', icon: <FaCss3Alt />, tone: '#32a8ff' },
  { name: 'JavaScript', icon: <FaJs />, tone: '#f7df1e' },
  { name: 'Bootstrap', icon: <FaBootstrap />, tone: '#8b5cf6' },
  { name: 'AI', icon: <FaBrain />, tone: '#00f5d4' },
  { name: 'Laravel', icon: <FaLaravel />, tone: '#ff2d20' },
  { name: 'ASP.NET', icon: <SiDotnet />, tone: '#9b5cff' },
];

const projects = [
  {
    title: 'منصة تعليم ذكية',
    category: 'React + AI',
    description: 'تجربة تعليمية تفاعلية تستخدم تحليل البيانات والذكاء الاصطناعي لتخصيص الرحلة لكل مستخدم.',
  },
  {
    title: 'لوحة تحكم SaaS',
    category: 'Laravel API',
    description: 'واجهات إدارة سريعة مع صلاحيات، إحصائيات حية، وتجربة استخدام مصممة للأداء العالي.',
  },
  {
    title: 'نظام مؤسسي متكامل',
    category: 'ASP.NET',
    description: 'بنية خلفية قوية وآمنة للتطبيقات الكبيرة مع تكامل قواعد البيانات وخدمات الويب.',
  },
];

const services = [
  'تصميم واجهات عصرية وResponsive',
  'تطوير تطبيقات React/Vite عالية السرعة',
  'بناء APIs باستخدام Laravel وASP.NET',
  'دمج حلول AI في المنتجات الرقمية',
];

const Home = () => {
  return (
    <main className={styles.portfolioWrapper} dir="rtl">
      <section className={styles.heroSection}>
        <div className={styles.orbOne} />
        <div className={styles.orbTwo} />
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7}>
              <AnimatedSection>
                <motion.div initial="hidden" animate="visible" variants={scrollVariants}>
                  <Badge className={styles.heroBadge}>Portfolio 2026 • Full Stack Developer</Badge>
                  <h1 className={styles.heroTitle}>
                    أصمم وأبني مواقع <span>أسطورية وخرافية</span> بتقنيات المستقبل
                  </h1>
                  <p className={styles.heroLead}>
                    بورتفوليو احترافي يعرض خبرتي في React + Vite وHTML وCSS وJavaScript وBootstrap،
                    مع حلول خلفية قوية عبر Laravel وASP.NET ولمسات AI تجعل التجربة أذكى وأسرع.
                  </p>
                  <div className={styles.heroActions}>
                    <Button href="#projects" className={styles.primaryButton}>شاهد الأعمال</Button>
                    <Button href="#contact" className={styles.ghostButton}>تواصل معي</Button>
                  </div>
                </motion.div>
              </AnimatedSection>
            </Col>
            <Col lg={5}>
              <AnimatedSection delay={0.15}>
                <motion.div className={styles.heroCard} whileHover={{ y: -8, rotate: -1 }}>
                  <div className={styles.codeWindowDots}><span /><span /><span /></div>
                  <pre>{`const portfolio = {\n  role: 'Full Stack Developer',\n  frontend: ['React', 'Vite', 'Bootstrap'],\n  backend: ['Laravel', 'ASP.NET'],\n  superpower: 'AI Driven UX'\n};`}</pre>
                </motion.div>
              </AnimatedSection>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.stackSection}>
        <Container>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>التقنيات التي أصنع بها السحر</h2>
          </AnimatedSection>
          <div className={styles.techGrid}>
            {techStack.map((tech, index) => (
              <AnimatedSection delay={index * 0.05} key={tech.name}>
                <motion.div className={styles.techPill} style={{ '--tone': tech.tone }} whileHover={{ scale: 1.08 }}>
                  <span>{tech.icon}</span>
                  {tech.name}
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.projectsSection} id="projects">
        <Container>
          <AnimatedSection>
            <h2 className={styles.sectionTitle}>مشاريع مختارة</h2>
          </AnimatedSection>
          <Row className="g-4">
            {projects.map((project, index) => (
              <Col lg={4} md={6} key={project.title}>
                <AnimatedSection delay={index * 0.12}>
                  <motion.div whileHover={{ y: -10 }}>
                    <Card className={styles.projectCard}>
                      <Card.Body>
                        <div className={styles.projectNumber}>0{index + 1}</div>
                        <Badge className={styles.projectBadge}>{project.category}</Badge>
                        <Card.Title>{project.title}</Card.Title>
                        <Card.Text>{project.description}</Card.Text>
                      </Card.Body>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section className={styles.servicesSection}>
        <Container>
          <Row className="align-items-center g-4">
            <Col lg={5}>
              <AnimatedSection>
                <div className={styles.servicesIntro}>
                  <FaRocket />
                  <h2>ماذا أقدم لك؟</h2>
                  <p>من فكرة بسيطة إلى منتج رقمي مبهر، أركز على الجمال، السرعة، قابلية التوسع، وتجربة المستخدم.</p>
                </div>
              </AnimatedSection>
            </Col>
            <Col lg={7}>
              <div className={styles.serviceList}>
                {services.map((service, index) => (
                  <AnimatedSection delay={index * 0.08} key={service}>
                    <div className={styles.serviceItem}><FaServer /> {service}</div>
                  </AnimatedSection>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className={styles.ctaSection} id="contact">
        <Container>
          <AnimatedSection>
            <div className={styles.ctaPanel}>
              <h2>جاهز لبناء حضورك الرقمي الأسطوري؟</h2>
              <p>دعنا نحول أفكارك إلى واجهة مذهلة وتطبيق متكامل يترك انطباعاً لا يُنسى.</p>
              <Button href="mailto:hello@example.com" className={styles.primaryButton}>ابدأ مشروعك الآن</Button>
            </div>
          </AnimatedSection>
        </Container>
      </section>
    </main>
  );
};

export default Home;
