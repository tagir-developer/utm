import React from 'react'

const ShortLink = ({ text, title, shortLink, shortLinkChange, copyResultLink }) => {

	const id = 'short-link-input'

	const shortLinkHandler = () => {
		return copyResultLink(id)
	}

	return (
		<div className="mt-3">
			<label htmlFor="short-link-input" className="font-weight-bold">{title}</label>
			<div className="input-group">
				<div className="input-group-prepend">
					<button
						className="btn btn-primary"
						type="button"
						id="short-link-button"
						onClick={shortLinkHandler}
					>
						Скопировать
					</button>
				</div>
				<input
					id="short-link-input"
					type="text"
					className="form-control"
					placeholder={text}
					aria-label="Example text with button addon"
					aria-describedby="short-link-button"
					value={shortLink}
					onChange={e => shortLinkChange(e)}
				/>
			</div>
		</div>
	)
}

ShortLink.defaultProps = {
	text: 'Значение плейсхолдера', 
	title: 'Дефолтный заголовок', 
	shortLink: 'Короткая ссылка', 
	shortLinkChange: () => {}, 
	copyResultLink: () => {},
}

export default ShortLink