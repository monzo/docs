# Errors

The Mondo API uses conventional HTTP response codes to indicate errors, and includes more detailed information on the exact nature of an error in the HTTP response.

In general, codes in the 2xx range indicate success, codes in the 4xx range indicate an error that failed given the information provided (e.g., a required parameter was omitted, a charge failed, etc.), and codes in the 5xx range indicate an error with Mondo's servers (these are rare).

##### HTTP response codes

<span class="hide">Response code</span> | <span class="hide">Meaning</span>
--------------------------------------- | ---------------------------------
`200`<br>OK|All is well.
`400`<br>Bad Request|Your request has missing arguments or is malformed.
`401`<br>Unauthorized|Your request is not authenticated.
`403`<br>Forbidden|Your request is authenticated but has insufficient permissions.
`405`<br>Method Not Allowed|You are using an incorrect HTTP verb. Double check whether it should be `POST`/`GET`/`DELETE`/etc.
`404`<br>Page Not Found|The endpoint requested does not exist.
`406`<br>Not Acceptable|Your application does not accept the content format returned according to the `Accept` headers sent in the request.
`429`<br>Too Many Requests|Your application is exceeding its rate limit. Back off, buddy. :p
`500`<br>Internal Server Error|Something is wrong on our end. Whoopsie.
`504`<br>Gateway Timeout|Something has timed out on our end. Whoopsie.

### Authentication errors

Errors pertaining to authentication are standard errors but also contain extra information to follow the OAuth specification. Specifically, they contain the `error` key with the following values:

##### `error` argument values

<span class="hide">Value</span> | <span class="hide">Meaning</span>
------------------------------- | ---------------------------------
`invalid_token`|The supplied access token is invalid or has expired.

## Handling errors

Our API libraries raise exceptions for many reasons, such as a failed charge, invalid parameters, authentication errors, and network unavailability. We recommend writing code that gracefully handles all possible API exceptions.

```python
try:
  pass
except Error, e:
  body = e.json_body
  err  = body['error']
  print "Status is: %s" % e.http_status
```