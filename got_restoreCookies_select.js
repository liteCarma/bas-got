var value = GetInputConstructorValue("value", loader);
var internalClient = $("#internalClient").is(':checked');
try{
    var code = loader.GetAdditionalData() + _.template($("#got_restoreCookies_code").html())({
      value: value["updated"],
		  internalClient: internalClient
    });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}