# Open Banking Errors

Our open banking APIs return errors inline with the [open banking specification](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/profiles/read-write-data-api-profile.html#error-response-structure).

## OBErrorResponse1

| Name    | Type         | Description                                              |
| ------- | ------------ | -------------------------------------------------------- |
| Code    | Max40Text    | Custom error code with a format of `errPrefix`.`errType` |
| Id      | Max40Text    | Internal trace identifier                                |
| Message | Max500Text   | High level human readable category message               |
| Errors  | `[]OBError1` | One element array containing both a `Code` & `Message`   |

## OBError1

A full list of `OBErrorResponseError1Code` can be found [here](https://openbankinguk.github.io/read-write-api-site3/v3.1.10/references/namespaced-enumerations.html#oberrorresponseerror1code).

| Name      | Type                        | Description                                                           |
| --------- | --------------------------- | --------------------------------------------------------------------- |
| ErrorCode | `OBErrorResponseError1Code` | OBIE error code (`UK.OBIE.XYZ`) or custom error code (`UK.MONZO.XYZ`) |
| Message   | Max500Text                  | Human readable message that details the cause of the error            |

<aside class="notice">
We've chosen not to implement the `Path` or `Url` properties of `OBError1`
</aside>

## Custom Codes

Due to limitations with `OBErrorResponseError1Code` we've added two additional codes:

| Error Code           | Description                                                                |
| -------------------- | -------------------------------------------------------------------------- |
| `UK.MONZO.Generic`   | A generic code used when no specific code is suitable                      |
| `UK.MONZO.Forbidden` | Code used when a request is authenticated but has insufficient permissions |

## Status Codes

The status code returned is determined by the `errPrefix` of `OBErrorResponse1.Code` as per the below table.

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

### Legacy Errors

Our previous error structure was made up of a `code` and a `message` we've ensured that these properties map
to `OBErrorResponse1`.

| Error Code              | Description |
| ----------------------- | ----------- |
| `OBErrorResponse1.Code` | `code`      |
| `OBError1.Message`      | `message`   |

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
