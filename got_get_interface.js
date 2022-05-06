<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"url", description:tr("Url"), default_selector: "string", disable_int:true, help: {description: tr("Request url"), examples:[{code:"https://google.com",description:tr("Url with scheme")},{code:"google.com",description:tr("Url without scheme")},{code:"https://www.google.com/search?q=cats",description:tr("Url with query string")},{code:"https://www.google.com/search?q=%D0%BA%D0%BE%D1%82%D1%8B",description:tr("Url with encoded query. To encode string use encodeURIComponent function.")}]}}) %>
	<%= _.template($('#input_constructor').html())({id:"headers", description:tr("Headers, for example:\nUser-Agent: Mozilla/5.0 Gecko/20100101 Firefox/57.0\nReferer: google.com"), default_selector: "string", disable_int:true, disable_editor:true, disable_expression:true, use_textarea:true, replace_linebreaks: true, size: 8, disable_type_chooser:true,textarea_height:80}) %>

  <div class="col-xs-12">
    <hr style="margin-top:5px;margin-bottom:5px"/>
    <span class="tr" style="margin-left:15px;">Additional Parameters</span>:
    <hr style="margin-top:5px;margin-bottom:5px"/>
	</div>

	<%= _.template($('#input_constructor').html())({id:"method", description:tr("Method"), default_selector: "string", disable_int:true, value_string: "GET", variants:["GET","HEAD","DELETE","TRACE","OPTIONS"], size:3, help: {description: tr("Request method, you can put any string here.")}}) %>
	<%= _.template($('#input_constructor').html())({id:"timeout", description:tr("Timeout (seconds)"), default_selector: "int", disable_string:true, value_number: 60, min_number:1, max_number:999999, help: {description: tr("Maximum request execution time.")} }) %>
	<%= _.template($('#input_constructor').html())({id:"attempts", description:tr("Maximum failures"), default_selector: "int", disable_string:true, value_number: 3, min_number:1, max_number:999999, help: {description: tr("The maximum number of failed requests after which the action will be completed with an error.")} }) %>
  <%= _.template($('#input_constructor').html())({id:"pause", description:tr("Pause after an unsuccessful request (seconds)"), default_selector: "int", disable_string:true, value_number: 1, min_number:1, max_number:999999, help: {description: tr("Pause after an unsuccessful request (seconds)")} }) %>
  <%= _.template($('#input_constructor').html())({id:"statusAllow", description:tr("Allowed http status codes"), default_selector: "string", disable_int:true, value_string: "200, 201, 301, 302, 400, 403, 429", help: {description: tr("Allowed http status codes"), examples:[{code:"200,429,403"},{code:"200"}]}}) %>

	<div class="col-xs-12">
    <div data-preserve="true" data-preserve-type="check" data-preserve-id="redirect">
      <input type="checkbox" id="redirect" checked="checked"/> <label for="redirect" class="tr">Follow redirects</label>
    </div>
    <div data-preserve="true" data-preserve-type="check" data-preserve-id="notEmpty">
      <input type="checkbox" id="notEmpty" checked="checked"/> <label for="notEmpty" class="tr">Empty response is an error</label>
    </div>
    <div data-preserve="true" data-preserve-type="check" data-preserve-id="isJson">
      <input type="checkbox" id="isJson"/> <label for="isJson" class="tr">Expect a response in json format</label>
    </div>
    <div data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
		  <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Use internal client</label>
	  </div>
	</div>
</div>

<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Make http request using GET, HEAD, DELETE, TRACE or OPTIONS method,  
i.e. methods which don't send data.</div>
	<div class="tr tooltip-paragraph-fold">Special characters and non-latin query parts must be encoded with encodeURIComponent function. For example, instead of using https://www.google.com/search?q=коты, url must be https://www.google.com/search?q=%D0%BA%D0%BE%D1%82%D1%8B</div>
	<div class="tooltip-paragraph-fold"><span class="tr">If 'Record HTTP request' mode is enabled, then every request that browser does will be converted to actions using http client and added to scenario tab</span> ( <a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('https://wiki.bablosoft.com/lib/exe/fetch.php?cache=&media=recordhttprequests.png');return false">screen</a> ).</div>
	<div class="tr tooltip-paragraph-fold">HTTP headers(like User-Agent) can be specified in this action with 'Headers' parameter or with 'HTTP-Client Set Header' action. In first case headers will be modified only for current action, in second case headers will be modified for all following actions.</div>
	<div class="tr tooltip-paragraph-fold">By default http client will follow redirects. If you want, you can disable that behavior and process Location header yourself. To get responce header, use 'Get Header' action after request.</div>
	<div class="tr tooltip-paragraph-fold">'Get' action will not set any variable, to obtain responce you need to call 'Current Url', 'Content', 'Status' or 'Get Header' after request is performed.</div>
	<div class="tr tooltip-paragraph-fold">'Current Url' will get actual url after all redirects.</div>
	<div class="tr tooltip-paragraph-fold">'Content' will return page html.</div>
	<div class="tr tooltip-paragraph-fold">'Status' returns HTTP status, for example, 200 - if request is performed correctly, 500 - in case of server error, etc.</div>
	<div class="tr tooltip-paragraph-fold">'Get Header' returns responce header, like 'Content-Type', 'Date', 'Set-Cookie'</div>
	<div class="tr tooltip-paragraph-fold">HTTP client handles cookies automatically, so normally you don't need to process 'Set-Cookie' header.</div>
	<div class="tr tooltip-paragraph-fold">The fastest way to extract data from page source is xpath. 'Http Client' has set of actions to perform xpath queries. It is not recomended to use 'Content' action and regular expressions unless it is absolutely necessary.</div>
	<div class="tr tooltip-paragraph-fold">If server returns json data, use JSON.parse function to parse it.</div>

	<div class="tr tooltip-paragraph-last-fold">You can set max page loading time by clicking on hourglass icon near cancel button.</div>

</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true, wiki:"how_to_make_get_request"}) %>