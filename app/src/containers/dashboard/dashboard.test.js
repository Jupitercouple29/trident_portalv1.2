import React from 'react'
import { shallow } from 'enzyme'
import { Dashboard } from './dashboard'

const newAlert = [{
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3sB",
        "_score": null,
        "_source": {
          "destination_port": 55396,
          "dns": {
            "rrname": "a1294.w20.akamai.net",
            "rdata": "104.107.61.99",
            "rcode": "NOERROR",
            "id": 145,
            "type": "answer",
            "ttl": 18,
            "rrtype": "A"
          },
          "type": "SuricataIDS",
          "source_ip": "198.6.100.125",
          "event_type": "dns",
          "@timestamp": "2018-01-08T23:55:04.349Z",
          "destination_ip": "10.10.3.11",
          "filename": "Trident2402",
          "proto": "UDP",
          "source_port": 53,
          "@version": "1",
          "host": "ELA-CLU-LOG001",
          "timestamp": "2018-01-08T23:55:04.349591+0000"
        },
        "sort": [
          1515455704349
        ]
      }]

const dashboardEvents = {
	alertsLastHour:20,
	lastEventTime:'1/1/2018',
	alerts:newAlert
}

jest.mock('../../functions/getNumOfAlerts', () => (
	{ getNumOfAlerts: jest.fn(() => Promise.resolve())}
))

jest.mock('../../components/trident-panel', () => 'trident-panel')
jest.mock('../../components/map', () => 'map')

const dash = shallow(<Dashboard 
										dashboard={dashboardEvents} 
										user={{tridents:[{Perc:[2411]}]}}
										tridents={[1,2,3,4]}/>)

test('Dashboard exist', () => {
	expect(dash).toBeDefined()
})

test('Dashboard with no alerts', () => {
	const dash = shallow(<Dashboard 
										dashboard={'alerts'} 
										user={{tridents:[{Perc:[2411]}]}}
										tridents={[]}/>)
	expect(dash).toBeDefined()
})