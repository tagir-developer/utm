import React from 'react'
import Button from './Button'


describe('<Button />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Button />)
	})

	describe('Component render. Component props testing', () => {

		it('Should Button component render without props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})


		it('Should render Button type', () => {
			wrapper.setProps({
				type: 'danger'
			})
			expect(wrapper.find('button').props().className).toContain(' btn-danger ')
		})

		it('Should render Button text', () => {
			wrapper.setProps({
				text: 'Тестовый текст кнопки'
			})
			expect(wrapper.find('button').text()).toBe('Тестовый текст кнопки')
		})

	})

	describe('Button component handlers testing', () => {

		it('Should call "ButtonClose" handler', () => {
			const clickHandler = jest.fn()
			wrapper.setProps({
				handler: clickHandler
			})
			wrapper.find('button').simulate('click')
			expect(clickHandler).toHaveBeenCalled()
		})

		it('Should use default handler', () => {
			const result = Button.defaultProps.handler()
			expect(result).toBe(undefined)
		})

	})


})