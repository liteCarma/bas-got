got = {
  options: {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    },
    redirect: true,
    attempts: 3,
    pause: 3000,
    notEmpty: true,
    status: [200],
    json: false,
  },

  headersStringify: function (headers) {
    var allHeaders = {};

    for (key in this.options.headers) {
      allHeaders[key] = this.options.headers[key];
    }

    for (key in headers) {
      allHeaders[key] = headers[key];
    }

    return Object.keys(allHeaders).map(function (k) {
      return k + ':' + allHeaders[k].toLowerCase();
    }).join('\r\n');
  },

  createData: function (contentType) {
    if (!contentType) {
      throw new Error('for method createData required argument "contentType"')
    }

    var data = {}

    Object.defineProperties(data, {
      contentType: {
        enumerable: false,
        value: contentType
      },
      add: {
        enumerable: false,
        value: function (name, value, contentType) {
          var contentType = contentType || 'application/octet-stream';
          if (this.contentType === 'multipart/form-data') {
            this[name] = 'Content-Disposition: form-data; name=' + name + ';' +
              '\r\n\r\n' + value
          } else {
            this[name] = value;
          }
        }
      },
      addFile: {
        enumerable: false,
        value: function (name, file, filename, contentType) {
          var filename = filename || name;
          var contentType = contentType || 'application/octet-stream';
          if (this.contentType === 'multipart/form-data') {
            this[name] = 'Content-Disposition: form-data; name=' + name + '; filename=' + filename +
              '\r\nContent-Type: ' + contentType +
              '\r\n\r\n' + file
          } else {
            this[name] = file;
          }
        }
      },
      addBase64: {
        enumerable: false,
        value: function (name, base64, filename, contentType) {
          var filename = filename || name;
          var contentType = contentType || 'application/octet-stream';
          if (this.contentType === 'multipart/form-data') {
            this[name] = 'Content-Disposition: form-data; name=' + name + '; filename=' + filename +
              '\r\nContent-Type: ' + contentType +
              '\r\n\r\n_browserautomationstudio_base64:' + base64;
          } else {
            this[name] = base64;
          }
        }
      },
      toString: {
        enumerable: false,
        value: function (key, base64) {
          var result = '';
          var boundary = rand(20)
          for (key in this) {
            var value = this[key];
            switch (this.contentType) {
              case ('application/json'): {
                return JSON.stringify(this);
              }
              case ('multipart/form-data'): {
                result += '--' + boundary + '\r\n';
                result += value + '\r\n';
                break;
              }
              case ('application/x-www-form-urlencoded'):
              default: {
                if (result!== '') {
                  result += '&';
                }
                result += key + '=' + encodeURIComponent(value);
              }
            }

          }

          if (this.contentType === 'multipart/form-data') {
            result += '--' + boundary + '--';
          };
          return result;
        }
      },
    })
    return data
  },

  get: function () {
    var _default = got.options;
    _url = _function_argument('url');
    _method = _function_argument('method') || 'GET';
    _headers = _function_argument('headers') || {};
    _redirect = _function_argument('redirect') || _default.redirect;
    _attempts = _function_argument('attempts') || _default.attempts;
    _pause = _function_argument('pause') || _default.pause;
    _status = _function_argument('status') || _default.status;
    _notEmpty = _function_argument('notEmpty') || _default.notEmpty;
    _json = _function_argument('json') || _default.json;

    _do(function () {
      _if(_iterator() > _attempts, function () {
          fail_user("got error: " + VAR_LAST_ERROR)
        })!

        _call(function () {
          _on_fail(function () {
            VAR_LAST_ERROR = _result()
            VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
            VAR_WAS_ERROR = false
            _break(1, true)
          })

          _if_else(_redirect, function () {
              http_client_get2(_url, {
                method: _method.toUpperCase(),
                headers: got.headersStringify(_headers)
              })!
            }, function () {
              http_client_get_no_redirect2(_url, {
                method: _method.toUpperCase(),
                headers: got.headersStringify(_headers)
              })!
            })!

            var data = http_client_encoded_content("auto")

          if (_notEmpty &&!data.trim()) {
            fail_user(_url + ' empty response')
          }
          if (_json) {
            data = JSON.parse(data);
          }

          var status = http_client_status()
          if (_status.indexOf(status) < 0) {
            fail_user(_url + ' http status: ' + status)
          }
          _function_return(data)
        }, null)!

        sleep(_pause)!
    })!
  },

  post: function () {
    var _default = got.options;
    _url = _function_argument('url');
    _method = _function_argument('method') || 'POST';
    _headers = _function_argument('headers') || {};
    _redirect = _function_argument('redirect') || _default.redirect;
    _body = _function_argument('body') || '';
    _attempts = _function_argument('attempts') || _default.attempts;
    _pause = _function_argument('pause') || _default.pause;
    _status = _function_argument('status') || _default.status;
    _notEmpty = _function_argument('notEmpty') || _default.notEmpty;
    _json = _function_argument('json') || _default.json;

    _do(function () {
      _if(_iterator() > _attempts, function () {
          fail_user("got error: " + VAR_LAST_ERROR)
        })!

        _call(function () {
          _on_fail(function () {
            VAR_LAST_ERROR = _result()
            VAR_ERROR_ID = ScriptWorker.GetCurrentAction()
            VAR_WAS_ERROR = false
            _break(1, true)
          })

          _contentType = _headers['content-type'] || _headers['Content-Type'] || 'application/x-www-form-urlencoded';
          delete _headers['content-type'];
          delete _headers['Content-Type'];
          _if_else(_redirect, function () {
              http_client_post(_url, ["data", _body.toString()], {
                "content-type": "custom/" + _contentType,
                encoding: "UTF-8",
                method: _method.toUpperCase(),
                headers: got.headersStringify(_headers)
              })!
            }, function () {
              http_client_post_no_redirect(_url, ["data", _body.toString()], {
                "content-type": "custom/" + _contentType,
                encoding: "UTF-8",
                method: _method.toUpperCase(),
                headers: got.headersStringify(_headers)
              })!
            })!

            var data = http_client_encoded_content("auto")

          if (_notEmpty &&!data.trim()) {
            fail_user(_url + ' empty response')
          }

          if (_json) {
            data = JSON.parse(data);
          }


          var status = http_client_status()
          if (_status.indexOf(status) < 0) {
            fail_user(_url + ' http status: ' + status)
          }

          _function_return(data)
        }, null)!

        sleep(_pause)!
    })!
  }
} 