import { Link, Routes, Route, Outlet } from 'react-router-dom'
import { Home } from './page/Home'
import styles from './style.module.css'
import { CategoryList } from './components/common/ChategoryList'
import { ItemDetail } from './components/common/ItemDetail'

function App() {

  return (
    <div className={styles.container}>
      <nav className={styles.topNav}>
        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Главная
          </Link>

        </div>
      </nav>
      <Outlet />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category"  >
          <Route path=':categoryId' >
            <Route index element={<CategoryList />} />
            <Route path=':itemId' element={<ItemDetail />} />
          </Route>
        </Route>
        <Route path="*" element={
          <h1 style={{
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '50px'
          }}>404</h1>} />
      </Routes>
    </div>

  )
}

export default App
