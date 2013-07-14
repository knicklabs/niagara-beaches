var Scraper = require('./lib/scraper')
  , parse = function(data) {
    return {
      name: data.name.split('#')[1],
      status: {
        state: (data.status == 'Open') ? true : false,
        date: data.date,
        reason: (data.reason || '').replace(/;#/g, '')
      }
    };
  };

var beaches = {
  get: function(callback) {
    var scraper = new Scraper({
      uri: 'http://www.niagararegion.ca/sherpa-lists/beach-results_v2.xml',
      root: ['bm'],
      keys: {
        name: ['@', 'ows_Beach_Name'],
        status: ['@', 'ows_Posting_Status'],
        date: ['@', 'ows_Posting_Date'],
        reason: ['@', 'ows_Posting_Reason']
      }
    });

    return scraper.scrape(function(err, data) {
      if (err) {
        return callback(err, null);
      }

      var results = [];

      for (var i = 0, max = data.length; i < max; i++) {
        results.push(parse(data[i]));
      }

      callback(err, results);
    });
  }
};

module.exports = beaches;