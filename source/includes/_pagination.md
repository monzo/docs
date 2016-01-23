# Pagination

Endpoints which enumerate objects support time-based and cursor-based pagination.

##### Arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`limit`<br><span class="label">Optional</span>|Limits the number of results per-page.<br>Max: 100.
`since`<br><span class="label">Optional</span>|An RFC 3339-encoded timestamp.<br> eg.`2009-11-10T23:00:00Z` (inclusive: transactions with timestamp `2009-11-10T23:00:00Z` *will* be included in the results).<br><br>Or an object id.<br>eg. `tx_00008zhJ3kE6c8kmsGUKgn` (exclusive: transaction `tx_00008zhJ3kE6c8kmsGUKgn` *will not* be included in the results).
`before`<br><span class="label">Optional</span>|An RFC 3339 encoded-timestamp<br>`2009-11-10T23:00:00Z` (exclusive: transactions with timestamp `2009-11-10T23:00:00Z` *will not* be included in the results).
