var reader = require('./reader');

var statuses = {
  fetch: function(uri, map, callback) {
    reader.read(uri, function(err, data) {
      if (err) {
        return callback(new Error('Failed to read ' + uri));
      }

      var results = [];

      if (map.root) {
        for (var i = 0, max = map.root.length; i < max; i++) {
          data = data[map.root[i]];
        }
      }

      for (var i = 0, max = data.length; i < max; i++) {
        var result = {};

        for (var key in map.keys) {
          if (map.keys.hasOwnProperty(key)) {
            var value = map.keys[key];

            result[key] = data[i];
            for (var j = 0, maxJ = value.length; j < maxJ; j++) {
              result[key] = result[key][value[j]];
            }
          }
        }

        results.push(result);
      }

      return callback(err, results);
    });
  }
};

module.exports = statuses;