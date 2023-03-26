import React from 'react'
import Footer from './Footer'

describe('<Toggle />', () => {

	it('Should Toggle component render', () => {

		const wrapper = shallow(<Footer />)
		expect(toJson(wrapper)).toMatchSnapshot()

	})


})