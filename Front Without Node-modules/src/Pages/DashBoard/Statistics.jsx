import React from 'react';
import { Container, Row, Col, Card, ProgressBar } from 'react-bootstrap';
import styles from '../../Styles/Statistics.module.css';

const Statistics = () => {
  // بيانات افتراضية، قم باستبدالها ببيانات تُسترجع من API حسب احتياجك
  const accountCreated = new Date('2023-01-15'); // تاريخ إنشاء الحساب
  const currentDate = new Date();

  // دالة لحساب المدة (بأيام) بين تاريخين
  const calculateDuration = (startDate, endDate) => {
    const diff = endDate - new Date(startDate);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  };

  const accountDurationDays = calculateDuration(accountCreated, currentDate);

  // قائمة الدورات مع معلومات عن بداية الدورة ونسبة التقدم
  const courses = [
    { id: 1, title: 'React Basics', courseStart: '2023-04-01', progress: 70 },
    { id: 2, title: 'Advanced React', courseStart: '2023-05-15', progress: 45 },
    { id: 3, title: 'Node.js Fundamentals', courseStart: '2023-06-20', progress: 90 },
  ];

  return (
    <Container className={styles.statisticsContainer}>
      <h1 className={styles.pageTitle}>إحصائيات الطالب</h1>
      
      <Row className={styles.accountInfo}>
        <Col>
          <Card className={styles.infoCard}>
            <Card.Body>
              <Card.Title>معلومات الحساب</Card.Title>
              <Card.Text>
                <strong>تاريخ إنشاء الحساب:</strong> {accountCreated.toLocaleDateString()} <br />
                <strong>عدد الأيام منذ الإنشاء:</strong> {accountDurationDays} يوم
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className={styles.coursesSection}>
        <h2 className={styles.sectionTitle}>دوراتك</h2>
        {courses.map(course => {
          const courseDurationDays = calculateDuration(course.courseStart, currentDate);
          return (
            <Col md={6} lg={4} key={course.id} className="mb-4">
              <Card className={styles.courseCard}>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>
                    <strong>تاريخ بدء الدورة:</strong> {new Date(course.courseStart).toLocaleDateString()}<br />
                    <strong>عدد الأيام منذ بدء الدورة:</strong> {courseDurationDays} يوم
                  </Card.Text>
                  <div className={styles.progressContainer}>
                    <ProgressBar now={course.progress} label={`${course.progress}%`} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default Statistics;
