import MockAdapter from 'axios-mock-adapter'
import { getAlerts } from './getAlerts'
import jwt from 'jsonwebtoken'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('getAlerts', () => {
	jwt.verify.mockImplementation((token, secret) => {
		let decoded:{
			user:{
				tridents:{
					Perc:[2411]
				}
			}
		}
		return decoded
	})
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/alerts/dns')
	.reply(200, { 
		data:'testing'
	})

	getAlerts(2411,'dns')
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getAlerts', () => {
	jwt.verify.mockImplementation((token, secret) => {
		let decoded:{
			user:{
				tridents:{
					Perc:[2411]
				}
			}
		}
		return decoded
	})
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/alerts/dns')
	.networkError()

	getAlerts(2411,'dns')
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})