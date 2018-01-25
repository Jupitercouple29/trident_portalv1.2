import MockAdapter from 'axios-mock-adapter'
import { getMapCoords } from './getMapCoords'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('getMapCoords', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/map/alerts')
	.reply(200, {
		data:'testing'
	})

	getMapCoords({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getMapCoords with error', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/map/alerts')
	.networkError()

	getMapCoords({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})