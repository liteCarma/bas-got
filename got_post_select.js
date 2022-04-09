var url = GetInputConstructorValue("url", loader);
if (url["original"].length == 0) {
  Invalid(tr("url") + " " + tr("is empty"));
  return;
};

var encoding = GetInputConstructorValue("encoding", loader);
if (encoding["original"].length <= 0) {
  Invalid(tr("encoding") + " " + tr("is empty"));
  return;
};

var method = GetInputConstructorValue("method", loader);
if (method["original"].length <= 0) {
  Invalid(tr("method") + " " + tr("is empty"));
  return;
};

var contentType = GetInputConstructorValue("contentType", loader);
if (contentType["original"].length <= 0) {
  Invalid(tr("contentType") + " " + tr("is empty"));
  return;
};

var postDataArray = GetInputConstructorValue("PostDataArray", loader);
var headers = GetInputConstructorValue("headers", loader);
var postDataRaw = GetInputConstructorValue("postDataRaw", loader);
var contentTypeRaw = GetInputConstructorValue("contentTypeRaw", loader);

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

var useConstructor = $("#useConstructor").is(':checked');
var redirect = $("#redirect").is(':checked');
var notEmpty = $("#notEmpty").is(':checked');
var isJson = $("#isJson").is(':checked');
var internalClient = $("#internalClient").is(':checked');

try {
  var code = loader.GetAdditionalData() + _.template($("#got_post_code").html())({
    url: url["updated"],
    contentType: contentType["updated"],
    encoding: encoding["updated"],
    method: method["updated"],
    useConstructor: useConstructor,
    postDataRaw: postDataRaw["updated"].replace(/base64:/g, "_browserautomationstudio_base64:"),
    contentTypeRaw: contentTypeRaw["updated"],
    params: "[" + postDataArray["updated"] + "]",
    headers: headers["updated"],
    redirect: redirect,
    attempts: attempts["updated"],
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