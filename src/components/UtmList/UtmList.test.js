import React from 'react'
import UtmList from './UtmList'

describe('<UtmList />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<UtmList />)
	})

	describe('Component render. Component props testing', () => {

		it('Should UtmList component render with default props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should render custom UtmList "checkedSource"', () => {
			wrapper.setProps({
				utmFields: [
					{
						name: 'test-name-1',
						fields: [{ id: '1' }, { id: '2' }, { id: '3' }]
					},
					{
						name: 'test-name-2',
						fields: [{ id: '4' }, { id: '5' }, { id: '6' }]
					}
				],
				checkedSource: 'test-name-2',
			})

			wrapper.find('Utm').forEach(node => {
				expect(node.props().checkedSource).toBe('test-name-2')
			})
		})

		it('Should "checkedSource===source.name"', () => {
			wrapper.setProps({
				utmFields: [
					{
						name: 'test-name-1',
						fields: [{ id: '1' }, { id: '2' }, { id: '3' }]
					},
					{
						name: 'test-name-2',
						fields: [{ id: '4' }, { id: '5' }, { id: '6' }]
					}
				],
				checkedSource: 'test-name-2',
			})
				const utmInfoValue = wrapper.find('Utm').at(0).props().utmInfo
				expect(utmInfoValue.id).toBe('4')
		})


	})

	describe('UtmList component handlers testing', () => {

		it('Should call "translitHandler"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				translitHandler: changeHandler,
			})
			expect(changeHandler).toHaveBeenCalledTimes(0)
			wrapper.find('input').simulate('change')
			expect(changeHandler).toHaveBeenCalledTimes(1)
		})

		it('Should use default handler "changeSourceFieldsValue"', () => {
			const result = UtmList.defaultProps.changeSourceFieldsValue()
			expect(result).toBe(undefined)
		})

	})


})