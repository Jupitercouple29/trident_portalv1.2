import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { auth } from './auth'

const mock = new MockAdapter(axios)

beforeEach(() => {
	mock.reset()
})

test('Auth function is called', async () => {
	const response = {
		jwtToken:'test-token',
		validUser:{
			name: 'Tester',
			email: 'test@test.com',
			company: 'Testing'
		}
	}
	mock.onPost(process.env.REACT_API_URL + '/users', { 
		email: 'test@test.com',
		pswd: 'testing'
	}).reply(200, response)

	auth('test@test.com', 'testing')
	.then((res) => {
		expect(res.isValid).toEqual(true)
		expect(res.data.name).toEqual('Tester')
	})
})

test('Auth function is called', async () => {
	const response = {
		validUser:{
			name: 'Tester',
			email: 'test@test.com',
			company: 'Testing'
		}
	}
	mock.onPost(process.env.REACT_API_URL + '/users', { 
		email: 'test@test.com',
		pswd: 'testing'
	}).reply(200, response)

	auth('test@test.com', 'testing')
	.then((res) => {
		expect(res.isValid).toEqual(true)
		expect(res.data.name).toEqual('Tester')
	})
})

test('Auth function is called with invalid email', async () => {
	const error = 'invalid email'
	mock.onPost(process.env.REACT_API_URL + '/users', { 
		email: 'test@test.com',
		pswd: 'testing'
	}).reply(400, error )

	auth('test@test.com', 'testing')
	.then((res) => {
		expect(res.data).toEqual('invalid email')
	})
})

test('Auth function is called with networkError', async () => {
	mock.onPost(process.env.REACT_API_URL + '/users', { 
		email: 'test@test.com',
	}).networkError()

	auth('test@test.com', 'testing')
	.then((res) => {
		expect(res.data).toEqual('Network Error')
	})
})
