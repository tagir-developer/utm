import React from 'react'
import CheckboxList from './CheckboxList'


describe('<CheckboxList />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<CheckboxList />)
	})

	describe('Component render. Component props testing', () => {

		it('Should CheckboxList component render without props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})


		it('Should render custom checkboxes', () => {
			wrapper.setProps({
				checkboxes: ['test-1', 'test-2', 'test-3']
			})
			expect(wrapper.find('Checkbox').at(0).props().checkbox).toBe('test-1')
			expect(wrapper.find('Checkbox').at(2).props().checkbox).toBe('test-3')
		})

		it('Should render custom checkedSource', () => {
			wrapper.setProps({
				checkedSource: 'test-1'
			})
			expect(wrapper.find('Checkbox').at(0).props().checkedSource).toBe('test-1')
			expect(wrapper.find('Checkbox').at(2).props().checkedSource).toBe('test-1')
		})

		it('Should render right amount of Checkbox component', () => {
			wrapper.setProps({
				checkboxes: ['1', '2', '3', '4']
			})
			expect(wrapper.find('Checkbox')).toHaveLength(8)
		})

	})

	describe('CheckboxList component handlers testing', () => {

		it('Should use default handler', () => {
			const result = CheckboxList.defaultProps.changeCheckedSource()
			expect(result).toBe(undefined)
		})

	})


})