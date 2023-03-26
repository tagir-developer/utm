import Toggle from './Toggle'
import React from 'react'

describe('<Toggle/>', () => {

	it('Should toogle component render', () => {
		const wrapper = shallow(<Toggle />)
		expect(wrapper.find('[type="checkbox"]')).toHaveLength(1)
	})

	it('Should render checked="true" if prop "darkTheme: true"', () => {
		const wrapper = shallow(<Toggle darkTheme={true} />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})

	it('Should render checked="false" if prop "darkTheme: false"', () => {
		const wrapper = shallow(<Toggle darkTheme={false} />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})

})

describe('Default props', () => {

	it('Should use default themeToggle', () => {
		const result = Toggle.defaultProps.themeToggle()
		expect(result).toBe(undefined)
	})

})