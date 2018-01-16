import React from 'react' 
import { mount } from 'enzyme'
import { InfoPage } from './info-page'

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
const page = mount(<InfoPage info={alert}/>)
test('InfoPage exist', () => {
	expect(page).toBeDefined()
})

test('InfoPage with no info', () => {
	const page = mount(<InfoPage info={[]} history={{push:jest.fn()}} />)
	expect(page).toBeDefined()
})