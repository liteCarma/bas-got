##"Got" this http module for Browser Automation Studio. 

#####It is inspired by the got javascript module, but of course it is greatly simplified.


This module is a simple api for working directly through the code.

#####Default options
```
  options: {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    },
    redirect: true, // auto redirect
    attempts: 3,    // number of attempts in case of an error
    pause: 3000,    // timeout after error
    notEmpty: true, // empty response is an error
    status: [200],  // allowed http status code
    json: false,    // expect a response in json format and parse it immediately
  }
```
#####method GET (HEAD, DELETE, TRACE, OPTIONS)
```
  _call_function(got.get,{
    url: 'http://example.com',
    headers: {                  // optional
      'user-agent': 'test', 
    },
    method: 'GET',              // optional, default 'GET'
    redirect: true,             // optional
    attempts: 3,                // optional
    pause: 3000,                // optional
    notEmpty: true,             // optional
    status: [200],              // optional
    json: false,                // optional
  })!
  var res = _result_function()
```
#####method POST (PUT, PATCH)
```
  _call_function(got.get,{
    url: 'http://example.com',
    headers: {                  // optional
      'user-agent': 'test',
      'content-type': 'application/x-www-form-urlencoded' // optional, default 'application/x-www-form-urlencoded'
    },
    body: ''                    // string or data type object
    method: 'POST',             // optional, default 'POST'
    redirect: true,             // optional
    attempts: 3,                // optional
    pause: 3000,                // optional
    notEmpty: true,             // optional
    status: [200],              // optional
    json: false,                // optional
  })!
  var res = _result_function()
```

#####method got.createData

createData is an auxiliary method for creating a request body.
```
var data = got.createData(contentType)
data.add('key', 'value', contentType)
data.addFile('key', 'value', filename, contentType)
data.addBase64('key', 'value', filename, contentType)
data.toString()   // automatic serialization according to the specified type
data.contentType  // contentType
```
+ contentType - 'multipart/form-data', 'application/x-www-form-urlencoded', 'application/json'
+ Methods  addFile, addBase64 makes sense only for 'multipart/form-data'
+ filename - optional, default is equal to the key
+ contentType - optional, default is equal to the 'application/octet-stream'