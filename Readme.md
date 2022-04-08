## "Got" this http module for Browser Automation Studio. 

##### It is inspired by the got javascript module, but of course it is greatly simplified.


This module is a simple api for working directly through the code.

##### Default options
```
  options: {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36',
    },
    redirect: true, // auto redirect
    timeout: 60000, // maximum request time
    attempts: 3,    // number of attempts in case of an error
    pause: 3000,    // timeout after error
    notEmpty: true, // empty response is an error
    status: [200],  // allowed http status code
    json: false,    // expect a response in json format and parse it immediately
  }
```
##### method GET (HEAD, DELETE, TRACE, OPTIONS)
```
  _call_function(got.get,{
    url: 'http://example.com',
    headers: {                  // optional
      'user-agent': 'test', 
    },
    method: 'GET',              // optional, default 'GET'
    redirect: true,             // optional
    attempts: 3,                // optional
    timeout: 60000,             // optional
    pause: 3000,                // optional
    notEmpty: true,             // optional
    status: [200],              // optional
    json: false,                // optional
  })!
  var res = _result_function()
```
##### method POST (PUT, PATCH)
```
  _call_function(got.get,{
    url: 'http://example.com',
    headers: {                  // optional
      'user-agent': 'test',
      'content-type': 'application/x-www-form-urlencoded' // optional, default 'application/x-www-form-urlencoded'
    },
    body: []                    
    method: 'POST',             // optional, default 'POST'
    encoding: 'UTF-8'           // optional, default 'UTF-8'
    redirect: true,             // optional
    attempts: 3,                // optional
    timeout: 60000,             // optional
    pause: 3000,                // optional
    notEmpty: true,             // optional
    status: [200],              // optional
    json: false,                // optional
  })!
  var res = _result_function()
```


<b>got.createData(contentType)</b> is an auxiliary method for creating a request body.If the query constructor is used, then the following values should be used: urlencode, json, multipart. If the raw data is used, when the suffix 'contentType/' should be added, for example: 'custom/multipart/form-data'
```
var data = got.createData(contentType)

// NOTE: the addFile and addBase64 methods are available only if the constructor is used
data.add(key, value)
data.addFile(key, value)
data.addBase64(key, value)

// NOTE: if raw data is used, then only the add(value) method is available, with only one argument, it method can be called only once
data.add(value)

data.toString()   // automatic serialization according to the specified type
data.contentType  // contentType
```
