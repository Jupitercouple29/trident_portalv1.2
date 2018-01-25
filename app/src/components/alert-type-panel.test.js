import React from 'react' 
import { mount } from 'enzyme'
import AlertTypePanel from './alert-type-panel'
import { getAlerts } from '../functions/getAlerts'
import MockAdapter from 'axios-mock-adapter'

jest.mock('../functions/getAlerts', () => (
		{ getAlerts: jest.fn(() => Promise.resolve())}
))
const alert = [
      {
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3sI",
        "_score": null,
        "_source": {
          "destination_port": 53,
          "dns": {
            "rrname": "www.teramind.co",
            "id": 31876,
            "type": "query",
            "tx_id": 0,
            "rrtype": "A"
          },
          "type": "SuricataIDS",
          "source_ip": "10.10.1.61",
          "event_type": "dns",
          "@timestamp": "2018-01-08T23:55:05.480Z",
          "destination_ip": "10.10.3.11",
          "filename": "Trident2402",
          "proto": "UDP",
          "source_port": 49950,
          "@version": "1",
          "host": "ELA-CLU-LOG001",
          "timestamp": "2018-01-08T23:55:05.480408+0000"
        },
        "sort": [
          1515455705480
        ]
      },
      {
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3sJ",
        "_score": null,
        "_source": {
          "destination_port": 49950,
          "dns": {
            "rrname": "www.teramind.co",
            "rdata": "teramind.co",
            "rcode": "NOERROR",
            "id": 31876,
            "type": "answer",
            "ttl": 198,
            "rrtype": "CNAME"
          },
          "type": "SuricataIDS",
          "source_ip": "10.10.3.11",
          "event_type": "dns",
          "@timestamp": "2018-01-08T23:55:05.480Z",
          "destination_ip": "10.10.1.61",
          "filename": "Trident2402",
          "proto": "UDP",
          "source_port": 53,
          "@version": "1",
          "host": "ELA-CLU-LOG001",
          "timestamp": "2018-01-08T23:55:05.480408+0000"
        },
        "sort": [
          1515455705480
        ]
      }
 ]

getAlerts.mockImplementation(() => Promise.resolve(alert))
const panel = mount(<AlertTypePanel alertFunc={getAlerts} trident={2402} type={'dns'} title={'Testing'} message={'Loading'}/>)

test('AlertTypePanel exist', () => {
	expect(panel).toBeDefined()
})

test('AlertTypePanel	will recieve next props', () => {
	panel.setProps({trident:2411})
	expect(panel).toBeDefined()
})

test('AlertTypePanel will receive next props for title', () => {
	panel.setProps({title:'Test Over'})
	expect(panel).toBeDefined()
})