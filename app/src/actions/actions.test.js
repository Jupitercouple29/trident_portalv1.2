import React from 'react'
import * as actions from './index'

describe('action', () => {
  it('tridentArray should create an action to store tridents', () => {
    const tridents = ['2411', '2402']
    const expectedAction = {
      type: actions.TRIDENT_ARRAY,
      tridents
    }
    expect(actions.tridentArray(tridents)).toEqual(expectedAction)
  })

  it('pageLocation should create an action to store page location', () => {
    const page = <div>Hello</div>
    const expectedAction = {
      type: actions.PAGE_LOCATION,
      page
    }
    expect(actions.pageLocation(page)).toEqual(expectedAction)
  })

  it('login should create an action to store user data', () => {
    const user = {email:"w@w.com",name:"test",tridents:[2401]}
    const expectedAction = {
      type: actions.VALID_USER,
      user
    }
    expect(actions.login(user)).toEqual(expectedAction)
  })

  it('tridentSelected should create an action to store the trident selected', () => {
    const trident = ['2402']
    const expectedAction = {
      type: actions.SELECTED_TRIDENT,
      trident
    }
    expect(actions.tridentSelected(trident)).toEqual(expectedAction)
  })

  it('tridentAlerts should create an action to store trident alerts', () => {
    const alerts = [{alert:'some alert'}, {alert:'another alert'}]
    const expectedAction = {
      type: actions.TRIDENT_ALERTS,
      alerts
    }
    expect(actions.tridentAlerts(alerts)).toEqual(expectedAction)
  })

  it('tridentSourceIPs should create an action to store a tridents Source IP history', () => {
    const ips = ['10.10.2.303', '10.222.321.1']
    const expectedAction = {
      type: actions.SOURCE_IPS,
      ips
    }
    expect(actions.tridentSourceIPs(ips)).toEqual(expectedAction)
  })

  it('tridentDestIPs should create an action to store a tridents destination IPs', () => {
    const ips = ['101.101.11.1', '303.2.1.222']
    const expectedAction = {
      type: actions.DEST_IPS,
      ips
    }
    expect(actions.tridentDestIPs(ips)).toEqual(expectedAction)
  })

  it('tridentCurrentAlerts should create an action to store a tridents current alerts', () => {
    const all = [{alert:'some alert'},{alert:'another alert'}]
    const expectedAction = {
      type: actions.CURRENT_ALERTS,
      all
    }
    expect(actions.tridentCurrentAlerts(all)).toEqual(expectedAction)
  })

  it('dashboardInfo should create an action to store dashboard info', () => {
    const all = [{alert:'some alert'},{alert:'another alert'}]
    const expectedAction = {
      type: actions.DASHBOARD_INFO,
      all
    }
    expect(actions.dashboardInfo(all)).toEqual(expectedAction)
  })

  it('tridentSignatureAlerts should create an action to store a tridents signature alerts', () => {
    const all = [{alert:'some alert'},{alert:'another alert'}]
    const expectedAction = {
      type: actions.SIGNATURE_ALERTS,
      all
    }
    expect(actions.tridentSignatureAlerts(all)).toEqual(expectedAction)
  })

  it('mapAlerts should create an action to store a tridents map alerts', () => {
    const all = [{alert:'some alert'},{alert:'another alert'}]
    const expectedAction = {
      type: actions.MAP_ALERTS,
      all
    }
    expect(actions.mapAlerts(all)).toEqual(expectedAction)
  })

  it('infoAlerts should create an action to store a tridents info alerts', () => {
    const all = [{alert:'some alert'},{alert:'another alert'}]
    const expectedAction = {
      type: actions.INFO_ALERTS,
      all
    }
    expect(actions.infoAlerts(all)).toEqual(expectedAction)
  })
})
