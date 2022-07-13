# SCA-RTS (PS21/19)

## Overview
In November 2021, the FCA set out new rules for standards on Strong Customer Authentication (SCA) in a change to the Regulatory Technical Standards on Strong Customer Authentication and Secure Communication (SCA-RTS).

We (Monzo) will release these changes as of 2022-08-01. This will not be a breaking change.

Consents created before this date will expire after 90-days, as before. Consents created after this date will be long-lived.

TPPs will still be able to provide an `ExpirationDateTime` on the consent request at which time the consent will expire. If this is not populated, the permissions will be long-lived.

## Contact

If you have any queries about these changes then please contact [openbanking@monzo.com](mailto:openbanking@monzo.com).

