import React from 'react'
import * as reducer from './reducers'
import * as actions from '../actions'

describe('reducers', () => {
  it('validUser should return true', () => {
    expect(reducer.validUser(null,{
      type: actions.VALID_USER,
      user: true
    })).toEqual(true)
  })

  it('validUser should return default state', () => {
    expect(reducer.validUser(null,{
      type: actions.VALID_USERS,
      user: true
    })).toEqual(null)
  })

  it('alerts should return false', () => {
    expect(reducer.alerts(null,{
      type: actions.TRIDENT_ALERTS,
      alerts: false
    })).toEqual(false)
  })

  it('alerts should return the default state', () => {
    expect(reducer.alerts(null,{
      type: actions.TRIDENT_ALERT,
      alerts: false
    })).toEqual(null)
  })

  it('soureIPs should return 10.10.2.321', () => {
    expect(reducer.sourceIPs(null,{
      type: actions.SOURCE_IPS,
      ips: "10.10.2.321"
    })).toEqual("10.10.2.321")
  })

  it('soureIPs should return the default state', () => {
    expect(reducer.sourceIPs(null,{
      type: actions.SOURCE_IP,
      ips: "10.10.2.321"
    })).toEqual(null)
  })

  it('destIPs should return 0', () => {
    expect(reducer.destIPs(null,{
      type: actions.DEST_IPS,
      ips: 0
    })).toEqual(0)
  })

  it('destIPs should return the default state', () => {
    expect(reducer.destIPs(null,{
      type: actions.DEST_IP,
      ips: 0
    })).toEqual(null)
  })

  it('page should return <div>Hello</div>', () => {
    expect(reducer.page(null,{
      type: actions.PAGE_LOCATION,
      page: <div>Hello</div>
    })).toEqual(<div>Hello</div>)
  })

  it('page should return the default state', () => {
    expect(reducer.page(null,{
      type: actions.PAGE_LOCATIONS,
      page: <div>Hello</div>
    })).toEqual(null)
  })

  it('info should return true', () => {
    expect(reducer.tridentArray(null,{
      type: actions.TRIDENT_ARRAY,
      tridents: true
    })).toEqual(true)
  })

  it('info should return the default state', () => {
    expect(reducer.tridentArray(null,{
      type: actions.TRIDENT_ARRAYS,
      tridents: true
    })).toEqual(null)
  })

  it('selectedTrident should return [2411]', () => {
    expect(reducer.selectedTrident(null,{
      type: actions.SELECTED_TRIDENT,
      trident: [2411]
    })).toEqual([2411])
  })

  it('selectedTrident should return the default state', () => {
    expect(reducer.selectedTrident(null,{
      type: actions.SELECTED_TRIDENTS,
      trident: [2411]
    })).toEqual(null)
  })

  it('currentAlerts should return {alert:"some alert"}', () => {
    expect(reducer.currentAlerts(null,{
      type: actions.CURRENT_ALERTS,
      all: {alert:"some alert"}
    })).toEqual({alert:"some alert"})
  })

  it('currentAlerts should return the default state ', () => {
    expect(reducer.currentAlerts(null,{
      type: actions.CURRENT_ALERT,
      all: {alert:"some alert"}
    })).toEqual(null)
  })

  it('dashboard info should return {alert:"all the alerts"}', () => {
    expect(reducer.dashboardProps(null,{
      type: actions.DASHBOARD_INFO,
      all: {alert:"all the alerts"}
    })).toEqual({alert:"all the alerts"})
  })

  it('dashboard info should return the default state ', () => {
    expect(reducer.dashboardProps(null,{
      type: actions.DASHBOARD_INFOS,
      all: {alert:"all the alerts"}
    })).toEqual(null)
  })

  it('signatureAlerts should return {alert:"signature alert"}', () => {
    expect(reducer.signatureAlerts(null,{
      type: actions.SIGNATURE_ALERTS,
      all: {alert:"signature alert"}
    })).toEqual({alert:"signature alert"})
  })

  it('signatureAlerts should return the default state', () => {
    expect(reducer.signatureAlerts(null,{
      type: actions.SIGNATURE_ALERT,
      all: {alert:"signature alert"}
    })).toEqual(null)
  })

  it('location alerts should return {alert:" alert"}', () => {
    expect(reducer.locationAlerts(null,{
      type: actions.MAP_ALERTS,
      all: {alert:" alert"}
    })).toEqual({alert:" alert"})
  })

  it('location alerts should return the default state', () => {
    expect(reducer.locationAlerts(null,{
      type: actions.MAP_ALERT,
      all: {alert:" alert"}
    })).toEqual(null)
  })

  it('info alerts should return {alert:" alert"}', () => {
    expect(reducer.info(null,{
      type: actions.INFO_ALERTS,
      all: {alert:" alert"}
    })).toEqual({alert:" alert"})
  })

  it('info alerts should return the default state ', () => {
    expect(reducer.info(null,{
      type: actions.INFO_ALERT,
      all: {alert:" alert"}
    })).toEqual(null)
  })
})