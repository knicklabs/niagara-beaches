### Introducing Niagara Beaches

Niagara Beaches is a utility for getting status reports on beaches in the Niagara Region.
The utility returns the latest status updates from the beach monitoring service.

### Getting Started with the Module

Install Niagara Beaches locally in your program directory.

``` bash
npm install niagara-beaches
```

You can then require Niagara Beaches. It returns an object literal. The get function
takes a callback as a parameter. You can use the callback to parse the returned beach
data when it has been retrieved.

For example:

``` javascript
var beaches = require('niagara-beaches');
beaches.get(function(err, data) {
  if (err) {
    return console.log(err);
  }

  for (var i = 0, max = data.length; i < max; i++) {
    console.log(data[i]);
  }
});
```
### Getting Started with the CLI

Install Niagara Beaches globally to use the command line interface.

``` bash
npm install niagara-beaches -g
```

You can then run the command `niagara-beaches` from your command line to return the status
report for each beach in Niagara. The report includes the age of the data.

An example excerpt from running this command is: `Long Beach is closed due to E. Coli
(21 hours ago).`

### License

Copyright (c) 2012 Nickolas Kenyeres

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.