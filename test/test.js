var expect = require('chai').expect;
var extract = require('..');

describe('@MomsFriendlyDevCo/Extact (API)', ()=> {

	it('should extract paths', ()=> {
		var opts = {type: 'paths'};
		expect(extract('./.hidden', opts)).to.deep.equal(['./.hidden']);
		expect(extract('./image.jpg', opts)).to.deep.equal(['./image.jpg']);
		expect(extract('prefix ./.hidden suffix', opts)).to.deep.equal(['./.hidden']);
		expect(extract('prefix ./image.jpg suffix', opts)).to.deep.equal(['./image.jpg']);
		expect(extract('prefix foo/bar.baz suffix quz.quuz', opts)).to.deep.equal(['foo/bar.baz', 'quz.quuz']);
	});

});
