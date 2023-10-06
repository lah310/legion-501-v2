const capitalize = (str) => {
	let capitalizedStr = ''

	for (const word in str.split(' ')) {
		capitalizedStr += word.charAt(0).toUpperCase() + word.slice(1) + ''
	}

	// console.log(str)

	return capitalizedStr
}

export default capitalize
