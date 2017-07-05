NEXTSTEPS
=========

OfferingSearchResultFilter from the api

offeringTypeIds: [Int]
 - select with offeringCourseCategories

durationTypeId: Int
 - select with durationTypes

nationalityId: Int
age: IntegerRangeInput <-- (ask about range in json { gt: 1, lt: 10 } seems not to work)
schoolIds: [Int]
offeringCourseCategoryIds: [Int]
googlePlaceIds: [String]
startDate: DateRangeInput
durationAmount: IntegerRangeInput
currencyId: Int
limit: Int

{
  offeringSearch(filter: {
    nationalityId: 1
  }) {
    offeringId
    offering {
      name
    }
  }
}

try paginating

## TIMELINE ##

+ created the app with typescript
+ added redux and redux types
+ copy a demo typescript app
+ get the graphiQL tool setup
  + api-server v2 (https://github.com/edvisor-io/api-server-v2)
  + install some DBs: MariaDB, MongoDB
- add Apollo
- make queries against the api
- add React-Router

