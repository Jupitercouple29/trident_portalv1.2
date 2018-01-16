import React from 'react'
import { mount } from 'enzyme'
import { PortalMap } from './map'
import { getMapCoords } from '../functions/getMapCoords'
import { getMapAlert } from '../functions/getMapAlert'

jest.mock('../functions/getMapAlert', () => (
		{ getMapAlert: jest.fn(() => Promise.resolve())}
))

jest.mock('../functions/getMapCoords', () => (
		{ getMapCoords: jest.fn(() => Promise.resolve())}
))

// const map = mount(<PortalMap tridents='2402' history={{location:{pathname:2}}}/>)
// const coords = [['38.875','-77.25','20'], ['51.3125','9.4921','48']]
// map.setState({coords:coords})

test('PortalMap exist', () => {

	// getMapCoords.mockImplementaion(() => Promise.resolve(coords))
	// expect(map).toBeDefined()
})