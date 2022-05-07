//------------API-------------
got = {
  options: {
    headers: {},
    redirect: true,
    attempts: 3,
    timeout: 60000,
    pause: 3000,
    notEmpty: true,
    status: [200],
    json: false,
  },

  headersStringify: function (headers, isConstructor) {
    var allHeaders = {};

    for (key in this.options.headers) {
      allHeaders[key.toLowerCase()] = this.options.headers[key];
    }

    if (typeof headers === 'string') {
      var h = {};
      headers.trim().split(/\r?\n/).forEach(function (row) {
        var p = row.split(':')
        var name = p[0].trim();
        var value = p.slice(1).join(':').trim();
        h[name] = value;
      })

      if (isConstructor) {
        delete h['content-type'];
        delete h['Content-Type'];
      }

      headers = h;
    }

    for (key in headers) {
      allHeaders[key.toLowerCase()] = headers[key];
    }

    return Object.keys(allHeaders).map(function (k) {
      return k + ':' + allHeaders[k];
    }).join('\r\n');
  },

  normalizeURL: function (url) {
    return url.replace(/https?:\/\/[^/]+$/, function(match){
      return match + '/';
    })
  },

  getValueContent: function (value) {
    if (typeof value === 'string' && value.indexOf('file://') >= 0) {
      return native("filesystem", "readfile", JSON.stringify({
        value: value.split('file://')[1],
        base64: false,
        from: 0,
        to: 0
      }))
    }
    if (typeof value === 'string' && value.indexOf('base64://') >= 0) {
      return base64_decode(value.split('base64://')[1])
    }
    return value
  },

  createData: function (contentType) {
    if (!contentType) {
      throw new Error('for method createData required argument "contentType"')
    }

    var isConstructor = contentType.indexOf('custom/') < 0
    var data = isConstructor ? [] : ['data'];

    Object.defineProperties(data, {
      contentType: {
        enumerable: false,
        value: contentType
      },
      isConstructor: {
        enumerable: false,
        value: isConstructor
      },
      add: {
        enumerable: false,
        value: function (name, value) {
          var contentType = contentType || 'application/octet-stream';
          if (this.isConstructor) {
            this.push(name, value);
          } else {
            if (this.length > 1) {
              fail_user('You cannot add more than 1 item to a container with the RAW content type');
            }
            this.push(name)
          }
        }
      },
      addFile: {
        enumerable: false,
        value: function (name, value) {
          if (this.isConstructor) {
            if (this.contentType === 'json') {
              this.push(name, got.getValueContent('file://' + value));
            } else {
              this.push(name, 'file://' + value);
            }
          } else {
            fail_user('Forbidden for a container with the RAW content type');
          }
        }
      },
      addBase64: {
        enumerable: false,
        value: function (name, value) {
          if (this.isConstructor) {
            if (this.contentType === 'json') {
              this.push(name, got.getValueContent('base64://' + value));
            } else {
              this.push(name, 'base64://' + value);
            }
          } else {
            fail_user('Forbidden for a container with the RAW content type');
          }
        }
      },
      toString: {
        enumerable: false,
        value: function () {
          if (this.isConstructor) {
            if (this.contentType.indexOf('json') >= 0) {
              var json = {}
              for (i = 0; i < this.length; i += 2) {
                var name = this[i];
                var value = this[i + 1];
                json[name] = got.getValueContent(value);
              }
              return JSON.stringify(json)
            }

            if (this.contentType.indexOf('urlencode') >= 0) {
              var str = '';
              for (i = 0; i < this.length; i += 2) {
                var name = this[i];
                var value = this[i + 1];
                if (str!== '') str += '&';
                str += name + '=' + encodeURIComponent(got.getValueContent(value));
              }
              return str
            }

            if (this.contentType.indexOf('multipart') >= 0) {
              var str = '';
              var boundary = rand(20);
              for (i = 0; i < this.length; i += 2) {
                var name = this[i];
                var value = this[i + 1];
                str += '--' + boundary + '\r\n';
                str += 'Content-Disposition: form-data; name="' + name + '";'

                if (typeof value === 'string' && value.indexOf('file://') >= 0) {
                  var filename = value.split(/[/\\]/).pop()
                  str += 'filename="' + filename + '"\r\nContent-Type: application/octet-stream';
                }
                if (typeof value === 'string' && value.indexOf('base64://') >= 0) {
                  str += 'Content-Disposition: form-data; name="' + name + '"; filename="file.jpg"\r\nContent-Type: image/jpeg';
                }

                str += '\r\n\r\n'
                str += got.getValueContent(value) + '\r\n';
              }
              return str + '--' + boundary + '--';
            }
          } else {
            if (this.contentType.indexOf('json') >= 0) {
              return typeof this[1] === 'string' ? this[1] : JSON.stringify(this[1])
            } else {
              return this[1];
            }
          }
        }
      },
    })
    return data
  },

  get: function () {
    var options = got.options;
    var url = _function_argument('url');
    var method = _function_argument('method') || 'GET';
    var headers = _function_argument('headers') || {};
    var redirect = _function_argument('redirect') || options.redirect;
    var attempts = _function_argument('attempts') || options.attempts;
    var timeout = _function_argument('timeout') || options.timeout;
    var pause = _function_argument('pause') || options.pause;
    var statusAllow = _function_argument('status') || options.status;
    var notEmpty = _function_argument('notEmpty');
    notEmpty = notEmpty != null ? notEmpty : options.notEmpty;
    var json = _function_argument('json') || options.json;

    url = got.normalizeURL(url);
    headers = got.headersStringify(headers);

    VAR_LAST_ERROR = ''
    _do(function () {
        _call(function () {
          _on_fail(function () {
            VAR_LAST_ERROR = _result()
            VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
            VAR_WAS_ERROR = false
            _break(1, true)
          })

          _if_else(redirect, function () {
              general_timeout_next(timeout);
              http_client_get2(url, {
                method: method.toUpperCase(),
                headers: headers
              })!
            }, function () {
              general_timeout_next(timeout);
              http_client_get_noredirect2(url, {
                method: method.toUpperCase(),
                headers: headers
              })!
            })!

            var data = http_client_encoded_content("auto")

          if (notEmpty &&!data.trim()) {
            VAR_LAST_ERROR = url + ' empty response'
            _next("function")
          }

          if (json) {
            try {
              data = JSON.parse(data);
            } catch(e) {
              VAR_LAST_ERROR = e
              _next("function")
            }
          }

          var status = http_client_status()
          if (statusAllow.indexOf(status) < 0) {
            VAR_LAST_ERROR = url + ' bad http status'
            _next("function")
          }
          _function_return(data)
        }, null)!

        _if(_iterator() >= attempts, function () {
          fail_user("got error: " + VAR_LAST_ERROR)
        })!

        sleep(pause)!
    })!
  },

  post: function () {
    var options = got.options;
    var url = _function_argument('url');
    var method = _function_argument('method') || 'POST';
    var encoding = _function_argument('encoding') || 'UTF-8';
    var headers = _function_argument('headers') || options.headers;
    var body = _function_argument('body') || [];
    var contentType = _function_argument('contentType') || 'urlencode';
    var redirect = _function_argument('redirect') || options.redirect;
    var attempts = _function_argument('attempts') || options.attempts;
    var timeout = _function_argument('timeout') || options.timeout;
    var pause = _function_argument('pause') || options.pause;
    var statusAllow = _function_argument('status') || options.status;
    var notEmpty = _function_argument('notEmpty');
    notEmpty = notEmpty != null ? notEmpty : options.notEmpty;
    var json = _function_argument('json') || options.json;

    var isConstructor = contentType.indexOf('custom/') < 0;
    url = got.normalizeURL(url);
    headers = got.headersStringify(headers, isConstructor);

    if (!isConstructor) {
      contentType = 'custom/' + contentType
    }

    VAR_LAST_ERROR = ''
    _do(function () {
      _if(_iterator() > attempts, function () {
          fail_user("got error: " + VAR_LAST_ERROR)
        })!

        _call(function () {
          _on_fail(function () {
            VAR_LAST_ERROR = _result()
            VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
            VAR_WAS_ERROR = false
            _break(1, true)
          })

          _if_else(redirect, function () {
              general_timeout_next(timeout);
              http_client_post(url, body, {
                'content-type': contentType,
                encoding: encoding,
                method: method.toUpperCase(),
                headers: headers
              })!
            }, function () {
              general_timeout_next(timeout);
              http_client_post_no_redirect(url, body, {
                'content-type': contentType,
                encoding: encoding,
                method: method.toUpperCase(),
                headers: headers
              })!
            })!

            var data = http_client_encoded_content("auto")

          if (notEmpty && !data.trim()) {
            VAR_LAST_ERROR = url + ' empty response'
            _next("function")
          }
          if (json) {
            try {
              data = JSON.parse(data);
            } catch(e) {
              VAR_LAST_ERROR = e
              _next("function")
            }
          }

          var status = http_client_status()
          if (statusAllow.indexOf(status) < 0) {
            VAR_LAST_ERROR = url + ' bad http status'
            _next("function")
          }

          _function_return(data)
        }, null)!

        _if(_iterator() >= attempts, function () {
          fail_user("got error: " + VAR_LAST_ERROR)
        })!

        sleep(pause)!
    })!
  }
}

//-------------GUI---------------
gotGUI = {}
gotGUI.post = function() {useConstructor
  var useConstructor = _function_argument('useConstructor');
  var url = _function_argument('url');
  var headers = _function_argument('headers');
  var params = _function_argument('params');
  var postDataRaw = _function_argument('postDataRaw');
  var contentType = _function_argument('contentType');
  var contentTypeRaw = _function_argument('contentTypeRaw');
  var method = _function_argument('method');
  var encoding = _function_argument('encoding');
  var redirect = _function_argument('redirect');
  var timeout = _function_argument('timeout');
  var attempts = _function_argument('attempts');
  var pause = _function_argument('pause');
  var status = _function_argument('statusAllow').split(',').map(function(s){
    return +s.trim()
  });
  var notEmpty = _function_argument('notEmpty');
  var json = _function_argument('json');
  var internalClient = _function_argument('internalClient');

  gotGUI.switchClient(internalClient);

  if(useConstructor){ 
    var body = got.createData(contentType);
    var params = params;
    for(i = 0; i <  params.length; i +=2) {
      var name = params[i]
      var value = params[i+1];
      if (typeof value === 'string' && value.indexOf('file://') > -1) {
        body.addFile(name, value.split('file://').pop());
      } else if (typeof value === 'string' && value.indexOf('base64://') > -1) {
        body.addBase64(name, value.split('base64://').pop());
      } else {
        body.add(name, value);
      }
    }
  } else {
    contentType = 'custom/' + contentTypeRaw
    var body = got.createData(contentType);
    body.add(postDataRaw);
  }

  _call_function(got.post, {
    url: url,
    headers: headers,
    body: body,
    contentType: contentType,
    method: method,
    encoding: encoding,
    redirect: redirect,
    timeout: timeout * 1000,
    attempts: attempts,
    pause: pause * 1000,
    status: status,
    notEmpty: notEmpty,
    json: json
  })!
}

gotGUI.get = function() {
  var url = _function_argument('url');
  var headers = _function_argument('headers');
  var method = _function_argument('method');
  var redirect = _function_argument('redirect');
  var timeout = _function_argument('timeout');
  var attempts = _function_argument('attempts');
  var pause = _function_argument('pause');
  var status = _function_argument('statusAllow').split(',').map(function(s){
    return +s.trim()
  });
  var notEmpty = _function_argument('notEmpty');
  var json = _function_argument('json');
  var internalClient = _function_argument('internalClient');

  gotGUI.switchClient(internalClient);

  _call_function(got.get, {
    url: url,
    headers: headers,
    method: method,
    redirect: redirect,
    timeout: timeout * 1000,
    attempts: attempts,
    pause: pause * 1000,
    status: status,
    notEmpty: notEmpty,
    json: json
  })!
}

gotGUI.switchClient = function (internalClient){
  if(internalClient) {
    _switch_http_client_internal()
  } else {
    _switch_http_client_main()
  }
}

gotGUI.setProxy = function (proxyString, proxyType, proxyLogin, proxyPassword, internalClient){
  gotGUI.switchClient(internalClient);

	var proxy = proxy_parse(proxyString);
	if(proxyType!="auto"){
		proxy["IsHttp"] = proxyType=="http";
	};
	var login = proxyLogin;
	var password = proxyPassword;
	if(login.length > 0 && password.length > 0){
		proxy["name"] = login;
		proxy["password"] = password;
	};
	
	http_client_set_proxy(proxy["server"], proxy["Port"], proxy["IsHttp"], proxy["name"], proxy["password"]);
};

gotGUI.getContent = function(encoding, internalClient){
	gotGUI.switchClient(internalClient);

	if(encoding=="json"){
		return JSON.parse(http_client_encoded_content("auto"));
	}else{
		return http_client_encoded_content(encoding);
	};
};

gotGUI.download = function(){
	var value = _function_argument("value");
	var file = _function_argument("file");
	var timeout = _function_argument("timeout")*1000;
	var attempts = _function_argument("attempts");
	var internalClient = _function_argument("internalClient");
	
	gotGUI.switchClient(internalClient);
	
	_do(function(){
		_call(function(){
			_on_fail(function(){
				VAR_LAST_ERROR = _result();
				VAR_ERROR_ID = ScriptWorker.GetCurrentAction();
				VAR_WAS_ERROR = false;
				_break(1,true);
			});
			CYCLES.Current().RemoveLabel("function")
			general_timeout_next(timeout);
			http_client_download(value, file)!
      _break('function')
		},null)!
		
    if(_iterator() >= attempts){
      fail_user(VAR_LAST_ERROR)
    }

		sleep(1000)!
	})!
};