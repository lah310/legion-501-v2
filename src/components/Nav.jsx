import css from '../stylesheets/index.module.css'
import cx from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'

const Nav = () => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	return (
		<div className={css.Nav}>
			<div className={css.Logo}>
				<img
					src='legion-logo2.png'
					className={css.Icon}
				/>
				<p>Legion 501</p>
			</div>
			<div className={css.Navigation}>
				<ul>
					<li
						className={cx(css.NavigationButton, {
							[css.Active]: pathname === '/',
						})}
						onClick={() => navigate('/')}
					>
						<div>
							<span
								className={cx('bx bxs-home bx-sm', css.Icon)}
							></span>
						</div>
					</li>
					<li
						className={cx(css.NavigationButton, {
							[css.Active]: pathname === '/finanzas',
						})}
						onClick={() => navigate('/finanzas')}
					>
						<div>
							<span
								className={cx('bx bxs-wallet bx-sm', css.Icon)}
							></span>
						</div>
					</li>
					<li
						className={cx(css.NavigationButton, {
							[css.Active]: pathname === '/catalogo',
						})}
						disabled
						// onClick={() => navigate('/catalogo')}
					>
						<div>
							<span
								className={cx(
									'bx bxs-book bx-sm',
									css.Icon,
									css.Disabled
								)}
							></span>
						</div>
					</li>
					<li
						className={cx(css.NavigationButton, {
							[css.Active]: pathname === '/perfil',
						})}
						onClick={() => navigate('/perfil')}
					>
						<div>
							<span
								className={cx('bx bxs-user bx-sm', css.Icon)}
							></span>
						</div>
					</li>
					<div className={css.Indicator}></div>
				</ul>
			</div>
		</div>
	)
}

export default Nav
