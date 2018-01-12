import React from 'react'
import { mount } from 'enzyme'
import AlertPanelItem from './alert-panel-item'

test('AlertPanelItem exist with dns event_type and simulate onclick', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'dns',
	}

	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const panelButton = panel.find('.alert-panel-item-container')
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('dns')
	panelButton.simulate('click', jest.fn())
})

test('AlertPanelItem exist with dns event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'dns',
		source_port:'test',
		destination_port:'test',
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test'
		},
		dns:{
			rrname:'test',
			rdata:'test',
			rcode:'test',
			id:'test',
			type:'test',
			ttl:'test',
			rrtype:'test'
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('dns')
})

test('AlertPanelItem exist with tls event_type and tls events', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'tls',
		source_port:'test',
		destination_port:'test',
		tls:{
			subject:'test',
			issuerdn:'test',
			fingerprint:'test',
			version:'test',
			sni:'test'
		},
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test'
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('tls')
})

test('AlertPanelItem exist with tls event_type and tls events', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'tls',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('tls')
})

test('AlertPanelItem exist with no event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'none',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('none')
})

test('AlertPanelItem exist with http event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'http',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('http')
})

test('AlertPanelItem exist with http event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'http',
		source_port:'test',
		destination_port:'test',
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test',
		},
		http:{
			hostname:'test',
			protocol:'test',
			http_method:'test',
			url:'test',
			http_user_agent:'test',
			status:'test',
			http_content_type:'test',
			http_refer:'test'
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('http')
})

test('AlertPanelItem exist with alert event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'alert',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('alert')
})

test('AlertPanelItem exist with alert event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'alert',
		source_port:'test',
		destination_port:'test',
		rule_type:'test',
		Signature_Info:'test',
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test'
		},
		alert:{
			severity:'test',
			signature_id:'test',
			signature:'test',
			action:'test',
			category:'test'
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('alert')
})

test('AlertPanelItem exist with fileinfo event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'fileinfo',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('fileinfo')
})

test('AlertPanelItem exist with fileinfo event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'fileinfo',
		source_port:'test',
		destination_port:'test',
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test',
		},
		fileinfo:{
			magic:'test',
			filename:'test',
			state:'test',
			type:'test',
			md5:'test'
		},
		http:{
			hostname:'test',
			protocol:'test',
			http_method:'test',
			http_refer:'test',
			url:'test',
			http_user_agent:'test',
			status:'test'
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('fileinfo')
})

test('AlertPanelItem exist with ssh event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'ssh',
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('ssh')
})

test('AlertPanelItem exist with ssh event_type', () => {
	const alert = {
		timestamp:'1/1/11',
		source_ip:'test',
		destination_ip:'test',
		filename:'test',
		event_type:'ssh',
		source_port:'test',
		destination_port:'test',
		geoip:{
			city_name:'test',
			country_name:'test',
			postal_code:'test'
		},
		ssh:{
			server:{
				proto_version:'test',
				software_version:'test'
			},
			client:{
				proto_version:'test',
				software_version:'test'
			}
		}
	}
	const panel = mount(<AlertPanelItem alert={alert} alertKey={'test'}/>)
	expect(panel).toBeDefined()
	const event = panel.find('.alert-panel-item').last()
	expect(event.props().children).toEqual('ssh')
})