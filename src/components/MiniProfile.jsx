import css from '../stylesheets/index.module.css'
import { useState, useEffect } from 'react'
import supa from '../js/supa'
import cx from 'classnames'

const MiniProfile = () => {
	const loggedUser = JSON.parse(localStorage.getItem('loggedUser'))

	return (
		<div className={css.MiniProfile}>
			<div className={css.Pfp}>
				<img
					src={loggedUser?.pfp || 'defaultpfp.png'}
					alt={loggedUser?.name}
				/>
				{/* TODO */}
				<div className={css.Hover}>Cambiar estado</div>
			</div>
			<div className={css.Section}>
				<p className={css.Name}>{loggedUser?.name}</p>
				<small className={css.Id}>#{loggedUser?.id}</small>
			</div>
			<div className={cx(css.Section)}>
				<p className={css.Label}>Rango:</p>
				<p>{loggedUser?.rank}</p>
			</div>
			<div className={cx(css.Section)}>
				<p className={css.Label}>Rol:</p>
				<p>{loggedUser?.role || 'Indefinido'}</p>
			</div>
			<div className={cx(css.Section)}>
				<p className={css.Label}>Dinero:</p>
				<p>${loggedUser?.wallet}</p>
			</div>
			<div className={css.Section}>
				<p className={css.Label}>Estado:</p>
				<p
					className={cx({
						[css.Positive]: loggedUser?.status === 'En servicio',
						[css.Negative]: loggedUser?.status === 'De baja',
						[css.Neutral]: loggedUser?.status === 'De vacaciones',
					})}
				>
					{loggedUser?.status}
				</p>
			</div>
		</div>
	)
}

export default MiniProfile
