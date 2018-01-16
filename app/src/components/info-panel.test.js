import React from 'react'
import { mount } from 'enzyme'
import InfoPanel from './info-panel'

const panel = mount(<InfoPanel icon='test' title='Testing' results='test'/>)

test('InfoPanel exist', () => {
	expect(panel).toBeDefined()
	const title = panel.find('.info-panel-title').first()
	expect(title.text()).toEqual('Testing')
})