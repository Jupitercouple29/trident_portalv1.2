import React from 'react' 
import { mount } from 'enzyme'
import SupportPage from './support-page'

const page = mount(<SupportPage /> )

test('SupportPage exist', () => {
	expect(page).toBeDefined()
})