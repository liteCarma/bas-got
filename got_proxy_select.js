var proxyString = GetInputConstructorValue("proxyString", loader);

var proxyType = GetInputConstructorValue("proxyType", loader);
if (proxyType["original"].length == 0) {
  Invalid(tr("proxy Type") + " " + tr("is empty"));
  return;
};

var proxyLogin = GetInputConstructorValue("proxyLogin", loader);
var proxyPassword = GetInputConstructorValue("proxyPassword", loader);
var internalClient = $("#internalClient").is(':checked');

try {
  var code = loader.GetAdditionalData() + _.template($("#got_proxy_code").html())({
    proxyString: proxyString["updated"],
    proxyType: proxyType["updated"],
    proxyLogin: proxyLogin["updated"],
    proxyPassword: proxyPassword["updated"],
    internalClient: internalClient
  });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
} catch (e) {}