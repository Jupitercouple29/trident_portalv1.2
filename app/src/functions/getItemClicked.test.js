import MockAdapter from 'axios-mock-adapter'
import { getItemClicked } from './getItemClicked'
import axios from 'axios'

const mock = new MockAdapter(axios)

beforeEach(() => {
	mock.reset()
})

test('getItemClicked', () => {
	mock.onGet(process.env.REACT_APP_API_URL + '/trident/item')
	.reply(200, {
		data: 'testing'
	})

	getItemClicked(2411,'test', 'testing')
	.then(res => {
		expect(res.data).toEqual('testing')
	})
})