import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Nav from './components/Nav'
import Home from './pages/home/Home'
import Catalog from './pages/Catalog'
import Profile from './pages/Profile'
import css from './stylesheets/index.module.css'
import cx from 'classnames'
import { useLocalStorage } from '@uidotdev/usehooks'
import 'boxicons'

const App = () => {
	const [loggedUser, setLoggedUser] = useLocalStorage('loggedUser', null)

	if (!loggedUser) {
		return (
			<div className={cx(css.Body, css.Login)}>
				<Login setLoggedUser={setLoggedUser} />
			</div>
		)
	}

	return (
		<div className={css.Body}>
			<Nav />
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/catalogo'
					element={<Catalog />}
				/>
				<Route
					path='/perfil'
					element={<Profile />}
				/>
			</Routes>
		</div>
	)
}

export default App
