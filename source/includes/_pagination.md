# Pagination

The list endpoints in the Mondo API support time based and cursor based
pagination.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`limit`<br><span class="label notice">Optional</span>|A limit on the number of objects to be returned. Limit can range between 1 and 100 items.
`since`<br><span class="label notice">Optional</span>|Either an RFC3339 encoded timestamp (`2009-11-10T23:00:00Z`) or an id (`tx_00008zhJ3kE6c8kmsGUKgn`).
`before`<br><span class="label notice">Optional</span>|An RFC3339 encoded timestamp (`2009-11-10T23:00:00Z`).
