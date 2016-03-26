[![NPM](https://nodei.co/npm/craigslist-apa-parse.png?downloads=true&stars=true)](https://nodei.co/npm/craigslist-apa-parse/)

Given an RSS feed from the apts/housing section of craigslist, return an array of JSON posts with pertinent information parsed out

Installation
-------------
    $ npm install craigslist-apa-parse

Function
--------
parse(rss, cb)
> **rss**:  *string*, XML RSS feed string representing posts from craigslist apa section
>
> **cb**:  *Function(error, posts)*, callback function
> + error: *Error*, passed when issue encountered reading feed
> + posts: *array*, JSON array of posts with the following schema,
    + date
    + title
    + location
    + price
    + bedroom


Running Tests
--------------
Install the development dependencies:

    $ npm install

Then run the tests:

    $ npm test

Code Coverage
--------------
Install the development dependencies:

    $ npm install

Then run coverage

    $ npm run coverage

View coverage reports

    $ firefox coverage/lcov-report/index.html

Browser Bundle
---------------
    $ npm run build
