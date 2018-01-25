import React from 'react' 
import { mount } from 'enzyme'
import Columns from './dashboard-columns'

const column = mount(<Columns title={'Testing'} info={[1,2,3]} size='small' message='loading'/>)

test('Columns	exist', () => {
	expect(column).toBeDefined()
})

test('Columns	will receive new props', () => {
	column.setProps({message:'Just testing'})
	expect(column.props().message).toEqual('Just testing')
})

test('Columns	will receive next props of title', () => {
	column.setProps({title:'Testing new props'})
	expect(column.props().title).toEqual('Testing new props')
})

test('Columns	contains a clicked prop', () => {
	const column = mount(<Columns title={'Testing'} info={[1,2,3]} message='loading' clicked={jest.fn()}/>)
	expect(column.props().clicked).toBeTruthy()
})

test('Columns is produced with no info', () => {
	const column = mount(<Columns title={'Testing'} message='loading' clicked={jest.fn()}/>)
	expect(column).toBeDefined()
})