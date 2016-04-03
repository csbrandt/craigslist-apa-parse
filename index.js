var FeedParser = require('feedparser');
var url = require('url');
var parens = /(\()([^\)]*)(\))/;
var dollars = /(\$)[A-Fa-f\d]+\b/;
var uniDollars = /(\&\#x0024\;)[A-Fa-f\d]+\b/;
var bd = /\d\d*(?=bd)/g;
var nonAlphanum = /[^a-zA-Z\d\s]/g;
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
         location = (tokens.length > 3) ? (tokens[tokens.lastIndexOf('(') + 1] + ',' + city)
                                          .split(nonAlphanum)
                                          .map(Function.prototype.call, String.prototype.trim)
                                          .join(',') : undefined;
         price = tokens[tokens.length - 1].match(dollars) || tokens[tokens.length - 1].match(uniDollars);
         price = (price && price.length) ? price[0].replace('&#x0024;', '').replace('$', '') : undefined;
         bedroom = item.title.match(bd);
         bedroom = (bedroom && bedroom.length) ? bedroom[0] : undefined;

         posts.push({
            date: item['dc:date']['#'],
            title: item.title,
            location: location,
            price: price,
            bedroom: bedroom,
            url: item.link
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
