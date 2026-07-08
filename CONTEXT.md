# land-grants-journey-tests

WebdriverIO journey tests for land grant application flows and local/CDP execution.

## Language

**Land grant**
A grant journey based on land parcels and selected land management actions.
_Avoid_: Woodland grant, Grasslands grant, Generic grant when the land grant flow is meant

**Journey test**
An end-to-end browser test that exercises the grant application flow.
_Avoid_: Unit test, Smoke test, Performance test

**Land parcel**
A registered area of land associated with an SBI and selected during the journey.
_Avoid_: Field, Plot, Property

**Action**
A land management option selected by the user and reviewed before submission.
_Avoid_: Product, Item, Checkbox option

**Consent**
The page or condition confirming the user has required authority before continuing.
_Avoid_: Login permission, Role, Feature flag

**Review actions**
The step where selected actions are checked before submission.
_Avoid_: Summary when referring to the specific actions page, Confirmation

**Declaration**
The final pre-submission confirmation of the user's answers.
_Avoid_: Confirmation, Consent, Agreement

**Confirmation**
The post-submission page showing the application has been submitted.
_Avoid_: Declaration, Success screen, Review page

**GAS**
The Grants Application Service integration used by journey helpers.
_Avoid_: Grants UI Backend, Config API, WDIO

**CRN**
Customer Reference Number: the Defra ID identifier for an individual user.
_Avoid_: SBI, User ID, Account number

**SBI**
Single Business Identifier: the farm business or organisation represented by the signed-in user.
_Avoid_: CRN, Business name, Holding number
