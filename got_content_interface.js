<div class="container-fluid">
	<%= _.template($('#variable_constructor').html())({id:"save", description:tr("Variable To Save"), default_variable: "SAVED_CONTENT", help: {description: tr("This variable will contain responce text without headers after action will end.")}}) %>
	<%= _.template($('#input_constructor').html())({id:"encoding", description:tr("encoding"), default_selector: "string", disable_int:true, value_string: "auto", variants:["auto","json","utf-8","windows-1251","base64"], help: {description: tr("Encoding of responce text. This value can be 'auto', 'base64' or exact text, which contains encoding name. In 'auto' mode utf-8 encoding is assumed by default. If server specifies encoding in Content-Type header encoding, it will be used instead of utf-8. If this value will be set to excat encoding name, value in Content-Type header will be ignored. Setting exact value may be useful if encoding differs from utf-8 and server doesn't set it. 'base64' mode will return data encoded with base64. It is used if data is in binary format, like pictures, videos, etc.")}}) %> 
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Get page source of the last request of http client.</div>
	<div class="tr tooltip-paragraph-fold">Page source is the same as one, which is displayed after you hit CTRL-U in a browser.</div>
	<div class="tr tooltip-paragraph-fold">The responce doesn't contain headers, to get headers you need to use 'Get Header' action.</div>
	<div class="tr tooltip-paragraph-fold">You need to set 'base64' encoding if you are getting binary data. Many actions accept data in base64 format.</div>
	<div class="tooltip-paragraph-fold"><span class="tr">You can specify exact encoding name, see</span> <a href="#" class="tr" onclick="BrowserAutomationStudio_OpenUrl('http://doc.qt.io/qt-5/qtextcodec.html#details');return false">list of suported encodings</a>.</div>
	
  <div class="tr tooltip-paragraph-last-fold">The fastest way to extract data from page source is xpath. 'Http Client' has set of actions to perform xpath  queries. It is not recomended to use 'Content' action and regular expressions unless it is absolutely necessary.</div>
  </div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>
