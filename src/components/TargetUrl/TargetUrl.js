import React, { Fragment } from 'react'

const TargetUrl = props => {
	return (
		<Fragment>
			<div className="input-group my-4">
				<div className="input-group-prepend">
					<button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{props.isHttp ? 'http://' : 'https://'}</button>
					<div className="dropdown-menu">
						<div className="dropdown-item cursor-pointer" onClick={props.protocolHandler}>{props.isHttp ? 'https://' : 'http://'}</div>
					</div>
				</div>
				<input 
					type="text" 
					className="form-control" 
					placeholder="Введите ссылку на целевую страницу" 
					aria-label="Text input with dropdown button" 
					onChange={event => props.targetUrlHandler(event.target.value)}
					/>
			</div>
		</Fragment>

	)
}

export default TargetUrl