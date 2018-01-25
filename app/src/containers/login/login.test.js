import React from 'react'
import { mount, shallow } from 'enzyme'
import { Login } from './login'
import { auth } from '../../functions/auth'

jest.mock('../../functions/auth', () => (
	{ auth: jest.fn(() => Promise.resolve())}
))

const history = {
	push: jest.fn()
}
	
const login = mount(<Login login={jest.fn()} history={history}/>)

test('Login page exist',  () => {
	expect(login).toBeDefined()
})

test('Input for email is wsmith@phalanxsecure.com', ()=> {
	const email = login.find('#email').first()
	expect(email.props().value).toEqual('')
	email.simulate('change', {target:{value: 'wsmith@phalanxsecure.com'}})
	const input = login.find('#email').first()
	expect(input.props().value).toEqual('wsmith@phalanxsecure.com')
})

test('Input field for password is phalanx',  () => {
	const password = login.find('#pswd').first()
	expect(password.props().value).toEqual(undefined)
	password.simulate('change', {target:{value: 'phalanx'}})
})

test('OnFormSubmit function is called with a valid user', () => {
	const user = {
		isValid: true,
		token: 'test-token',
		data:{
			tridents: 'test-trident'
		}
	}
	auth.mockImplementation(() => Promise.resolve(user))
	login.find('form').simulate('submit', jest.fn())
	expect(auth).toHaveBeenCalled()
})

test('OnFormSubmit function is called with an invalid user', () => {
	const user = {
		isValid: false,
		data: 'Network Error'
	}
	auth.mockImplementation(() => Promise.resolve(user))
	login.find('form').simulate('submit', jest.fn())
	login.setState({_error:"Network Error"})
	const error = login.find('.login-error').first()
	expect(error.text()).toEqual('Network Error')
	expect(auth).toHaveBeenCalled()
})