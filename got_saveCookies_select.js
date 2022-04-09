var save = this.$el.find("#save").val().toUpperCase();
if (save.length == 0) {
  Invalid(tr("the variable to which the result is saved is missing"));
  return;
};
var internalClient = $("#internalClient").is(':checked');
try {
  var code = loader.GetAdditionalData() + _.template($("#got_saveCookies_code").html())({
    variable: "VAR_" + save,
    internalClient: internalClient
  });
  code = Normalize(code, 0);
  BrowserAutomationStudio_Append("", BrowserAutomationStudio_SaveControls() + code, action, DisableIfAdd);
} catch (e) {}