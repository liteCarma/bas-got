<div class="container-fluid">
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Clear all requests headers which was set with 'HTTP-Client Set Header' action.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>