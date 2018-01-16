import React from 'react'
import { mount } from 'enzyme'
import { ChartsPage } from './charts-page'

const page = mount(<ChartsPage />)

test('ChartsPage exist', () => {
	expect(page).toBeDefined()
	const title = page.find('.dashboard-title').first()
	expect(title.text()).toEqual('DASHBOARD')
})