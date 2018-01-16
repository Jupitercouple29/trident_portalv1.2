import React from 'react'
import { mount } from 'enzyme'
import { NavBar } from './nav-bar'

const bar = mount(<NavBar user='test' history={{push:jest.fn()}} sidePanelClick={jest.fn()}/>)

test('NavBar exist', () => {
	expect(bar).toBeDefined()
	const title = bar.find('h2').first()
	expect(title.text()).toEqual(' Trident CyberSecurity Monitoring Platform ')
})

test('NavBar with DCILogo', () => {
	const bar = mount(<NavBar user={{seller:'DCI_logo'}}/>)
	expect(bar).toBeDefined()
})

test('NavBar with AISLogo', () => {
	const bar = mount(<NavBar user={{seller:'AIS_logo'}}/>)
	expect(bar).toBeDefined()
})

test('NavBar with custom logo', () => {
	const bar = mount(<NavBar user={{logo:'Testing'}}/>)
	expect(bar).toBeDefined()
})

test('NavBar signout button', () => {
	const signout = bar.find('.fa').last()
	signout.simulate('click')
})

test('NavBar hamburger Click', () => {
	const hamburger = bar.find('.fa-bars').first()
	hamburger.simulate('click')
})