var name = GetInputConstructorValue("name", loader)
if (name["original"].length == 0) {
  Invalid(tr("header name") + " " + tr("is empty"));
  return;
};
var value = GetInputConstructorValue("value", loader);
if (value["original"].length == 0) {
  Invalid(tr("header value") + " " + tr("is empty"));
  return;
};
var internalClient = $("#internalClient").is(':checked');
try {
  var code = loader.GetAdditionalData() + _.template($("#got_setHeader_code").html())({
    name: name["updated"],
    value: value["updated"],
    internalClient: internalClient
  });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
} catch (e) {}