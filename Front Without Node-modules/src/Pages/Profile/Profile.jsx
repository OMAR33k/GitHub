import { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FiEdit, FiLogOut } from 'react-icons/fi';
import styles from '../../Styles/ProfileStyle.module.css';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfilePage = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // حالات النوافذ المنبثقة
  const [showNameModal, setShowNameModal] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // قيم التعديل
  const [newName, setNewName] = useState('');
  const [newBirthDate, setNewBirthDate] = useState('');
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });

  // جلب بيانات الملف الشخصي من الـ API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = storedUser?.token;
        const response = await axios.get('/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data.user);
        setNewName(response.data.user.name);
        setNewBirthDate(response.data.user.birthDate ? new Date(response.data.user.birthDate).toISOString().substring(0,10) : '');
      } catch (error) {
        toast.error(t('failed_to_fetch_profile'));
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [t]);

  // دالة حساب العمر
  const calculateAge = (birthDate) => {
    if (!birthDate) return 0;
    const diff = Date.now() - new Date(birthDate).getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  };

  // رفع الصورة الشخصية وتحديثها في قاعدة البيانات
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageData = reader.result;
        // تحديث الحالة محليًا
        setUser(prev => ({ ...prev, profileImage: imageData }));
        try {
          const storedUser = JSON.parse(localStorage.getItem('user'));
          const token = storedUser?.token;
          const { data } = await axios.put('/api/user/update-profile-image', { profileImage: imageData }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (data.success) {
            setUser(prev => ({ ...prev, profileImage: data.user.profileImage }));
            toast.success(t('profile_image_updated'));
          } else {
            toast.error(data.message || t('update_failed'));
          }
        } catch (err) {
          toast.error(err.response?.data?.message || t('update_failed'));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // تحديث الاسم
  const handleUpdateName = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const { data } = await axios.put('/api/user/update-name', { name: newName }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setUser(prev => ({ ...prev, name: data.user.name }));
        toast.success(t('name_updated_success'));
        setShowNameModal(false);
      } else {
        toast.error(data.message || t('update_failed'));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('update_failed'));
    }
  };

  // تحديث تاريخ الميلاد وتحديث العمر
  const handleUpdateAge = async () => {
    try {
      const token = JSON.parse(localStorage.getItem('user'))?.token;
      const { data } = await axios.put('/api/user/update-birthdate', { birthDate: newBirthDate }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setUser(prev => ({ ...prev, birthDate: data.user.birthDate, age: data.user.age }));
        toast.success(t('birthdate_updated_success'));
        setShowAgeModal(false);
      } else {
        toast.error(data.message || t('update_failed'));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('update_failed'));
    }
  };

  // تغيير كلمة المرور
  const handlePasswordChange = async () => {
    try {
      if (passwords.new !== passwords.confirm) {
        toast.error(t('password_mismatch_error'));
        return;
      }
      if (passwords.new.length < 8) {
        toast.error(t('password_length_error'));
        return;
      }
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const token = storedUser?.token;
      const { data } = await axios.put('/api/auth/change-password', {
        oldPassword: passwords.old,
        newPassword: passwords.new
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success(t('password_changed_success'));
        setShowPasswordModal(false);
        setPasswords({ old: '', new: '', confirm: '' });
      } else {
        toast.error(data.message || t('password_change_error'));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || t('password_change_error'));
    }
  };

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  if (loading) return <div>{t('loading')}...</div>;

  return (
    <Container fluid className={styles.profileContainer}>
      <Row className="justify-content-center">
        <Col md={10} lg={8} className={styles.profileContent}>
          <div className={styles.profileHeader}>
            <div className={styles.avatarWrapper}>
              <label htmlFor="imageUpload" className={styles.avatarLabel}>
                <img 
                  src={user?.profileImage } 
                  alt="Profile" 
                  className={styles.profileAvatar}
                />
                <input 
                  type="file" 
                  id="imageUpload" 
                  accept="image/*" 
                  onChange={handleImageUpload}
                  className={styles.hiddenInput}
                />
              </label>
            </div>

            <div className={styles.profileInfo}>
              <div className={styles.nameSection}>
                <h2 className={styles.userName}>{user?.name}</h2>
                <FiEdit 
                  className={styles.editIcon} 
                  onClick={() => setShowNameModal(true)}
                />
              </div>

              <div className={styles.infoItem}>
                <label>{t('Email')}:</label>
                <span className={styles.emailText}>{user?.email}</span>
              </div>

              <div className={styles.infoItem}>
                <label>{t('age')}:</label>
                <div className={styles.ageSection}>
                  {user?.birthDate ? (
                    <span>{calculateAge(user.birthDate)} {t('years')}</span>
                  ) : (
                    <span>{t('enter_age')}</span>
                  )}
                  <FiEdit 
                    className={styles.editIcon} 
                    onClick={() => setShowAgeModal(true)}
                  />
                </div>
              </div>

              <Button 
                className={styles.changePasswordBtn}
                onClick={() => setShowPasswordModal(true)}
              >
                {t('change_password')}
              </Button>

              <Button 
                className={styles.logoutBtn}
                onClick={handleLogout}
              >
                <FiLogOut className={styles.logoutIcon} />
                {t('logout')}
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {/* Name Edit Modal */}
      <Modal show={showNameModal} onHide={() => setShowNameModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('edit_name')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNameModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleUpdateName}>
            {t('save_changes')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Age Edit Modal */}
      <Modal show={showAgeModal} onHide={() => setShowAgeModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('edit_birthdate')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="date"
            value={newBirthDate}
            onChange={(e) => setNewBirthDate(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAgeModal(false)}>
            {t('cancel')}
          </Button>
          <Button variant="primary" onClick={handleUpdateAge}>
            {t('save_changes')}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Password Change Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('change_password')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>{t('old_password')}</Form.Label>
              <Form.Control 
                type="password" 
                value={passwords.old}
                onChange={(e) => setPasswords(prev => ({ ...prev, old: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>{t('new_password')}</Form.Label>
              <Form.Control 
                type="password" 
                value={passwords.new}
                onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
              />
            </Form.Group>
            
            <Form.Group>
              <Form.Label>{t('confirm_password')}</Form.Label>
              <Form.Control 
                type="password" 
                value={passwords.confirm}
                onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPasswordModal(false)}>
            {t('cancel')}
          </Button>
          <Button 
            variant="primary" 
            onClick={handlePasswordChange}
            disabled={passwords.new !== passwords.confirm || passwords.new.length < 8}
          >
            {t('update_password')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProfilePage;
