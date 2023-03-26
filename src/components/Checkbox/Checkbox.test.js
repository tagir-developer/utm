import React from 'react'
import Checkbox from './Checkbox'

describe('<Checkbox />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Checkbox />)
	})

	describe('Component render. Component props testing', () => {

		it('Should Checkbox component render with default props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})


		it('Should render custom checkbox name', () => {
			wrapper.setProps({
				checkbox: 'test-name'
			})
			expect(wrapper.find('label').text()).toBe('test-name')
		})

		it('Should set "checked={true}" attribute if "checkedSource === checkbox"', () => {
			wrapper.setProps({
				checkbox: 'checked-test',
				checkedSource: 'checked-test', 
			})
			expect(wrapper.find('input').props().checked).toBe(true)
		})

		it('Should set "checked={false}" attribute if "checkedSource !=== checkbox"', () => {
			wrapper.setProps({
				checkbox: 'checked-test',
				checkedSource: 'checked-another', 
			})
			expect(wrapper.find('input').props().checked).toBe(false)
		})

		it('Should render right attributes "htmlFor" and "id"', () => {
			wrapper.setProps({
				index: 7,
				device: 'test-device', 
			})
			expect(wrapper.find('input').props().id).toBe('customRadioInline-test-device7')
			expect(wrapper.find('label').props().htmlFor).toBe('customRadioInline-test-device7')
		})

	})

	describe('Checkbox component handlers testing', () => {

		it('Should call "changeCheckedSource"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				changeCheckedSource: changeHandler,
			})
			expect(changeHandler).toHaveBeenCalledTimes(0)
			wrapper.find('input').simulate('change')
			expect(changeHandler).toHaveBeenCalledTimes(1)
		})

		it('Should use default handler', () => {
			const result = Checkbox.defaultProps.changeCheckedSource()
			expect(result).toBe(undefined)
		})

	})


})