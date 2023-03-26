import React from 'react'

const ResultLink = ({ text, title, resultLink, resultLinkChange, copyResultLink }) => {

	const id = 'result-link-input'

	const resultLinkHandler = () => {
		return copyResultLink(id)
	}

	return (
		<div className="mt-3">
			{/* <label htmlFor={`basic-url-${Math.random()}`} className="font-weight-bold">{title}</label> */}
			<label htmlFor="result-link-input" className="font-weight-bold">{title}</label>
			<div className="input-group">
				<div className="input-group-prepend">
					<button
						className="btn btn-primary"
						type="button"
						id="result-link-button"
						onClick={resultLinkHandler}
					>
						Скопировать
					</button>
				</div>
				<input
					type="text"
					id="result-link-input"
					className="form-control"
					placeholder={text}
					aria-label="Example text with button addon"
					aria-describedby="result-link-button"
					value={resultLink}
					onChange={e => resultLinkChange(e)}
				/>
			</div>
		</div>
	)
}

ResultLink.defaultProps = {
	text: 'Значение плейсхолдера', 
	title: 'Дефолтный заголовок', 
	resultLink: 'Итоговая ссылка', 
	resultLinkChange: () => {}, 
	copyResultLink: () => {},
}

export default ResultLink