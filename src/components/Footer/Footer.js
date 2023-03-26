import React from 'react'

const Footer = props => {

	const footerImage = {
		backgroundImage: 'url(./images/footer.jpg)'
	}

	return (
		<div className="bg-primary text-dark py-4 px-4 text-center"  style={footerImage}>
			<h4 className="display-5 text-light py-4 text-right">Генератор UTM-меток</h4>
			<p className="text-light text-right pb-1">Все права защищены © 2020</p>
		</div>
	)
}

export default Footer