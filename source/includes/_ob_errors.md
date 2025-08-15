# Open Banking Errors

<aside class="notice">
    Currently this new error behaviour is only available in our sandbox environment with a production release to be scheduled at a later date. 
</aside>

Our Open Banking APIs return errors in line with the [Open Banking specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/read-write-data-api-profile.html#error-response-structure).

## OBErrorResponse1

| Name    | Type         | Description                                                                                            | Monzo Use                                          |
| ------- | ------------ | ------------------------------------------------------------------------------------------------------ | -------------------------------------------------- |
| Code    | Max40Text    | High level textual error code, to help categorise the errors.                                          | Custom error code with a format of `<prefix.type>` |
| Id      | Max40Text    | A unique reference for the error instance, for audit purposes, in case of unknown/unclassified errors. | Internal trace identifier                          |
| Message | Max500Text   | Brief Error message, e.g., 'There is something wrong with the request parameters provided'             | High level human readable category message         |
| Errors  | `[]OBError1` |                                                                                                        | Array with one `OBError1` element                  |

## OBError1

| Name      | Type                        | Description                                                                                                                                                               | Monzo Use                                                             |
| --------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ErrorCode | `OBErrorResponseError1Code` | Low level textual error code, e.g., UK.OBIE.Field.Missing                                                                                                                 | OBIE error code (`UK.OBIE.XYZ`) or custom error code (`UK.MONZO.XYZ`) |
| Message   | Max500Text                  | A description of the error that occurred. e.g., 'A mandatory field isn't supplied' or 'RequestedExecutionDateTime must be in future'. OBIE doesn't standardise this field | Human readable message that details the cause of the error            |

A full list of `OBErrorResponseError1Code` can be found [here](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/references/namespaced-enumerations.html#oberrorresponseerror1code).

<aside class="notice">
We've chosen not to implement the `Path` or `Url` properties of `OBError1`
</aside>

## Custom Codes

Due to limitations with `OBErrorResponseError1Code` we've added two additional codes:

| Error Code           | Description                                                           |
| -------------------- | --------------------------------------------------------------------- |
| `UK.MONZO.Generic`   | A generic code used when no specific code is suitable                 |
| `UK.MONZO.Forbidden` | Used when a request is authenticated but has insufficient permissions |

## Status Codes

The error prefix of `OBErrorResponse1.Code` will always be paired with a status code as follows:

| Prefix Code           | Status Code |
| --------------------- | ----------- |
| `bad_request`         | 400         |
| `bad_response`        | 406         |
| `forbidden`           | 403         |
| `internal_service`    | 500         |
| `not_found`           | 404         |
| `precondition_failed` | 412         |
| `timeout`             | 504         |
| `unauthorized`        | 401         |
| `rate_limited`        | 429         |

## Rate Limiting

Monzo's Open Banking API enforces rate limits to maintain platform stability. We apply rate limits both at a platform-wide and TPP level.

### TPP Rate Limiting

<aside class="notice">
100 requests per second per a TPP
</aside>

This limit is shared across all endpoints of our Open Banking APIs and is applied collectively across all client IDs under the same organization ID.

### Platform-Wide Rate Limiting

The platform-wide rate limit exists to prevent excessive load on our datastore. This type of rate limiting is not specific to an individual TPP but applies when the datastore is experiencing significantly high load and throttles traffic to reduce it.

If your request is affected by platform-wide rate limiting, it is likely due to temporary high demand on our infrastructure. In this case, retrying the request after a short backoff period should work.

## Tokens

| Token Type  | Expiry                   |
| ----------- | ------------------------ |
| Access      | 30 hours                 |
| Refresh     | 4,320 hour ( ~6 months)  |
| VRP Refresh | 26,280 hours ( ~3 years) |

### Tokens Errors

| Error                               | Description                                                                                                                       | Action               |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `bad_request.refresh_token.evicted` | Client's have a limited number of token slots, when a client exceeds it's limit the oldest token is evicted                       | Requires new consent |
| `bad_request.refresh_token.invalid` | Platform security controls have invalid the token, we're unable to provider more information around why the token was invalidated | Requires new consent |

#### How token eviction works

Our OAuth system maintains a limited set of valid tokens for any given client, operating on a First-In, First-Out (FIFO) principle. When a new access token / refresh token is issued for a client, it occupies a slot in the system's internal token "ring."
If this ring is full, the oldest token set in the ring is automatically evicted to make space for the new one.

Clients register after 10:08 UTC on 2024-11-19 will have a ring size of 25, all other clients have a ring size of 10.

Since 2020-07-23 we've disallowed new client registration requests to include both `payments` & `accounts` scopes, instead requiring TPPs to register mutiple client. This reduces the chances that the TPP will run into the 10 or 25 active session limit.

### Mapping Errors

Our previous error structure included a `code` and `message`. These are now mapped to the new `OBErrorResponse1` as follows:

| Previous Feild | New Feild                              |
| -------------- | -------------------------------------- |
| `code`         | `OBErrorResponse1.Code`                |
| `message`      | `OBErrorResponse1.OBError1[0].Message` |

> Previous Error Structure

```json
{
  "Code": "bad_request.consent_status",
  "Message": "Consent is not authorised"
}
```

> New Error Structure

```json
{
  "Code": "bad_request.consent_status",
  "Id": "d3628722-749f-4fe9-76f9-f59844ad3714",
  "Message": "Invalid consent status",
  "Errors": [
    {
      "ErrorCode": "UK.OBIE.Resource.InvalidConsentStatus",
      "Message": "Consent is not authorised"
    }
  ]
}
```

## Using Previous Errors

To revert to the previous error behavior, you can include an additional header `X-Open-Banking-Legacy-Errors` on each request. If this option does not meet your needs, please contact us at [openbanking@monzo.com](mailto:openbanking@monzo.com).

Once we are confident that TPPs have successfully migrated to the new error behavior, we will remove the opt-out functionality.
