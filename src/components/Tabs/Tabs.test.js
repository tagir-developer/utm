import toJson from 'enzyme-to-json'
import React from 'react'
import Tabs from './Tabs'

describe('<Tabs />', () => {

	it('Should Tabs component render', () => {
		const wrapper = shallow(<Tabs />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})

})