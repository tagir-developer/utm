import React from 'react'
import classes from './Toggle.module.css'

const Toggle = ({themeToggle, darkTheme}) => {

	return (
		<div className={classes.main}>
			<input 
				type="checkbox" 
				id={classes.cbx} 
				style={{ display: 'none' }} 
				onChange={themeToggle}
				checked={darkTheme}
				special="test"
			/>
			<label htmlFor={classes.cbx} className={classes.toggle}><span></span></label>
		</div>
	)
}

Toggle.defaultProps = {
	themeToggle: () => {},
	darkTheme: false,
}

export default Toggle