<div class="container-fluid">
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Load cookies from browser to http client.</div>
	<div class="tr tooltip-paragraph-fold">Most of sites uses cookies to store user data, like user authorisation. This means, that by storing cookies after authorisation on some site and restore them later you can implement autologin.</div>
	<div class="tr tooltip-paragraph-last-fold">If login procedure is complicated, login may be performed with browser, and everything else with http client. To do that, after login with browser use this action and authorisation state will be transfered to http client.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>