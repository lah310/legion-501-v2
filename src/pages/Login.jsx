import { useState, useEffect } from 'react'
import css from '../stylesheets/index.module.css'
import cx from 'classnames'
import supa from '../js/supa'

const Login = ({ setLoggedUser }) => {
	const [username, setUsername] = useState()
	const [members, setMembers] = useState([])
	const [password, setPassword] = useState()
	const [error, setError] = useState()
	const [showError, setShowError] = useState(false)

	useEffect(() => {
		supa.from('pretty_members')
			.select('name')
			.then((m) => {
				const fetchedMembers = m.data.map((member) => member.name)
				setMembers(fetchedMembers)
			})
	}, [])

	const handleLogin = (e) => {
		e.preventDefault()
		if (username && password) {
			supa.from('members')
				.select('password')
				.eq('name', username)
				.limit(1)
				.single()
				.then(({ data }) => {
					if (password === data.password) {
						supa.from('pretty_members')
							.select('*')
							.eq('name', username)
							.limit(1)
							.single()
							.then(({ data }) => {
								delete data.password
								setLoggedUser(data)
							})
					}
				})
		} else {
			if (!password) {
				setError('Por favor, introduzca una contraseña.')
			} else {
				setError('Las credenciales son incorrectas.')
			}
			setShowError(true)
		}
	}

	return (
		<div className={css.Login}>
			<form className={cx(css.Form)}>
				<h2 className={css.Header}>Iniciar sesión</h2>
				<div className={css.InputBox}>
					<select
						onChange={(e) => setUsername(e.target.value)}
						required
					>
						<option
							value=''
							disabled
						>
							Seleccione su nombre
						</option>
						{members.map((member, i) => (
							<option
								key={i}
								value={member}
							>
								{member}
							</option>
						))}
					</select>
					<i className='bx bx-user bx-sm'></i>
				</div>
				<div className={css.InputBox}>
					<input
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Contraseña'
						name='password'
					/>
					<i className='bx bx-lock-alt bx-sm'></i>
				</div>
				<div className={css.StatusContainer}>
					<span
						className={cx(
							css.Status,
							{
								[css.Visible]: showError,
							},
							css.Error
						)}
					>
						{error}
					</span>
				</div>
				<button
					type='submit'
					onClick={handleLogin}
				>
					Iniciar sesión
				</button>
			</form>
		</div>
	)
}

export default Login
