import React from 'react'
import { CSSTransition } from 'react-transition-group'

const Alert = ({ alert, alertClose, copied }) => {

	return (
		<CSSTransition
			in={alert.visible && !copied}
			timeout={{
				enter: 600,
				exit: 200
			}}
			classNames='alert'
			mountOnEnter
			unmountOnExit
		>
			<div className={`alert alert-${alert.payload.type} alert-dismissible fade show`} role="alert">
				<strong>{alert.payload.heading}</strong>&nbsp;
			{alert.payload.message}
				<button
					type="button"
					className="close"
					onClick={alertClose}
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		</CSSTransition>

	)
}

Alert.defaultProps = {
	alert: {
		visible: false,
		payload: {
			type: 'success',
			heading: 'Заголовок алерта',
			message: 'Сообщение алерта',
		}
	},
	alertClose: () => {},
	copied: false
}

export default Alert