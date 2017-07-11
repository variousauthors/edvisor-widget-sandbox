NEXTSTEPS
=========

[] Student Information:
   [x] Age
     - type age into a numerical field
     - then select from, gte, lte, or eq
   [] Nationality
     - BLOCKED can't get list of nationalities

[] Results by: post secondary, high school
   - BLOCKED waiting on graphql endpoint for tree data

[] Results by: language
   - search by:
     [x] CourseType: offeringTypeIds: drop down of languages
     [x] Duration: at least/any ; n ; durationType
     [] Start Date: DateRangeInput

[x] display list of results
   - BLOCKED need the data to format the results nicely
     - we have the name, but need school, agency, etc...
   [x] display some data:
     - name, CourseType: offeringType, duration, 
     - start date
     - what is intensity? derived from duration?
     - maybe promotions

[x] Add location to school:
   - school.name @ school.googleplace.translation

[x] search by googleplaces
   - fetch all the school places associated with the agency

[] fetch duration types for search form
[] turn offeringCourseCategories into a tree

## TIMELINE ##

+ created the app with typescript
+ added redux and redux types
+ copy a demo typescript app
+ get the graphiQL tool setup
  + api-server v2 (https://github.com/edvisor-io/api-server-v2)
  + install some DBs: MariaDB, MongoDB
+ add Apollo
+ make queries against the api
- add React-Router
- typescript deep-dive

### Questions ###

[] IntegerRangeInput (age)
   - I don't seem to be able to create integer range inputs for gt, or lt 
   - can create them for gte and lte
[] Nationality
   - where is the list of nationalities, why not expose it through api-v2

### NOTES ###

 - when connecting components
   1. call graphql, then call connect -> mapStateToProps called before Skip
   2. call connect, then call graphql -> skip  called before mapStateToProps
   - I _feel_ like 1. is the way

 - our queries do not return an id field so Apollo may have trouble caching them
   - see: http://dev.apollodata.com/react/cache-updates.html#normalization
   - Pavol was getting caching I think tho, so who knows!?

