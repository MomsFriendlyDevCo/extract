@MomsFriendlyDevCo/Extract
==========================
Extract various types of entity from strings.

This project is mainly useful for its CLI which can take STDIN and extract useful information.


API
===

```javascript
var extract = require('@momsfriendlydevco/extract');

var inputString = 'prefix foo/bar.baz suffix quz.quuz'; // Or a Buffer
extract(inputString, {type: 'paths'}); //= ['foo/bar.baz', 'quz.quuz']
```


CLI
===
Install using `npm i -g @MomsFriendlyDevCo/Extract`


```
Usage: extract [--type=TYPE] [files...]

Options:
  -V, --version        output the version number
  -t, --type [parser]  specify a parser type to use (default: "auto")
  -f, --files          set --type=paths
  -p, --paths          set --type=paths
  -v, --verbose        be verbose
  -0, --null           seperate output using nulls instead of linefeeds
  -h, --help           display help for command

Examples:

  # Extact all path-like items from a file
  extract --paths someBigFile.any

  # Extact all path-like items from a stream
  cat someBigFile.any | extract --paths
```
