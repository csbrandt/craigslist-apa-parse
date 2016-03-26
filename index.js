var FeedParser = require('feedparser');
var url = require('url');
var parens = /(\()([^\)]*)(\))/;
var dollars = /(\$)[A-Fa-f\d]+\b/;
var alpha = /[^\d]/g;
var parser = exports;

parser.parse = function(rss, cb) {
   var posts = [];
   var feedParser = new FeedParser();

   feedParser.on('readable', function () {
      var item;
      var tokens;
      var city;
      var location;
      var price;
      var bedroom;

      while (item = this.read()) {
         tokens = item.title.split(parens);
         city = url.parse(item.link).host.split('.')[0];
         location = (tokens.length > 3) ? tokens[tokens.lastIndexOf('(') + 1] + ' ' + city : undefined;
         price = tokens[tokens.length - 1].match(dollars);
         price = (price) ? price[0] : undefined;
         bedroom = tokens[tokens.length - 1].split(' ');
         bedroom = (bedroom.length > 2) ? bedroom[bedroom.length - 1].replace(alpha, '') : undefined;

         posts.push({
            date: item['dc:date']['#'],
            title: item.title,
            location: location,
            price: price,
            bedroom: bedroom
         });
      }
   });

   feedParser.on('error', function (error) {
      cb(error, null);
   });

   feedParser.on('end', function () {
      cb(null, posts);
   });

   feedParser.write(rss);
   feedParser.end();
};
