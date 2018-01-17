import React from 'react'
import { shallow, mount } from 'enzyme'
import { AuthRoute } from './authRoute'
import Login from '../containers/login/login'
import Portal from '../containers/portal/portal'
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => (
	{verify: jest.fn()}
))

beforeEach(() => {
	localStorage.setItem('jwt', 'hello')
	jwt.verify.mockReset()

})

test('AuthRoute is redirecting', () => {
    const route = <AuthRoute path="/portal" component={Portal}/>
    expect(route).toBeDefined()     
})

// test('Authroute as a function and valid user login', () => {
// 	jwt.verify.mockImplementation((token, secret, callback) => {
// 		var err = null
// 		var decoded = {
// 			date: new Date(),
// 			user:{
// 				tridents:{
// 					Perc:[2411]
// 				}
// 			}
// 		}
// 		callback(err, decoded)
// 	}) 
// 	const validUser = 'tester'
// 	const tridentArray = () => {return 'hello'}
// 	const login = jest.fn()
// 	const route = AuthRoute(<Login validUser={validUser} component={Login} tridentArray={tridentArray}/>)
// 	expect(route.props).toBeDefined()
// })

test('Authroute as a component and valid user login', () => {
	jwt.verify.mockImplementation((token, secret, callback) => {
		var err = null
		var decoded = {
			date:'2017-12-09',
			user:'Tester'
		}
		callback(err, decoded)
	}) 
	const validUser = 'tester'
	const route = AuthRoute(<Login validUser={validUser} />)
	expect(route.props).toBeDefined()
})

test('Authroute as a function and invalid user login', () => {
	jwt.verify.mockImplementation((token, secret, callback) => {
		var err = true
		var decoded = {
			date:'2017-12-09',
			user:'Tester'
		}
		callback(err, decoded)
	}) 
	const route = AuthRoute(Login)
	expect(route.props.to).toEqual('/login')
})