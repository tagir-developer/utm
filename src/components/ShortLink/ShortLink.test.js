import React from 'react'
import ShortLink from './ShortLink'

describe('<ShortLink />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<ShortLink />)
	})

	describe('Component render. Component props testing', () => {

		it('Should ShortLink component render with default props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should ShortLink component render with test props', () => {
			wrapper.setProps({
				text: 'Тестовый плейсхолдер',
				title: 'Тестовый заголовок',
				shortLink: 'Тестовая ссылка',
				shortLinkChange: () => {},
				copyShortLink: () => {},
			})
			expect(toJson(wrapper)).toMatchSnapshot()
		})

	})

	describe('ShortLink component handlers testing', () => {

		it('Should call "ShortLinkChange"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				shortLinkChange: changeHandler,
			})
			expect(changeHandler).toHaveBeenCalledTimes(0)
			wrapper.find('input').simulate('change')
			expect(changeHandler).toHaveBeenCalled()
		})

		it('Should call "copyResultLink"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				copyResultLink: changeHandler,
			})
			expect(changeHandler).toHaveBeenCalledTimes(0)
			wrapper.find('button').simulate('click')
			expect(changeHandler).toHaveBeenCalled()
		})

		it('Should use default handler "ShortLinkChange"', () => {
			const result = ShortLink.defaultProps.shortLinkChange()
			expect(result).toBe(undefined)
		})

		it('Should use default handler "copyResultLink"', () => {
			const result = ShortLink.defaultProps.copyResultLink()
			expect(result).toBe(undefined)
		})

	})


})