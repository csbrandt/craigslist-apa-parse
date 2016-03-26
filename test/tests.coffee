parser = require('../')
fs = require('fs')
expect = require('expect.js')

describe 'parser', ->
   parsedPosts = null
   error = null

   parser.parse fs.readFileSync(__dirname + '/index.rss').toString(), (err, posts) ->
      parsedPosts = posts
      error = err

   it 'should have no error', ->
      expect(error).to.not.be.ok()

   it 'should return 100 posts', ->
      expect(parsedPosts.length).to.equal 100

   it 'should return 100 posts with a date', ->
      dates = parsedPosts.filter (post) ->
         return post.date
      expect(dates.length).to.equal 100

   it 'should return 100 posts with a title', ->
      titles = parsedPosts.filter (post) ->
         return post.title
      expect(titles.length).to.equal 100

   it 'should return x posts with a location', ->
      locations = parsedPosts.filter (post) ->
         return post.location
      expect(locations.length).to.equal 99

   it 'should return x posts with a price', ->
      locations = parsedPosts.filter (post) ->
         return post.price
      expect(locations.length).to.equal 96

   it 'should return x posts with bedrooms', ->
      locations = parsedPosts.filter (post) ->
         return post.bedroom
      expect(locations.length).to.equal 90
