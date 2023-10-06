import supa from './supa'

const validateUser = async (username, password) => {
	const { data, count } = await supa
		.from('pretty_members')
		.select('*', { count: 'exact' })
		.eq('name', username)
		.eq('password', password)

	if (count === 0) {
		return undefined
	}

	return data[0]
}

export default validateUser
