import { NavLink } from 'react-router-dom';
import { BarChartLine, BoxSeam, Clipboard2Check, CurrencyExchange, Gear, Grid, People, Person, Truck } from 'react-bootstrap-icons';
import styles from '../../Styles/SidbarStyle.module.css';

const navigation = [
  { label: 'الرئيسية', icon: Grid, to: '/dashboard/Statistics' },
  { label: 'الطلبات والإنتاج', icon: Clipboard2Check, to: '/dashboard/orders' },
  { label: 'المخزون', icon: BoxSeam, to: '/dashboard/inventory' },
  { label: 'العمال والحضور', icon: People, to: '/dashboard/workers' },
  { label: 'المصاريف والإيرادات', icon: CurrencyExchange, to: '/dashboard/finance' },
  { label: 'الموردون والنقل', icon: Truck, to: '/dashboard/suppliers' },
  { label: 'التقارير', icon: BarChartLine, to: '/dashboard/reports' },
];

const Sidbar = () => (
  <aside className={styles.sidebar} dir="rtl">
    <div className={styles.brand}><div className={styles.brandMark}>R</div><div><b>روابي الرخام</b><span>إدارة المعمل</span></div></div>
    <nav className={styles.navigation}>{navigation.map(({ label, icon: Icon, to }) => <NavLink key={label} to={to} className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}><Icon /><span>{label}</span></NavLink>)}</nav>
  <div className={styles.bottomNav}><NavLink to="/dashboard/profile" className={styles.navLink}><Person /><span>حسابي</span></NavLink><NavLink to="/dashboard/settings" className={styles.navLink}><Gear /><span>الإعدادات</span></NavLink><div className={styles.help}><b>هل تحتاج إلى مساعدة؟</b><span>تواصل مع فريق الدعم</span><button>مركز المساعدة</button></div></div>
  </aside>
);

export default Sidbar;
