import MockAdapter from 'axios-mock-adapter'
import { getTridents } from './getTridents'
import axios from 'axios'

const mock = new MockAdapter(axios)

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

beforeEach(() => {
	mock.reset()
})

test('getTridents', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident')
	.reply(200, {
		data:'testing'
	})

	getTridents({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getTridents with error', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident')
	.networkError()

	getTridents({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})