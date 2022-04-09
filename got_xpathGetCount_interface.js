<div class="container-fluid">
	<%= _.template($('#input_constructor').html())({id:"value", description:tr("Xpath Query"), default_selector: "string", disable_int:true,variants: ["//title<br/><span style='color:gray;font-size:small'>" + tr("Get page title") + "</span>","//a<br/><span style='color:gray;font-size:small'>" + tr("Get all links") + "</span>","//img<br/><span style='color:gray;font-size:small'>" + tr("Find image") + "</span>","//img/@src<br/><span style='color:gray;font-size:small'>" + tr("Find image source") + "</span>","//*[@id='ID']<br/><span style='color:gray;font-size:small'>" + tr("Find element by id") + "</span>","//*[contains(@class,'CLASS')]<br/><span style='color:gray;font-size:small'>" + tr("Find element by class") + "</span>","//*[contains(@class,'CLASS') and @id='ID']<br/><span style='color:gray;font-size:small'>" + tr("Find element by class and id") + "</span>","//div[@id='ID_PARENT']/div[@id='ID_CHILD']<br/><span style='color:gray;font-size:small'>" + tr("Find element which contains parent") + "</span>"], help: {description: tr("Xpath query"), examples:[{code:"//title",description:tr("Get page title.")},{code:"//a",description:tr("Get all links.")},{code:"//img",description:tr("Find image.")},{code:"//img/@src",description:tr("Find image source(image url).")},{code:"//*[@id='ID']",description:tr("Find element by id.")},{code:"//*[contains(@class,'CLASS')]",description:tr("Find element by class. Element can have several classes, so need to use contains function.")},{code:"//*[contains(@class,'CLASS') and @id='ID']",description:tr("Find element by class and id.")},{code:"//div[@id='ID_PARENT']/div[@id='ID_CHILD']",description:tr("Find element which contains parent.")}]}}) %>
	<%= _.template($('#variable_constructor').html())({id:"save", description:tr("Variable To Save"), default_variable: "XPATH_COUNT", help: {description: tr("This variable will be set to number of elements matching query."), examples:[{code:"0",description:tr("There are no elements which matches query.")},{code:"3",description:tr("There are 3 elements which matches query.")}]}}) %>
  <div class="col-xs-12">
    <span data-preserve="true" data-preserve-type="check" data-preserve-id="internalClient">
      <input type="checkbox" id="internalClient"/> <label for="internalClient" class="tr">Internal client</label>
    </span>
  </div>
</div>
<div class="tooltipinternal">
	<div class="tr tooltip-paragraph-first-fold">Execute xpath query and get number of element which matches.</div>
	<div class="tr tooltip-paragraph-fold">Html to apply query is obtained from last http responce.</div>
	<div class="tr tooltip-paragraph-last-fold">If you want to apply xpath query to custom string, you need to use 'Xpath' module.</div>
</div>
<%= _.template($('#back').html())({action:"executeandadd", visible:true}) %>