var statuses = require('./statuses');

var Scraper = function() {
  var options = (arguments.length) ? arguments[0] : {};

  this.uri = options.uri;
  this.root = options.root;
  this.keys = options.keys || {};
};

Scraper.prototype.scrape = function(callback) {
  return statuses.fetch(this.uri, {
    root: this.root,
    keys: this.keys
  }, function(err, results) {
    return callback(err, results);
  });
};

module.exports = Scraper;