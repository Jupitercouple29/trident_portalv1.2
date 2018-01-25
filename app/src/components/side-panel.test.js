import React from 'react'
import { mount } from 'enzyme'
import { SidePanel } from './side-panel'

jest.mock('./side-panel-item', () => 'sidepanelitem')

const panel = mount(<SidePanel 
											user={{tridents:{Perc:[2411]}}}
											history={{location:{pathname:'dashboard'}}} 
											sidePanelClick={jest.fn()}/>)

test('SidePanel exist', () => {
	expect(panel).toBeDefined()
})

test('SidePanel panel click', () => {
	const side = panel.find('.side-panel-container').first()
	side.simulate('click')
	expect(panel).toBeDefined()
})

test('SidePanel simulate route being clicked', () => {
	panel.instance().routeClicked('dashboard')
	expect(panel).toBeDefined()
})

test('SidePanel sending new props', () => {
	panel.setProps({history:'dashboard'})
	expect(panel).toBeDefined()
})

test('SidePanel show the display', () => {
	const panel = mount(<SidePanel 
											user={{tridents:{Perc:[2411]}}}
											displaySidePanel={true}
											history={{location:{pathname:'dashboard'}}} 
											sidePanelClick={jest.fn()}/>)
	expect(panel).toBeDefined()
})