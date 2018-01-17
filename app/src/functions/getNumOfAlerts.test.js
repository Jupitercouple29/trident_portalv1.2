import MockAdapter from 'axios-mock-adapter'
import { getNumOfAlerts } from './getNumOfAlerts'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('getNumOfAlerts', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/count')
	.reply(200, {
		data:'testing'
	})

	getNumOfAlerts({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getNumOfAlerts with error', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/count')
	.networkError()

	getNumOfAlerts({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})