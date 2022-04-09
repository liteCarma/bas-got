save_cookies()!
if(<%= internalClient %>){ 
	_switch_http_client_internal()
 } else {
	_switch_http_client_main()
}
http_client_restore_cookies(JSON.stringify({cookies:JSON.parse(_result())}))
