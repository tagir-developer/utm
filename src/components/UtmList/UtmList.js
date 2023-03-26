import React, { Fragment } from 'react'
import Utm from '../Utm/Utm'

const UtmList = ({ utmFields, checkedSource, changeSourceFieldsValue, translitHandler }) => {

	const targetSource = utmFields.filter(source => source.name === checkedSource) // "Нам вернулся массив с одним единственным нужным нам объектом"
	const checkedSourceFields = targetSource[0].fields

	const utmsList = (classes, device) => (
		checkedSourceFields.map((utmInfo, index) => {
			return (
				<Utm
					key={device + index}
					utmId={device + index}
					utmInfo={utmInfo}
					classes={classes}
					// popoverInfo={utmInfo.popover}
					changeSourceFieldsValue={changeSourceFieldsValue}
					checkedSource={checkedSource}
					device={device}
				/>
			)
		})
	)

	return (
		<Fragment>
			{/* For PC */}
			<div className="d-none d-md-block">
				<div className="row row-cols-2">
					{utmsList('col-6', 'PC')}
				</div>
			</div>
			{/* For mobile and tablets */}
			<div className="d-block d-md-none">
				{utmsList('mt-1', 'Mobile')}
			</div>
			
			<div className="custom-control custom-checkbox cursor-pointer my-4">
				<input
					className="custom-control-input cursor-pointer"
					type="checkbox"
					id="translitCheckbox"
					onChange={translitHandler}
				/>
				<label className="custom-control-label cursor-pointer" htmlFor="translitCheckbox">
					Транслитерация параметров
 				</label>
			</div>
		</Fragment>
	)
}

UtmList.defaultProps = {
	utmFields: [
		{
			name: 'default source name',
			fields: [{id: '1'}, {id: '2'}, {id: '3'}]
		},
		{
			name: 'default source name (second)',
			fields: [{id: '1'}, {id: '2'}, {id: '3'}]
		}
	], 
	checkedSource: 'default source name', 
	changeSourceFieldsValue: () => {}, 
	translitHandler: () => {}
}

export default UtmList