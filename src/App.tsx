import { useEffect, useState } from 'react'
import './App.css'

type Theme = 'light' | 'dark'
type Language = 'th' | 'en'
type NavPage = 'overview' | 'goals' | 'journal' | 'menu'

const translations = {
  th: {
    greeting: 'สวัสดีตอนเช้า',
    subtitle: 'วันใหม่ เริ่มต้นใหม่ได้เสมอ',
    mission: 'ภารกิจวันนี้',
    missionTitle: 'ค่อย ๆ ก้าวไปข้างหน้า',
    missionDetail: 'ทำสิ่งเล็ก ๆ ให้สำเร็จทีละวัน',
    start: 'เริ่มภารกิจ',
    rituals: 'กิจวัตรประจำวัน',
    goals: 'เป้าหมายของฉัน',
    viewAll: 'ดูทั้งหมด',
    week: 'สัปดาห์ของฉัน',
    weekDetail: 'ทุกก้าวเล็ก ๆ มีความหมาย',
    streak: 'วันที่ทำต่อเนื่อง',
    streakDetail: 'ความสม่ำเสมอสร้างการเปลี่ยนแปลง',
    glance: 'ภาพรวมของฉัน',
    activeGoals: 'เป้าหมายที่กำลังทำ',
    saved: 'เงินออม',
    reflections: 'บันทึกทบทวน',
    overview: 'ภาพรวม',
    goalsNav: 'เป้าหมาย',
    journal: 'บันทึก',
    menu: 'เมนู',
    today: 'วันนี้',
    habit1: 'ดื่มน้ำให้เพียงพอ',
    habit2: 'เรียนรู้สิ่งใหม่',
    habit3: 'ขยับร่างกาย',
    habit4: 'ทบทวนวันนี้',
    goal1: 'สร้างวินัยให้ตัวเอง',
    goal2: 'พัฒนาทักษะใหม่',
    daysLeft: 'วันที่',
    of: 'จาก',
    missionStarted: 'เริ่มภารกิจแล้ว',
    comingSoon: 'ส่วนนี้จะพัฒนาในขั้นตอนถัดไป',
    language: 'ภาษา',
    switchLanguage: 'เปลี่ยนภาษา',
    switchTheme: 'เปลี่ยนธีม',
    light: 'โหมดสว่าง',
    dark: 'โหมดมืด',
    notification: 'การแจ้งเตือน',
    profile: 'โปรไฟล์',
    add: 'เพิ่มรายการ',
    close: 'ปิด',
  },
  en: {
    greeting: 'Good morning',
    subtitle: 'A fresh day, a fresh start.',
    mission: "TODAY'S MISSION",
    missionTitle: 'Move a little, grow a little.',
    missionDetail: 'Small actions make meaningful change.',
    start: 'Start mission',
    rituals: 'Little daily rituals',
    goals: 'Growing toward',
    viewAll: 'View all',
    week: 'Your week, in little wins',
    weekDetail: 'Every small step matters.',
    streak: 'Day streak',
    streakDetail: 'Consistency creates change.',
    glance: 'Life at a glance',
    activeGoals: 'Active goals',
    saved: 'Saved',
    reflections: 'Reflections',
    overview: 'Overview',
    goalsNav: 'Goals',
    journal: 'Journal',
    menu: 'Menu',
    today: 'Today',
    habit1: 'Drink enough water',
    habit2: 'Learn something new',
    habit3: 'Move your body',
    habit4: 'Reflect on your day',
    goal1: 'Build self-discipline',
    goal2: 'Learn a new skill',
    daysLeft: 'Day',
    of: 'of',
    missionStarted: 'Mission started',
    comingSoon: 'This section will be developed in a later phase.',
    language: 'Language',
    switchLanguage: 'Switch language',
    switchTheme: 'Switch theme',
    light: 'Light mode',
    dark: 'Dark mode',
    notification: 'Notifications',
    profile: 'Profile',
    add: 'Add item',
    close: 'Close',
  },
}

const habits = [
  { id: 1, key: 'habit1' as const, icon: 'water' },
  { id: 2, key: 'habit2' as const, icon: 'book' },
  { id: 3, key: 'habit3' as const, icon: 'move' },
  { id: 4, key: 'habit4' as const, icon: 'moon' },
]

const weekBars = [
  { dayTh: 'จ', dayEn: 'M', value: 48 },
  { dayTh: 'อ', dayEn: 'T', value: 70 },
  { dayTh: 'พ', dayEn: 'W', value: 46 },
  { dayTh: 'พฤ', dayEn: 'T', value: 91 },
  { dayTh: 'ศ', dayEn: 'F', value: 45 },
  { dayTh: 'ส', dayEn: 'S', value: 68 },
  { dayTh: 'อา', dayEn: 'S', value: 42 },
]

function App() {
  const [theme, setTheme] = useState<Theme>('light')
  const [language, setLanguage] = useState<Language>('th')
  const [completed, setCompleted] = useState<number[]>([1, 2])
  const [activePage, setActivePage] = useState<NavPage>('overview')
  const [toast, setToast] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  const t = translations[language]
  const completion = Math.round((completed.length / habits.length) * 100)

  useEffect(() => {
    const savedTheme = localStorage.getItem('15lifeday-theme')
    const savedLanguage = localStorage.getItem('15lifeday-language')

    if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme)
    if (savedLanguage === 'th' || savedLanguage === 'en') setLanguage(savedLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('15lifeday-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('15lifeday-language', language)
  }, [language])

  const notify = (message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2400)
  }

  const toggleHabit = (id: number) => {
    setCompleted((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  const selectPage = (page: NavPage) => {
    setActivePage(page)
    if (page !== 'overview') notify(t.comingSoon)
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <button className="brand" onClick={() => selectPage('overview')} aria-label="15Lifeday">
          <span className="brand-mark">✳</span>
          <span>15Lifeday</span>
        </button>

        <div className="header-actions">
          <button
            className="language-button"
            onClick={() => setLanguage((current) => current === 'th' ? 'en' : 'th')}
            aria-label={t.switchLanguage}
            title={t.switchLanguage}
          >
            {language === 'th' ? 'EN' : 'TH'}
          </button>
          <button
            className="header-icon notification-button"
            onClick={() => notify(t.comingSoon)}
            aria-label={t.notification}
            title={t.notification}
          >
            ♧<span className="notification-dot" />
          </button>
          <button
            className="avatar"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={t.profile}
            title={t.profile}
          >
            P
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="profile-popover">
          <strong>{t.profile}</strong>
          <button onClick={() => setLanguage((current) => current === 'th' ? 'en' : 'th')}>
            {t.switchLanguage}: {language === 'th' ? 'ไทย' : 'English'}
          </button>
          <button onClick={() => setTheme((current) => current === 'light' ? 'dark' : 'light')}>
            {t.switchTheme}: {theme === 'light' ? t.light : t.dark}
          </button>
          <button onClick={() => setMenuOpen(false)}>{t.close}</button>
        </div>
      )}

      <main className="overview">
        <section className="greeting">
          <div>
            <h1>{t.greeting}<span className="greeting-period">.</span></h1>
            <p>{t.subtitle}</p>
          </div>
          <span className="today-label">{t.today}</span>
        </section>

        <div className="overview-top-row">
        <section className="mission-card">
          <div className="mission-content">
            <div className="mission-meta">
              <span>{t.mission}</span>
              <span className="mission-count">{completed.length} / {habits.length}</span>
            </div>
            <h2>{t.missionTitle}</h2>
            <p>{t.missionDetail}</p>
            <button className="primary-button" onClick={() => notify(t.missionStarted)}>
              <span>▷</span>{t.start}
            </button>
          </div>
          <div className="mission-illustration">
            <div className="mission-image-slot">
              <img
                src="/images/overview/mission-illustration.png"
                alt="Sun illustration"
                onError={(event) => { event.currentTarget.style.display = 'none' }}
              />
            </div>
            <div className="completion-ring" style={{ '--progress': `${completion * 3.6}deg` } as React.CSSProperties}>
              <div>{completion}%</div>
            </div>
          </div>
        </section>

        <section className="section-card rituals-card">
          <div className="section-heading">
            <h2>{t.rituals}</h2>
            <span className="section-count">{completed.length} / {habits.length}</span>
          </div>
          <div className="ritual-list">
            {habits.map((habit) => {
              const done = completed.includes(habit.id)
              return (
                <button
                  key={habit.id}
                  className={`ritual-row ${done ? 'is-complete' : ''}`}
                  onClick={() => toggleHabit(habit.id)}
                  aria-pressed={done}
                >
                  <span className="ritual-check">{done ? '✓' : ''}</span>
                  <span className="ritual-label">{t[habit.key]}</span>
                  <span className={`ritual-icon ritual-${habit.icon}`} aria-hidden="true">
                    {habit.icon === 'water' ? '♧' : habit.icon === 'book' ? '▤' : habit.icon === 'move' ? '⌁' : '☾'}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        </div>

        <div className="overview-data-row">
        <section className="section-card goals-card">
          <div className="section-heading">
            <h2>{t.goals}</h2>
            <button className="text-link" onClick={() => selectPage('goals')}>{t.viewAll}</button>
          </div>
          <div className="goal-row">
            <div className="goal-line">
              <span>{t.goal1}</span>
              <strong>65%</strong>
            </div>
            <div className="progress-track"><span className="progress-peach" style={{ width: '65%' }} /></div>
            <small>8 / 15 {t.daysLeft}</small>
          </div>
          <div className="goal-row">
            <div className="goal-line">
              <span>{t.goal2}</span>
              <strong className="goal-purple">58%</strong>
            </div>
            <div className="progress-track"><span className="progress-purple" style={{ width: '58%' }} /></div>
            <small>7 / 12</small>
          </div>
        </section>

        <section className="section-card week-card">
          <div className="section-heading">
            <div>
              <h2>{t.week}</h2>
              <p>{t.weekDetail}</p>
            </div>
          </div>
          <div className="week-chart">
            {weekBars.map((bar, index) => (
              <div className={`week-column ${index === 3 ? 'week-column-active' : ''}`} key={`${bar.dayEn}-${index}`}>
                <div className="week-bar-track">
                  <span style={{ height: `${bar.value}%` }} />
                </div>
                <small>{language === 'th' ? bar.dayTh : bar.dayEn}</small>
              </div>
            ))}
          </div>
        </section>

        <section className="section-card glance-card">
          <h2>{t.glance}</h2>
          <div className="glance-grid">
            <div><strong className="glance-peach">3</strong><span>{t.activeGoals}</span></div>
            <div><strong className="glance-green">฿20k</strong><span>{t.saved}</span></div>
            <div><strong className="glance-purple">6</strong><span>{t.reflections}</span></div>
          </div>
        </section>
        </div>

        <section className="streak-card">
          <div className="streak-icon">♨</div>
          <div>
            <h2>7 {t.streak}</h2>
            <p>{t.streakDetail}</p>
          </div>
        </section>


      </main>

      <nav className="bottom-navigation" aria-label="Bottom navigation">
        <button className={`bottom-item ${activePage === 'overview' ? 'active' : ''}`} onClick={() => selectPage('overview')}>
          <span className="bottom-icon">⌂</span><small>{t.overview}</small>
          {activePage === 'overview' && <i />}
        </button>
        <button className={`bottom-item ${activePage === 'goals' ? 'active' : ''}`} onClick={() => selectPage('goals')}>
          <span className="bottom-icon">⚑</span><small>{t.goalsNav}</small>
          {activePage === 'goals' && <i />}
        </button>
        <button className="bottom-add" onClick={() => notify(t.comingSoon)} aria-label={t.add}>+</button>
        <button className={`bottom-item ${activePage === 'journal' ? 'active' : ''}`} onClick={() => selectPage('journal')}>
          <span className="bottom-icon">▤</span><small>{t.journal}</small>
          {activePage === 'journal' && <i />}
        </button>
        <button className={`bottom-item ${activePage === 'menu' ? 'active' : ''}`} onClick={() => selectPage('menu')}>
          <span className="bottom-icon">▦</span><small>{t.menu}</small>
          {activePage === 'menu' && <i />}
        </button>
        <div className="home-indicator" />
      </nav>

      {toast && <div className="toast-message" role="status">{toast}</div>}
    </div>
  )
}

export default App
