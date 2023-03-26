import React from 'react'
import Text from './Text'

describe('<Text />', () => {
	it('Should Text component render', () => {
		const wrapper = shallow(<Text />)
		expect(toJson(wrapper)).toMatchSnapshot()
	})
})