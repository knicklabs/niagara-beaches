#!/usr/bin/env node

// This is an executable script that gets data on beaches in Niagara and prints
// the results. The output is a list of beaches and their status.

var beaches = require('./../beaches')
  , moment = require('moment')
  , Table = require('cli-table')
  , createMessage
  , humanize
  , state
  , colors;

colors = {
  red: '\033[31m',
  green: '\033[32m',
  reset: '\033[0m'
};

humanize = function(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

getState = function(state) {
  return (state) ? 'open' : 'closed';
};

getDate = function(date) {
  return humanize(moment(date).fromNow());
}

colorize = function(string, state) {
  if (state) {
    string = colors.green + string;
  } else {
    string = colors.red + string;
  }

  return string + colors.reset;
}

/*
createMessage = function(data) {
  var message = data.name + ' ';

  if (data.status.state) {
    message = message + 'is open';
  } else {
    message = message + 'is closed';

    if (typeof data.status.reason !== 'undefined') {
      message = message + ' due to ' + data.status.reason;
    }
  }

  if (typeof data.status.date !== 'undefined') {
    message = message + ' (' + humanize(moment(data.status.date).fromNow()) + ')';
  }

  message = message + '.';

  if (data.status.state) {
    message = colors.green + message;
  } else {
    message = colors.red + message;
  }
  message = message + colors.reset;

  return message;
};
*/

beaches.get(function(err, data) {
  if (err) {
    return console.log(err);
  }

  var table = new Table({
      head: ['Name', 'Status', 'Reason', 'Temp', 'Reported']
    , colWidths: [20, 9, 20, 6, 12]
  });

  for (var i = 0, max = data.length; i < max; i++) {
    var item = data[i];

    table.push(
      [
        item.name,
        colorize(getState(item.status.state), item.status.state),
        (item.status.reason) ? item.status.reason : 'N/A',
        (item.status.temp) ? item.status.temp : '',
        getDate(item.status.date)
      ]
    );
  }

  console.log(table.toString());
});
