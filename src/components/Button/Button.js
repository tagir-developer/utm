import React from 'react'

const Button = ({ text, type, handler}) => {
	return (

		<button
			type="button"
			className={`btn btn-${type} mr-3 my-2`}
			onClick={handler}
		>
			{text}
		</button>

	)
}

Button.defaultProps = {
	text: 'Текст кнопки',
	type: 'success',
	handler: () => {}
}

export default Button