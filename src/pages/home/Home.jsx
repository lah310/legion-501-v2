import MiniProfile from '../../components/MiniProfile'
import css from '../../stylesheets/index.module.css'
import Forum from './Forum'

const Home = () => {
	return (
		<div className={css.Content}>
			<MiniProfile />
			<Forum />
		</div>
	)
}

export default Home
