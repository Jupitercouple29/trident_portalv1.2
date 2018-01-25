import React from 'react' 
import { mount } from 'enzyme'
import TridentPanel from './dashboard-trident-panel'

const panel = mount(<TridentPanel tridents={{perc:[2411,2402]}} alerts={{0:2000,1:100}}/>)

test('TridentPanel to exist', () => {
	expect(panel).toBeDefined()
})

test('TridentPanel to exist and alert = trident', () => {
	const panel = mount(<TridentPanel tridents={{perc:[2411,2402]}} alerts={{2411:2000,2402:2}}/>)
	expect(panel).toBeDefined()
})