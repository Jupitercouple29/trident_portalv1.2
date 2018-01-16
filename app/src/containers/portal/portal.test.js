import React from 'react' 
import { mount } from 'enzyme'
import { Portal } from './portal'

const port = mount(<Portal dashboardInfo={jest.fn()}/>)

jest.mock('../../functions/getTridents', () => (
	{ getTridents: jest.fn(() => Promise.resolve())}
))
jest.mock('../../components/side-panel', () => 'side-panel')
jest.mock('../dashboard/dashboard', () => 'dashboard')
jest.mock('../trident/trident-page', () => 'trident-page')
jest.mock('../profile/profile-page', () => 'profile-page')
jest.mock('../alerts/alerts-page', () => 'alerts-page')
jest.mock('../charts/charts-page', () => 'charts-page')
jest.mock('../info/info-page', () => 'info-page')
jest.mock('../../components/nav-bar', () => 'nav-bar')

test('Portal exist', () => {
	expect(port).toBeDefined()
})

test('Portal handleSidePanelClick', () => {
	port.instance().handleSidePanelClick()
	expect(port).toBeDefined()
})

test('Portal with errors from getTridents', () => {
	const port = mount(<Portal />)
	expect(port).toBeDefined()
})

test('Portal will receive new props', () => {
	const location = {pathname:'/trident'}
	const port = mount(<Portal 
											history={{location:{pathname:'/trident'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
})