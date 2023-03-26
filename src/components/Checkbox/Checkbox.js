import React from 'react'

const Checkbox = ({ checkbox, checkedSource, index, device, changeCheckedSource }) => {

	// const inputRef = useRef(1)


	// useEffect(() => {
	// 	if (checkbox === checkedSource) {
	// 		inputRef.current.setAttribute('checked', '')
	// 	}
	// })

	const radioHandler = () => {
		changeCheckedSource(checkbox)
	}

	return (
		<div className="custom-control custom-radio custom-control-inline cursor-pointer">
			<input
				type="radio"
				// ref={inputRef}
				id={`customRadioInline-${device + index}`}
				name={`customRadioInline-${device}`}
				className="custom-control-input cursor-pointer"
				onChange={radioHandler}
				checked={checkbox === checkedSource ? true : false}

			/>
			<label className="custom-control-label cursor-pointer" htmlFor={`customRadioInline-${device + index}`}>
				{checkbox}
			</label>
		</div>
	)
}

Checkbox.defaultProps = {
	checkbox: '1', 
	checkedSource: '1', 
	index: 0, 
	device: 'device', 
	changeCheckedSource: () => {}
}

export default Checkbox