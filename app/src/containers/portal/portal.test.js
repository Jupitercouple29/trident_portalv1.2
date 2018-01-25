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
	port.setState({isLoading:false})
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

test('Portal will receive new props for trident page', () => {
	const location = {pathname:'/trident'}
	const port = mount(<Portal 
											history={{location:{pathname:'/trident'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for dashboard page', () => {
	const location = {pathname:'/dashboard'}
	const port = mount(<Portal 
											history={{location:{pathname:'/dashboard'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	port.setState({isLoading:false})
	expect(port).toBeDefined()
})

test('Portal will receive new props for support page', () => {
	const location = {pathname:'/support'}
	const port = mount(<Portal 
											history={{location:{pathname:'/support'}}}
											pageLocation={jest.fn()}/>)
	port.setState({isLoading:false})
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for profile page', () => {
	const location = {pathname:'/profile'}
	const port = mount(<Portal 
											history={{location:{pathname:'/profile'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for alert page', () => {
	const location = {pathname:'/alerts'}
	const port = mount(<Portal 
											history={{location:{pathname:'/alerts'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for chart page', () => {
	const location = {pathname:'/charts'}
	const port = mount(<Portal 
											history={{location:{pathname:'/charts'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for info page', () => {
	const location = {pathname:'/info'}
	const port = mount(<Portal 
											history={{location:{pathname:'/info'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})

test('Portal will receive new props for default page', () => {
	const location = {pathname:'/profile'}
	const port = mount(<Portal 
											history={{location:{pathname:'/default'}}}
											pageLocation={jest.fn()}/>)
	port.setProps({location})
	expect(port).toBeDefined()
})