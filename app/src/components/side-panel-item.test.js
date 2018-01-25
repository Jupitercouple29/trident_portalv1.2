import React from 'react'
import { mount } from 'enzyme'
import { SidePanelItem } from './side-panel-item'

const panel = mount(<SidePanelItem 
											route={jest.fn()} 
											display='show' 
											items={{Perc:[2411,2412]}} 
											icon='test' 
											title='Test' 
											selected='dashboard'/>)

test('SidePanelItem exist', () => {
	expect(panel).toBeDefined()
})

test('SidePanelItem with same title and is selected', () => {
	const panel = mount(<SidePanelItem 
												display='show' 
												items={{Perc:[2411,2412]}} 
												icon='test' 
												title='dashboard' 
												selected='dashboard'/>)
  const title = panel.find('.side-panel-item-title').first()
  expect(title.text()).toEqual('dashboard')
})

test('SidePanelItem clicking of row', () => {
	const row = panel.find('.side-panel-item').first()
	row.simulate('click', {route:'Trident'})
})

test('SidePanelItem with open props and is not hidden', () => {
	const panel = mount(<SidePanelItem 
												open={true} 
												route={jest.fn()} 
												display='show' 
												items={{Perc:[2411,2412]}} 
												icon='test' 
												title='Test' 
												selected='dashboard'/>)
  const row = panel.find('.side-panel-item').first()
	row.simulate('click', {route:'Trident'})
  expect(panel).toBeDefined()
})

test('SidePanelItem with open props and is hidden', () => {
	const panel = mount(<SidePanelItem 
												open={true} 
												route={jest.fn()} 
												display='show' 
												items={{Perc:[2411,2412]}} 
												icon='test' 
												title='Test' 
												selected='dashboard'/>)
  panel.setState({isHidden:false})
  const row = panel.find('.side-panel-item').first()
	row.simulate('click', {route:'Trident'})
  expect(panel).toBeDefined()
})

test('SidePanelItem with open props with no items to display', () => {
	const panel = mount(<SidePanelItem 
												history={{push:jest.fn()}} 
												open={true} 
												route={jest.fn()} 
												display='show' 
												icon='test' 
												title='Test' 
												selected='dashboard'/>)
  const row = panel.find('.side-panel-item').first()
	row.simulate('click', {route:'Trident'})
  expect(panel).toBeDefined()
})

test('SidePanelItem clicking of open items', () => {
	const panel = mount(<SidePanelItem 
												tridentSelected={jest.fn()} 
												history={{push:jest.fn()}} 
												open={true} 
												route={jest.fn()} 
												display='show' 
												items={{Perc:[2411,2412]}} 
												icon='test' 
												title='Test' 
												selected='dashboard'/>)
  const row = panel.find('.side-panel-item').first()
	row.simulate('click', {route:'Trident'})
	const item = panel.find('p').last()
  item.simulate('click', {route:'Trident', trident:'Perc 2411'})
  expect(panel).toBeDefined()
})