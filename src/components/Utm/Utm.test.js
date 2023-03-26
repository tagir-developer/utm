import React from 'react'
import Utm from './Utm'

describe('<Utm />', () => {

	let wrapper

	beforeEach(() => {
		wrapper = shallow(<Utm />)
	})

	describe('Component render. Component props testing', () => {

		it('Should Utm component render with default props', () => {
			expect(toJson(wrapper)).toMatchSnapshot()
		})

		it('Should Utm component render with test props', () => {
			wrapper.setProps({
				utmInfo: {
					heading: 'Тестовый заголовок поля',
					id: 7,
					utm: 'utm_test',
					placeholder: 'Тестовый плейсхолдер...',
					defaultValue: 'Тестовое значение',
					value: 'Тестовое значение',
					prompt: 'Тестовая подсказка',
					popover: {
						title: 'Тестовый заголовок поповера',
						text: 'Тестовый текст поповера'
					}
				},
				classes: 'col-6 test-indicator',
				changeSourceFieldsValue: () => { },
				checkedSource: 'test checked source',
				device: 'test-device'
			})

			expect(toJson(wrapper)).toMatchSnapshot()
		})

	})

	describe('Utm component handlers testing', () => {

		it('Should call "changeSourceFieldsValue"', () => {
			const changeHandler = jest.fn()
			wrapper.setProps({
				changeSourceFieldsValue: changeHandler,
				utmInfo: {
					heading: 'Тестовый заголовок поля',
					id: 10,
					utm: 'utm_test',
					placeholder: 'Тестовый плейсхолдер...',
					defaultValue: 'Тестовое значение',
					value: 'Тестовое значение',
					prompt: 'Тестовая подсказка',
					popover: {
						title: 'Тестовый заголовок поповера',
						text: 'Тестовый текст поповера'
					}
				},
				checkedSource: 'test checked source',
			})
			expect(changeHandler).toHaveBeenCalledTimes(0)
			wrapper.find('input').simulate('change', {target: {value: 'test-value'}})
			expect(changeHandler).toHaveBeenCalledWith('test checked source', 10, 'test-value')
		})

	})

})