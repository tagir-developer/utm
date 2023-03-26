import React from 'react'
import TargetUrl from './TargetUrl'

describe('<TargetUrl />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<TargetUrl />)
	})

	describe('Component render', () => {
	
		it('Should TargetUrl component render', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})
	
		it('Should set right protocol if isHttp: true', () => {
			wrapper.setProps({
				isHttp: true
			})
			expect(wrapper.find('div.dropdown-item.cursor-pointer').text()).toEqual('https://')
		})
	
		it('Should set right protocol if isHttp: false', () => {
			wrapper.setProps({
				isHttp: false
			})
			expect(wrapper.find('div.dropdown-item.cursor-pointer').text()).toEqual('http://')
		})

	})

	describe('Component handlers testing', () => {

		
		it('Should call protocolHandler', () => {
			const clickHandler = jest.fn()
			wrapper.setProps({
				protocolHandler: clickHandler
			})
			wrapper.find('div.dropdown-item.cursor-pointer').simulate('click')
			expect(clickHandler).toHaveBeenCalled()
		})

		it('Should call targetUrlHandler', () => {
			const valueChangeHandler = jest.fn()
			wrapper.setProps({
				targetUrlHandler: valueChangeHandler
			})
			wrapper.find('input.form-control').simulate('change', {target: {value: 'testing'}})
			expect(valueChangeHandler).toHaveBeenCalledWith('testing')
		})

	})

	

})