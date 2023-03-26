import Header from './Header'
import Toggle from '../Toggle/Toggle'
import React from 'react'

describe('<Header/>', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Header />)
	})

	describe('Header render', () => {

		it('Should Header component render', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should include toggle component', () => {
			expect(wrapper.find(Toggle)).toHaveLength(1)
		})

		it('If app theme is dark - should render "Выключить ночной режим"', () => {
			wrapper.setProps({
				darkTheme: true
			})
			expect(wrapper.find('div.font-weight-bolder.mr-3').text()).toEqual('Выключить ночной режим')
		})

		it('If app theme is default (white) - should render "Включить ночной режим"', () => {
			wrapper.setProps({
				darkTheme: false
			})
			expect(wrapper.find('div.font-weight-bolder.mr-3').text()).toEqual('Включить ночной режим')
		})

	})

	describe('Default props', () => {

		it('Should use default themeToggle', () => {
			const result = Header.defaultProps.themeToggle()
			expect(result).toBe(undefined)
		})

		it('With default prop darkTheme should render "Включить ночной режим"', () => {
			expect(wrapper.find('div.font-weight-bolder.mr-3').text()).toEqual('Включить ночной режим')
		})

	})

})


