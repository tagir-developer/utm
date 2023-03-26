import React from 'react'
import ResultLink from './ResultLink'


describe('<ResultLink />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<ResultLink />)
	})

	describe('Component render. Component props testing', () => {

		it('Should ResultLink component render with default props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should ResultLink component render with test props', () => {
			wrapper.setProps({
				text: 'Тестовый плейсхолдер',
				title: 'Тестовый заголовок',
				resultLink: 'Тестовая ссылка',
				resultLinkChange: () => {},
				copyResultLink: () => {},
			})
			expect(toJson(wrapper)).toMatchSnapshot()
		})

	})

	describe('ResultLink component handlers testing', () => {

		it('Should call "resultLinkChange"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				resultLinkChange: changeHandler,
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

		it('Should use default handler "resultLinkChange"', () => {
			const result = ResultLink.defaultProps.resultLinkChange()
			expect(result).toBe(undefined)
		})

		it('Should use default handler "copyResultLink"', () => {
			const result = ResultLink.defaultProps.copyResultLink()
			expect(result).toBe(undefined)
		})

	})


})