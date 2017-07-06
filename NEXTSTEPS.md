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

[] Student Information:
   [] Age
     - type age into a numerical field
     - then select from, gte, lte, or eq
   [] Nationality
     - BLOCKED can't get list of nationalities

[] Results by: language, post secondary, high school
   - BLOCKED waiting on graphql endpoint for tree data
   - HOWEVER will manually build Language only

[] Results by: language
   - search by:
     [] CourseType: offeringTypeIds: drop down of languages
     [] Duration: at least/any ; n ; durationType
     [] Start Date: DateRangeInput

[] display list of results
   - BLOCKED need the data to format the results nicely
     - we have the name, but need school, agency, etc...
   [] display: 
     - name, CourseType: offeringType, duration, 
     - start date
     - what is intensity? derived from duration?
     - maybe promotions

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

### Questions ###

[] IntegerRangeInput (age)
   - I don't seem to be able to create integer range inputs for gt, or lt 
   - can create them for gte and lte
[] Nationality
   - where is the list of nationalities, why not expose it through api-v2
