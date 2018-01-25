import React from 'react'
import { mount } from 'enzyme'
import { AlertsPage } from './alerts-page'

jest.mock('../../components/map', () => 'map')
const alert = [
      {
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3r_",
        "_score": null,
        "_source": {
          "geoip": {
            "timezone": "America/New_York",
            "ip": "198.6.100.125",
            "latitude": 38.8605,
            "coordinates": [
              -77.263,
              38.8605
            ],
            "continent_code": "NA",
            "city_name": "Fairfax",
            "country_name": "United States",
            "country_code2": "US",
            "dma_code": 511,
            "country_code3": "US",
            "region_name": "Virginia",
            "location": {
              "lon": -77.263,
              "lat": 38.8605
            },
            "postal_code": "22031",
            "region_code": "VA",
            "longitude": -77.263
          },
          "destination_port": 53,
          "dns": {
            "rrname": "b.scorecardresearch.com.edgesuite.net",
            "id": 145,
            "type": "query",
            "tx_id": 0,
            "rrtype": "A"
          },
          "type": "SuricataIDS",
          "source_ip": "10.10.3.11",
          "event_type": "dns",
          "@timestamp": "2018-01-08T23:55:04.349Z",
          "destination_ip": "198.6.100.125",
          "filename": "Trident2402",
          "proto": "UDP",
          "source_port": 55396,
          "@version": "1",
          "host": "ELA-CLU-LOG001",
          "timestamp": "2018-01-08T23:55:04.349591+0000"
        },
        "sort": [
          1515455704349
        ]
      },
      {
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3r_",
        "_score": null,
        "_source": {
          "geoip": {
            "timezone": "America/New_York",
            "ip": "198.6.100.125",
            "latitude": 38.8605,
            "coordinates": [
              -77.263,
              38.8605
            ],
            "continent_code": "NA",
            "city_name": "Fairfax",
            "country_name": "United States",
            "country_code2": "US",
            "dma_code": 511,
            "country_code3": "US",
            "region_name": "Virginia",
            "location": {
              "lon": -77.263,
              "lat": 38.8605
            },
            "postal_code": "22031",
            "region_code": "VA",
            "longitude": -77.263
          },
          "destination_port": 53,
          "dns": {
            "rrname": "b.scorecardresearch.com.edgesuite.net",
            "id": 145,
            "type": "query",
            "tx_id": 0,
            "rrtype": "A"
          },
          "type": "SuricataIDS",
          "source_ip": "10.10.3.11",
          "event_type": "dns",
          "@timestamp": "2018-01-08T23:55:04.349Z",
          "destination_ip": "198.6.100.125",
          "filename": "Trident2402",
          "proto": "UDP",
          "source_port": 55396,
          "@version": "1",
          "host": "ELA-CLU-LOG001",
          "timestamp": "2018-01-08T23:55:04.349591+0000"
        },
        "sort": [
          1515455704349
        ]
      }
    ]
const page = mount(<AlertsPage />)

test('AlertsPage exist', () => {
	expect(page).toBeDefined()
	const title = page.find('.dashboard-title').first()
	expect(title.text()).toEqual('DASHBOARD')
})

test('AlertsPage with alerts', () => {
	const page = mount(<AlertsPage 
											alerts={alert}/>)
})

test('AlertsPage will receive new props', () => {
	const newAlert = [
			{
        "_index": "logstash-2018.01.08",
        "_type": "SuricataIDS",
        "_id": "AWDYLWQ6OlnuUQ_el3sB",
        "_score": null,
        "_source": {
          "geoip": {
            "timezone": "America/New_York",
            "ip": "198.6.100.125",
            "latitude": 38.8605,
            "coordinates": [
              -77.263,
              38.8605
            ],
            "continent_code": "NA",
            "city_name": "Fairfax",
            "country_name": "United States",
            "country_code2": "US",
            "dma_code": 511,
            "country_code3": "US",
            "region_name": "Virginia",
            "location": {
              "lon": -77.263,
              "lat": 38.8605
            },
            "postal_code": "22031",
            "region_code": "VA",
            "longitude": -77.263
          },
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
      }
    ]
    page.setProps({alerts:newAlert})
    expect(page).toBeDefined()
})

test('AlertsPage with new props and no location', () => {
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
   	page.setProps({alerts:newAlert})
   	expect(page).toBeDefined()
})

test('AlertsPage sending the same alert', () => {
	page.setProps({alerts:alert})
	expect(page).toBeDefined()
})

test('AlertsPage componentWillMount with props not having location', () => {
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
	const page = mount(<AlertsPage alerts={newAlert}/> )
	expect(page).toBeDefined()
	page.setProps({alerts:newAlert})
})