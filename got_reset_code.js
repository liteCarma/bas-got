if(<%= internalClient %>){ 
	_switch_http_client_internal()
 } else {
	_switch_http_client_main()
}
new_http_client()
