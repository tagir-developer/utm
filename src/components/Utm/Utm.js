import React, { Fragment } from 'react'

const Utm = ({ utmInfo, classes, changeSourceFieldsValue, checkedSource, device }) => {

	const popover = (
		<Fragment>
			{/* eslint-disable-next-line */}
			<a href="#" role="button"
				className="text-dark myPopover"
				data-container="body"
				data-toggle="popover"
				data-placement="right"
				data-trigger={device === 'PC' ? 'hover' : 'click'}
				title={utmInfo.popover.title}
				data-content={utmInfo.popover.text}
			>
				<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-question-circle-fill d-block" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					<path fillRule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927z" />
				</svg>
			</a>
		</Fragment>
	)

	const valueChangeHandler = (e) => {
		return changeSourceFieldsValue(checkedSource, utmInfo.id, e.target.value)
	}


	return (
		<div className={classes}>
			<label htmlFor={`special-${device + utmInfo.id}`} className="font-weight-bold mt-3">{utmInfo.heading}</label>

			<div className="input-group mb-2">
				<div className="input-group-prepend">
					<span className="input-group-text" id="inputGroup-sizing-default">{utmInfo.utm} &nbsp;
						{popover}
					</span>
				</div>
				<input
					id={`special-${device + utmInfo.id}`}
					type="text"
					placeholder={utmInfo.placeholder}
					value={utmInfo.value} 
					className="form-control"
					aria-label="Sizing example input"
					aria-describedby="inputGroup-sizing-default"
					onChange={e => valueChangeHandler(e)}
				/>
			</div>
			<small className="form-text text-muted">{utmInfo.prompt}</small>
		</div>
	)
}

Utm.defaultProps = {
	utmInfo: {
		heading: 'Источник компании',
		id: 1,
		utm: 'utm_source',
		placeholder: 'Плейсхолдер...',
		defaultValue: 'Дефолтное значение',
		value: 'Дефолтное значение',
		prompt: 'Дефолтная подсказка',
		popover: {
			title: 'Дефолтный заголовок',
			text: 'Дефолтный текст'
		}
	},
	classes: 'col-6 default-indicator',
	changeSourceFieldsValue: () => {},
	checkedSource: 'checked source',
	device: 'device'
}

export default Utm