import React from 'react' 
import { mount } from 'enzyme'
import LoadingPage from './loading-page'

const page = mount(<LoadingPage message='testing'/>)

test('LoadingPage exist', () => {
	expect(page).toBeDefined()
})