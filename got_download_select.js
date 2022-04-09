var value = GetInputConstructorValue("value", loader);
if(value["original"].length <= 0){
	Invalid(tr("url") + " " + tr("is empty"));
	return;
};

var file = GetInputConstructorValue("file", loader);
if(file["original"].length <= 0){
	Invalid(tr("file Path") + " " + tr("is empty"));
	return;
};

var timeout = GetInputConstructorValue("timeout", loader);
if(timeout["original"].length == 0){
	Invalid(tr("timeout") + " " + tr("is empty"));
    return;
};

var attempts = GetInputConstructorValue("attempts", loader);
if(attempts["original"].length == 0){
	Invalid(tr("maximum failures") + " " + tr("is empty"));
    return;
};

var internalClient = $("#internalClient").is(':checked');
try{
	var code = loader.GetAdditionalData() + _.template($("#got_download_code").html())({
		value: value["updated"],
		file: file["updated"],
		timeout: timeout["updated"],
		attempts: attempts["updated"],
		internalClient: internalClient
	})
	code = Normalize(code, 0)
	BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
}catch(e){}