var internalClient = $("#internalClient").is(':checked');
try{
    var code = loader.GetAdditionalData() + _.template($("#got_reset_code").html())({
		  internalClient: internalClient
    });
    code = Normalize(code, 0);
    BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}