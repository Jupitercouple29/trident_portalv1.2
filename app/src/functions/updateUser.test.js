import MockAdapter from 'axios-mock-adapter'
import { updateUser } from './updateUser'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('updateUser', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/users/update/profile')
	.reply(200, {
		data:'testing'
	})

	updateUser({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('updateUser with error', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/user/update/profile')
	.networkError()

	updateUser({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})