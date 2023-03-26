import React, { Fragment } from 'react'
import Checkbox from '../Checkbox/Checkbox'

const CheckboxList = ({ checkboxes, checkedSource, changeCheckedSource }) => {

	const checkboxesList = (classes, device) => (
		checkboxes.map((checkbox, index) => (
			<div key={device + index} className={classes}>
				<Checkbox 
					checkbox={checkbox} 
					checkedSource={checkedSource} 
					index={index} 
					device={device}
					changeCheckedSource={changeCheckedSource}
					/>
			</div>
		))
	)


	return (
		<Fragment>
			<div className="d-none d-sm-block">
				<div className="row row-cols-4">
					{checkboxesList('col-3 pl-3 py-3', 'PC')}
				</div>
			</div>
			{/* For mobile devices */}
			<div className="d-block d-sm-none">
				<div className="row row-cols-2">
					{checkboxesList('col-6 pl-3 py-3', 'Mobile')}
				</div>
			</div>
		</Fragment>
	)
}



CheckboxList.defaultProps = {
	checkboxes: ['1', '2', '3'],
	checkedSource: '1',
	changeCheckedSource: () => {}
}

export default CheckboxList