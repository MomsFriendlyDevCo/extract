/**
* Examine an input string and extract matching types based on options
* @param {string|buffer} input The input string to process
* @param {Object} [options] Additioanl options
* @param {string} [options.type='paths'] Parser to use
*/
var extract = module.exports = function(input, options) {
	var settings = {...extract.defaults, ...options};
	if (!extract.types[settings.type]) throw new Error(`Invalid extract parser "${settings.type}"`);

	var useInput = typeof input == 'string' ? input
		: input instanceof Buffer ? input.toString()
		: false;
	if (useInput === false) throw new Error('Invalid input type');

	return extract.types[settings.type].exec(useInput, settings);
};

extract.defaults = {
	type: 'paths',
};

extract.types = {
	paths: require('./types/paths'),
};
