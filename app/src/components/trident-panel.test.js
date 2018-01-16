import React from 'react'
import { mount } from 'enzyme'
import { TridentPanel } from './trident-panel'

const panel = mount(<TridentPanel 
											sourceIPs={[{key:1,doc_count:1},{key:2,doc_count:2}]}
											destIPs={[{key:1,doc_count:1},{key:2,doc_count:2}]}
											alerts={[{key:1,doc_count:1},{key:2,doc_count:2}]}
											message='testing'
											infoAlerts={jest.fn()}
											history={{push:jest.fn()}}/>)

test('TridentPanel exist', () => {
	expect(panel).toBeDefined()
})

test('TridentPanel handleOnClick function', () => {
	const row = panel.find('.trident-panel-alert-name').first()
	row.simulate('click', {title:'testing', info:'dns'})
	expect(panel).toBeDefined()
})

test('TridentPanel will receive new message props', () => {
	panel.setProps({message:'done testing'})
	expect(panel).toBeDefined()
})

test('TridentPanel will receive new title props', () => {
	panel.setProps({title:'testing'})
	expect(panel).toBeDefined()
})

test('TridentPanel has header for Total', () => {
	const header = panel.find('.trident-panel-header').last()
	expect(header.text()).toEqual('Total')
})

test('TridentPanel with no alerts', () => {
	const panel = mount(<TridentPanel 
											sourceIPs={[{key:1,doc_count:1},{key:2,doc_count:2}]}
											destIPs={[{key:1,doc_count:1},{key:2,doc_count:2}]}
											alerts={[]}
											message='testing'
											infoAlerts={jest.fn()}
											history={{push:jest.fn()}}/>)
	expect(panel).toBeDefined()
})