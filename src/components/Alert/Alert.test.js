import React from 'react'
import Alert from './Alert'


describe('<Alert />', () => {

	const testAlertState = (aVisible, aType = 'success', aHeading = 'Алерт отображается', aMessage = 'Сообщение алерта' ) => ({
		visible: aVisible,
		payload: {
			type: aType,
			heading: aHeading,
			message: aMessage,
		}
	})

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Alert />)
	})

	describe('Component render. Component props testing', () => {

		it('Should Alert component render without props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should alert show', () => {
			wrapper.setProps({
				alert: testAlertState(true)
			})
			expect(wrapper.find('CSSTransition').props().in).toEqual(true)
		})

		it('Should alert hide', () => {
			wrapper.setProps({
				alert: testAlertState(false)
			})
			expect(wrapper.find('CSSTransition').props().in).toEqual(false)
		})

		it('Should render alert type', () => {
			wrapper.setProps({
				alert: testAlertState(true, 'danger')
			})
			expect(wrapper.find('div[role="alert"]').props().className).toEqual('alert alert-danger alert-dismissible fade show')
		})

		it('Should render alert heading', () => {
			wrapper.setProps({
				alert: testAlertState(true, 'success', 'Тестовый заголовок алерта')
			})
			expect(wrapper.find('strong').text()).toBe('Тестовый заголовок алерта')
		})

		it('Should render alert message', () => {
			wrapper.setProps({
				alert: testAlertState(true, 'success', 'Заголовок', 'Тестовое сообщение алерта')
			})
			expect(wrapper.find('div[role="alert"]').text()).toContain('Тестовое сообщение алерта')
		})

		it('Should alert hide if copied=true', () => {
			wrapper.setProps({
				copied: true
			})
			expect(wrapper.find('CSSTransition').props().in).toEqual(false)
		})

	})

	describe('Alert component handlers testing', () => {

		it('Should call "alertClose" handler', () => {
			const clickHandler = jest.fn()
			wrapper.setProps({
				alertClose: clickHandler
			})
			wrapper.find('button.close').simulate('click')
			expect(clickHandler).toHaveBeenCalled()
		})

		it('Should use default "alertClose" handler', () => {
			const result = Alert.defaultProps.alertClose()
			expect(result).toBe(undefined)
		})

	})


})