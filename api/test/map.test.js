const assert = require('assert')
const express = require('express')
const request = require('supertest')
const server = require('../index')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const elasticsearch = require('elasticsearch')
const jwt = require('jsonwebtoken')

let token 
let trident=[]

beforeEach(()=>{
	token = jwt.sign(
		{user:'Tester',date:new Date()}, 
		process.env.JWT_SECRET)	
	trident.push(2411,2412)
})

describe('Map', () => {
	it('should call map alerts', (done) => {
		sinon.stub(elasticsearch, 'search').returns('hello')
	 	return request(server)
		.get('/map/alerts')
		.set('Authorization', `Bearer ${token}`)
		.query({trident:trident})
		.expect('Content-Type', "application/json; charset=utf-8")
		.expect(200)
		.then((res) => {
			console.log(res)
			done()
		})
	}).timeout(40000)
})