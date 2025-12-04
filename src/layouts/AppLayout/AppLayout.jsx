import { Link, Outlet } from 'react-router-dom'
import styles from '../../style.module.css'
export const AppLayout = () => {
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
		</div>
	)

}