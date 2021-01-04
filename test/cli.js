var expect = require('chai').expect;
var extract = require('..');
var exec = require('@momsfriendlydevco/exec');

describe('@MomsFriendlyDevCo/Extact (CLI)', async ()=> {

	it('should extract paths', ()=> Promise.all(
		[
			['./.hidden', './.hidden'],
			['./image.jpg', './image.jpg'],
			['prefix ./.hidden suffix', './.hidden'],
			['prefix ./image.jpg suffix', './image.jpg'],
			['prefix foo/bar.baz suffix quz.quuz', 'foo/bar.baz\nquz.quuz'],
		].map(([testInput, testOutput]) =>
			exec([`${__dirname}/../app.js`, '--paths'], {
				buffer: true,
				stdin: testInput,
				logStderr: true,
				prefixStderr: 'ERR>',
			})
				.then(output => {
					expect(output).to.equal(testOutput);
				})
		)
	));

});
