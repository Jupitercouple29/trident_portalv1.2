import React from 'react'
import { mount } from 'enzyme'
import { TridentPage } from './trident-page'
import { getTridentAlerts } from '../../functions/getTridentAlerts'

jest.mock('../../functions/getTridentAlerts', () => (
	{ getTridentAlerts: jest.fn(() => Promise.resolve({alerts:[1,2,3,4]}))}
))
jest.mock('../../components/map', () => 'map')
jest.mock('../../components/trident-panel', () => 'trident-panel')
jest.mock('../../functions/getAlerts', () => (
	{ getAlerts: jest.fn(() => Promise.resolve())}
))
const page = mount(<TridentPage 
											sourceIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											destIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											signature={{key:1,doc_count:1},{key:2, doc_count:2}}/>)

test('TridentPage exist', () => {
	expect(page).toBeDefined()
})

test('TridentPage with alerts', () => {
	const res = {
		alerts:[]
	}
	getTridentAlerts.mockImplementation(()=> Promise.resolve(res))
	const page = mount(<TridentPage 
											sourceIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											destIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											signature={{key:1,doc_count:1},{key:2, doc_count:2}}
											tridentAlerts={jest.fn()}
											tridentSourceIPs={jest.fn()}
											tridentSignatureAlerts={jest.fn()}
											tridentDestIPs={jest.fn()}/>)
	
	expect(page).toBeDefined()
})

test('TridentPage will receive props', () => {
	const res = {
		alerts:[1,2,3,4]
	}
	getTridentAlerts.mockImplementation(()=> Promise.resolve(res))
	const page = mount(<TridentPage 
											sourceIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											destIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											signature={{key:1,doc_count:1},{key:2, doc_count:2}}
											tridentAlerts={jest.fn()}
											tridentSourceIPs={jest.fn()}
											tridentSignatureAlerts={jest.fn()}
											tridentDestIPs={jest.fn()}/>)
	page.setProps({selectedTrident:[2411]})
})

test('TridentPage will receive props with null alerts', () => {
	const res = {
		alerts:[]
	}
	getTridentAlerts.mockImplementation(()=> Promise.resolve(res))
	const page = mount(<TridentPage 
											sourceIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											destIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											signature={{key:1,doc_count:1},{key:2, doc_count:2}}
											tridentAlerts={jest.fn()}
											tridentSourceIPs={jest.fn()}
											tridentSignatureAlerts={jest.fn()}
											tridentDestIPs={jest.fn()}/>)
	page.setProps({selectedTrident:[2411]})
})

test('TridentPage will receive props with no return', () => {
	const res = {
		alerts:[]
	}
	getTridentAlerts.mockImplementation(()=> Promise.reject())
	const page = mount(<TridentPage 
											sourceIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											destIPs={{key:1,doc_count:1}, {key:2, doc_count:2}}
											signature={{key:1,doc_count:1},{key:2, doc_count:2}}
											tridentAlerts={jest.fn()}
											tridentSourceIPs={jest.fn()}
											tridentSignatureAlerts={jest.fn()}
											tridentDestIPs={jest.fn()}/>)
	page.setProps({selectedTrident:[2411]})
})
test('TridentPage will receive props with selectedTrident equal to null', () => {
	page.setProps({selectedTrident:null})
})