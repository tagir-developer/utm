import React from 'react'
import Toggle from '../Toggle/Toggle'

const Header = props => {

	const bgImage = {
		backgroundImage: 'url(./images/header-4.jpg)',
		backgroundPosition: 'right',
		height: '200px'
	}

	return (
		<div className="text-light p-4 mb-5 text-right" style={bgImage}>
			<div className="d-none d-sm-block m-2"></div>
			<h1 className="display-4 d-none d-md-block">Генератор <wbr/><span className="text-info">UTM</span>&#8209;меток</h1>
			{/* Heading for mobile devices */}
			<h1 className="display-5 d-block d-md-none">Генератор <wbr/><span className="text-info">UTM</span>&#8209;меток</h1>
			<div className="d-flex flex-row justify-content-end mt-4">
				<div className="font-weight-bolder mr-3">{props.darkTheme ? 'Выключить ночной режим' : 'Включить ночной режим'}</div>
				<Toggle themeToggle={props.themeToggle} darkTheme={props.darkTheme} />
			</div>
		</div>
	)
}

Header.defaultProps = {
	themeToggle: () => {},
	darkTheme: false,
}

export default Header