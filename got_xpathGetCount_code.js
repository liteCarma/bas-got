if(<%= internalClient %>){ 
	_switch_http_client_internal()
 } else {
	_switch_http_client_main()
}
<%= variable %> = http_client_xpath_count(<%= value %>)
