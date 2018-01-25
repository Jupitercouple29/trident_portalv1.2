import React from 'react'
import { mount } from 'enzyme'
import Timezone from './timezone'

const time = mount(<Timezone />)

test('Timezone exist', () => {
	expect(time).toBeDefined()
})