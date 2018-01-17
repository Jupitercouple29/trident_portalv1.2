import MockAdapter from 'axios-mock-adapter'
import { getMapAlert } from './getMapAlert'
import axios from 'axios'

const mock = new MockAdapter(axios)

beforeEach(() => {
	mock.reset()
})

test('getMapAlerts', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/map/alerts/alert')
	.reply(200, {
		data:'testing'
	})

	getMapAlert({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})

test('getMapAlerts', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/map/alerts/alert')
	.networkError()

	getMapAlert({info:{lat:1,long:2,trident:3}})
	.then(res => {
		expect(res.data).toEqual('Network Error')
	})
})