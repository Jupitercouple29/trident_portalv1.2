import MockAdapter from 'axios-mock-adapter'
import { getTridentAlerts } from './getTridentAlerts'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('getTridentAlerts', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/alerts')
	.reply(200, {
		data:'testing'
	})

	getTridentAlerts({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getTridentAlerts with error', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/alerts')
	.networkError()

	getTridentAlerts({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})