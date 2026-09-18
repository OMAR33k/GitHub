import {
  ArrowDownRight,
  ArrowUpLeft,
  Bell,
  ChevronDown,
  Clock,
  ThreeDots,
  Box2Heart,
  Search,
  GraphUp,
  People,
  Wallet,
} from 'react-bootstrap-icons';
import styles from '../../Styles/Statistics.module.css';

const summaryCards = [
  { label: 'صافي الربح', value: '24,850,000', currency: 'ل.س الجديدة', note: '+ 12.4% عن الشهر الماضي', icon: GraphUp, tone: 'green' },
  { label: 'إجمالي المصروفات', value: '18,420,000', currency: 'ل.س الجديدة', note: '+ 4.8% عن الشهر الماضي', icon: Wallet, tone: 'orange' },
  { label: 'العمال المتواجدون', value: '38', currency: 'من أصل 45 عامل', note: '84% نسبة الحضور اليوم', icon: People, tone: 'blue' },
  { label: 'الإنتاج الشهري', value: '1,284', currency: 'متر مربع', note: '+ 8.2% عن الشهر الماضي', icon: Box2Heart, tone: 'purple' },
];

const workers = [
  { name: 'أحمد السلوم', role: 'مشرف قصّ وتقطيع', time: '07:42 ص', status: 'في المعمل', initials: 'أ س', color: 'teal' },
  { name: 'محمود الحسن', role: 'عامل تلميع', time: '07:56 ص', status: 'في المعمل', initials: 'م ح', color: 'orange' },
  { name: 'خالد ديوب', role: 'فني تشغيل CNC', time: '08:14 ص', status: 'متأخر', initials: 'خ د', color: 'purple' },
  { name: 'سامر حمود', role: 'عامل تحميل', time: 'إجازة اليوم', status: 'إجازة', initials: 'س ح', color: 'blue' },
];

const orders = [
  { client: 'مشروع أبراج الياسمين', type: 'رخام كرارا أبيض', amount: '8,400 $', state: 'قيد التجهيز', tone: 'progress' },
  { client: 'فيلا عائلة الخطيب', type: 'غرانيت أسود مطفي', amount: '12,750 $', state: 'جاهز للتسليم', tone: 'ready' },
  { client: 'مطعم بيت الشام', type: 'رخام ترافرتين', amount: '4,250 $', state: 'قيد القصّ', tone: 'cutting' },
];

const Statistics = () => (
  <main className={styles.page} dir="rtl">
    <header className={styles.topbar}>
      <div className={styles.titleArea}>
        <p className={styles.eyebrow}>نظرة عامة</p>
        <h1>أهلاً، محمد <span>👋</span></h1>
        <p className={styles.subtitle}>إليك ملخص أداء معمل <strong>روابي الرخام</strong> اليوم، الأربعاء 18 أيلول 2026</p>
      </div>
      <div className={styles.topActions}>
        <button className={styles.iconButton} aria-label="البحث"><Search /></button>
        <button className={styles.notification} aria-label="الإشعارات"><Bell /><i /></button>
        <div className={styles.profile}><div className={styles.profileAvatar}>م</div><div><b>محمد العبد</b><span>مدير المعمل</span></div><ChevronDown size={14} /></div>
      </div>
    </header>

    <section className={styles.toolbar} aria-label="تصفية البيانات">
        <div className={styles.datePicker}><Clock /><span>01 أيلول — 18 أيلول 2026</span><ChevronDown size={14} /></div>
      <div className={styles.currency}><span className={styles.currencyLabel}>عرض العملات:</span><button className={styles.activeCurrency}>ل.س الجديدة</button><button>ل.س القديمة</button><button>دولار $</button></div>
    </section>

    <section className={styles.summaryGrid}>
      {summaryCards.map(({ label, value, currency, note, icon: Icon, tone }) => (
        <article className={styles.summaryCard} key={label}>
          <div className={`${styles.cardIcon} ${styles[tone]}`}><Icon /></div>
          <div className={styles.summaryContent}><p>{label}</p><h2>{value} <small>{currency}</small></h2><span className={tone === 'orange' ? styles.negative : styles.positive}>{tone === 'orange' ? <ArrowUpLeft /> : <ArrowDownRight />}{note}</span></div>
        </article>
      ))}
    </section>

    <section className={styles.analyticsGrid}>
      <article className={`${styles.panel} ${styles.financialPanel}`}>
        <div className={styles.panelHeader}><div><h2>الحركة المالية</h2><p>الإيرادات والمصروفات خلال آخر 6 أشهر</p></div><button className={styles.monthButton}>آخر 6 أشهر <ChevronDown size={13} /></button></div>
        <div className={styles.legend}><span><i className={styles.revenueDot} />الإيرادات</span><span><i className={styles.expensesDot} />المصروفات</span></div>
        <div className={styles.chartWrap} aria-label="رسم بياني للإيرادات والمصروفات">
          <div className={styles.yAxis}><span>40M</span><span>30M</span><span>20M</span><span>10M</span><span>0</span></div>
          <svg viewBox="0 0 660 225" role="img" aria-label="خط الإيرادات والمصروفات">
            <defs><linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#159f88" stopOpacity=".18"/><stop offset="1" stopColor="#159f88" stopOpacity="0"/></linearGradient></defs>
            {[18, 64, 110, 156, 202].map(y => <line key={y} x1="0" x2="660" y1={y} y2={y} className={styles.gridLine} />)}
            <path d="M8 158 C46 145 67 139 103 145 S164 97 200 106 S262 72 300 91 S365 51 401 67 S464 39 500 50 S562 12 652 25 L652 202 L8 202 Z" fill="url(#revenueFill)" />
            <path d="M8 158 C46 145 67 139 103 145 S164 97 200 106 S262 72 300 91 S365 51 401 67 S464 39 500 50 S562 12 652 25" className={styles.revenueLine} />
            <path d="M8 177 C49 158 77 166 103 162 S160 146 200 151 S263 118 300 132 S366 111 401 116 S460 95 500 104 S572 77 652 88" className={styles.expensesLine} />
            <circle cx="652" cy="25" r="5" className={styles.revenuePoint} /><circle cx="652" cy="88" r="5" className={styles.expensesPoint} />
          </svg>
          <div className={styles.xAxis}><span>نيسان</span><span>أيار</span><span>حزيران</span><span>تموز</span><span>آب</span><span>أيلول</span></div>
        </div>
        <div className={styles.financialFooter}><div><span>إجمالي الإيرادات</span><b>43,270,000 <small>ل.س الجديدة</small></b></div><div><span>صافي الأرباح</span><b className={styles.profit}>24,850,000 <small>ل.س الجديدة</small></b></div><a href="#financial">عرض التقرير الكامل ←</a></div>
      </article>

      <article className={`${styles.panel} ${styles.productionPanel}`}>
        <div className={styles.panelHeader}><div><h2>مستوى الإنتاج</h2><p>إنجاز خطة الإنتاج الشهرية</p></div><button className={styles.menuButton} aria-label="المزيد"><ThreeDots /></button></div>
        <div className={styles.gauge}><svg viewBox="0 0 220 130"><path d="M25 112 A86 86 0 0 1 195 112" className={styles.gaugeTrack}/><path d="M25 112 A86 86 0 0 1 187 75" className={styles.gaugeValue}/></svg><div><b>78%</b><span>من الهدف الشهري</span></div></div>
        <div className={styles.productionStats}><div><span>المنجز</span><b>1,284 <small>م²</small></b></div><div><span>الهدف</span><b>1,650 <small>م²</small></b></div></div>
        <div className={styles.progressLabel}><span>التقدّم الكلي</span><b>78%</b></div><div className={styles.progressBar}><i /></div>
        <p className={styles.targetNote}>متبقّي <strong>366 م²</strong> لتحقيق هدف هذا الشهر</p>
      </article>
    </section>

    <section className={styles.bottomGrid}>
      <article className={styles.panel}><div className={styles.panelHeader}><div><h2>حضور العمال اليوم</h2><p>آخر تحديث منذ 5 دقائق</p></div><a href="#attendance">عرض الكل ←</a></div><div className={styles.attendanceSummary}><span><b>38</b> حاضر</span><span><b>4</b> متأخر</span><span><b>3</b> إجازة</span></div><div className={styles.workerList}>{workers.map(worker => <div className={styles.worker} key={worker.name}><div className={`${styles.workerAvatar} ${styles[worker.color]}`}>{worker.initials}</div><div className={styles.workerInfo}><b>{worker.name}</b><span>{worker.role}</span></div><time>{worker.time}</time><em className={styles[worker.status === 'في المعمل' ? 'present' : worker.status === 'متأخر' ? 'late' : 'leave']}>{worker.status}</em></div>)}</div></article>
      <article className={styles.panel}><div className={styles.panelHeader}><div><h2>طلبات قيد التنفيذ</h2><p>طلبات تحتاج متابعة اليوم</p></div><a href="#orders">عرض الكل ←</a></div><div className={styles.orderList}>{orders.map(order => <div className={styles.order} key={order.client}><div><b>{order.client}</b><span>{order.type}</span></div><strong>{order.amount}</strong><em className={styles[order.tone]}>{order.state}</em><button aria-label={`تفاصيل ${order.client}`}><ThreeDots /></button></div>)}</div><button className={styles.newOrder}>+ إضافة طلب جديد</button></article>
    </section>
  </main>
);

export default Statistics;
