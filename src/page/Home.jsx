import { Link } from 'react-router-dom'
import styles from '../style.module.css'

export const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Вселенная Рика и Морти</h1>
        <p className={styles.subtitle}>Исследуйте мультивселенную вместе с нами</p>

        <nav className={styles.nav}>
          <Link to="/category/characters" className={styles.navCard}>
            <div className={styles.navIcon}>👨‍🚀</div>
            <h2 className={styles.navTitle}>Герои</h2>
            <p className={styles.navDescription}>Все персонажи мультсериала</p>
          </Link>

          <Link to="/category/locations" className={styles.navCard}>
            <div className={styles.navIcon}>🌌</div>
            <h2 className={styles.navTitle}>Локации</h2>
            <p className={styles.navDescription}>Планеты и измерения</p>
          </Link>

          <Link to="/category/episodes" className={styles.navCard}>
            <div className={styles.navIcon}>📺</div>
            <h2 className={styles.navTitle}>Эпизоды</h2>
            <p className={styles.navDescription}>Все серии и сезоны</p>
          </Link>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2 className={styles.welcomeTitle}>Добро пожаловать в мультивселенную!</h2>
          <p className={styles.welcomeText}>
            Откройте для себя удивительный мир Рика и Морти. Исследуйте персонажей,
            локации и эпизоды культового мультсериала. От лаборатории в гараже Рика
            до самых отдаленных уголков мультивселенной - всё это ждет вас здесь.
          </p>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Богатая база данных</h3>
            <p className={styles.featureText}>
              Полная информация о всех персонажах, локациях и эпизодах
              из всех сезонов мультсериала.
            </p>
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Поиск и фильтрация</h3>
            <p className={styles.featureText}>
              Удобный поиск и фильтрация по различным параметрам для
              быстрого нахождения нужной информации.
            </p>
          </div>

          <div className={styles.feature}>
            <h3 className={styles.featureTitle}>Актуальные данные</h3>
            <p className={styles.featureText}>
              Регулярное обновление базы данных с добавлением новых
              сезонов и информации о персонажах.
            </p>
          </div>
        </section>
      </main>
    </>
  )
}
