# Pagination

Endpoints which enumerate objects support time-based and cursor-based pagination.

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`limit`<br><span class="label">Optional</span>|Limits the number of results per-page. <br> Default: 30 <br> Maximum: 100.
`since`<br><span class="label">Optional</span>|An RFC 3339-encoded timestamp.<br> eg.`2009-11-10T23:00:00Z`<br>…or an object id.<br>eg. `tx_00008zhJ3kE6c8kmsGUKgn`
`before`<br><span class="label">Optional</span>|An RFC 3339 encoded-timestamp<br>`2009-11-10T23:00:00Z`
