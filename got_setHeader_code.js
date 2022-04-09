if(<%= internalClient %>){ 
	_switch_http_client_internal()
 } else {
	_switch_http_client_main()
}
http_client_set_header(<%= name %>, <%= value %>)
