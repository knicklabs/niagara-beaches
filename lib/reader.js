var request = require('request')
  , xml2js  = require('xml2js')
  , parser  = new xml2js.Parser();

var reader = {
  read: function(uri, callback) {
    return request(uri, function(err, res, body) {
      if (!err && res.statusCode != 200) {
        err = res.statusCode;
      }

      if (err) {
        return callback(err);
      }

      return parser.parseString(body, function(err, result) {
        return callback(err, result);
      });
    });
  }
};

module.exports = reader;