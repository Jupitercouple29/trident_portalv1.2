import React from 'react'
import { mount } from 'enzyme'
import { ProfilePage } from './profile-page'
import { updateUser } from '../../functions/updateUser'

jest.mock('../../functions/updateUser', () => (
	{ updateUser: jest.fn(() => Promise.resolve('success'))}
))
const user = {
	name:'testing',
	email:'testing',
	phone:'testing',
	company:'testing',
	logo:'testing'
}
const page = mount(<ProfilePage user={user} />)

test('ProfilePage exist', () => {
	expect(page).toBeDefined()
})

test('ProfilePage change name', () => {
	const name = page.find('.profile-page-name-input').first()
	name.simulate('change', {target:{value:'Tester'}})
	const input = page.find('.profile-page-name-input').first()
	expect(input.props().value).toEqual('Tester')
})

test('ProfilePage onFormSubmit without success', () => {
	updateUser.mockImplementation(() => Promise.resolve('none'))
	const form = page.find('form').first()
	form.simulate('submit')
	expect(page).toBeDefined()
})

test('ProfilePage onFormSubmit with success', () => {
	updateUser.mockImplementation(() => Promise.resolve('success'))
	const form = page.find('form').first()
	form.simulate('submit')
	expect(page).toBeDefined()
})
