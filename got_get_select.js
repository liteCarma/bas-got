var url = GetInputConstructorValue("url", loader);
if (url["original"].length == 0) {
  Invalid(tr("url") + " " + tr("is empty"));
  return;
};

var method = GetInputConstructorValue("method", loader);
if (method["original"].length == 0) {
  Invalid(tr("method") + " " + tr("is empty"));
  return;
};

var headers = GetInputConstructorValue("headers", loader);

var timeout = GetInputConstructorValue("timeout", loader);
if (timeout["original"].length == 0) {
  Invalid(tr("timeout") + " " + tr("is empty"));
  return;
};

var attempts = GetInputConstructorValue("attempts", loader);
if (attempts["original"].length == 0) {
  Invalid(tr("maximum failures") + " " + tr("is empty"));
  return;
};

var pause = GetInputConstructorValue("pause", loader);
if (pause["original"].length == 0) {
  Invalid(tr("pause") + " " + tr("is empty"));
  return;
};

var statusAllow = GetInputConstructorValue("statusAllow", loader);
if (statusAllow["original"].length == 0) {
  Invalid(tr("allowed http status codes") + " " + tr("is empty"));
  return;
};

var redirect = $("#redirect").is(':checked');
var notEmpty = $("#notEmpty").is(':checked');
var isJson = $("#isJson").is(':checked');
var internalClient = $("#internalClient").is(':checked');

try {
  var code = loader.GetAdditionalData() + _.template($("#got_get_code").html())({
    url: url["updated"],
    headers: headers["updated"],
    method: method["updated"],
    attempts: attempts["updated"],
    redirect: redirect,
    statusAllow: statusAllow["updated"],
    pause: pause["updated"],
    timeout: timeout["updated"],
    notEmpty: notEmpty,
    isJson: isJson,
    internalClient: internalClient
  })
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
} catch (e) {}