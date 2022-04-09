<div class="container-fluid">
	<%= _.template($('#variable_constructor').html())({id:"save", description:tr("Variable To Save"), default_variable: "SAVED_URL", help: {description: tr("This variable will contain current url for http client after action will end.")}}) %>
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Get current url of http client.</div>
	<div class="tr tooltip-paragraph-last-fold">Url may differ from last url used in 'GET' or 'POST' if there was redirects.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>