require('dotenv').config();
import MockAdapter from 'axios-mock-adapter'
import { postReport } from './postReport'
import request from 'supertest'
import express from 'express'

const app = express()

jest.mock('jsonwebtoken', () => (
	{ verify: jest.fn() }
))

test('postReport', () => {
	let email = 'test@test.com'
	let report = 'test-file'
	let reportName = 'test' 
	request(app)
		.post(process.env.REACT_APP_API_URL + `/reports/${email}/${reportName}`)
		.send(report)
		
		.then(res=> {
			console.log(process.env.REACT_APP_API_URL)
			console.log(res)
			expect(res.body).toEqual('success')
		})
})