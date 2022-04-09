<div class="container-fluid">
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">This action will reset http client and all its settings.</div>
	<div class="tr tooltip-paragraph-fold">Use 'HTTP-Client Restore Cookies' action with empty value if you want to reset only cookies.</div>
	
	<div class="tr tooltip-paragraph-last-fold">It affect every setting and state that http client has: proxy, headers, content, status, cookies, etc.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>