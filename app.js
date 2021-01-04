#!/usr/bin/env node

var extract = require('.');
var fs = require('fs');
var program = require('commander');
var promiseSeries = require('./lib/promise.series');

program
	.version(require('./package.json').version)
	.usage('[--type=TYPE] [files...]')
	.option('-t, --type [parser]', 'specify a parser type to use (default: "auto")')
	.option('-f, --files', 'set --type=paths')
	.option('-p, --paths', 'set --type=paths')
	.option('-v, --verbose', 'be verbose')
	.option('-0, --null', 'seperate output using nulls instead of linefeeds')
	.parse(process.argv);

if (program.paths) program.type = 'paths';

Promise.resolve()
	.then(()=> {
		if (program.args.length > 0) { // Read from files
			var buf = Buffer.alloc(0);
			return promiseSeries(program.args.map(path =>
				fs.promises.readFile(path)
					.then(res => buf = Buffer.concat([buf, res]))
			));
		} else { // Read from STDIN
			var strBuffer = '';
			return new Promise((resolve, reject) => {
				process.stdin.on('data', data => strBuffer += data);
				process.stdin.on('close', resolve);
			}).then(()=> Buffer.from(strBuffer));
		}
	})
	.then(inputBuffer => extract(inputBuffer, {
		type: program.type,
	}))
	.then(found => process.stdout.write(found.join(program.null ? '\0' : '\n')))
