module.exports = {
	id: 'paths',
	description: 'Extract things that look like file paths',
	exec(input) {
		return Array.from(input.matchAll(/([\.\w\/]*?\.\w+)/g)).map(i => i[0]);
	},
};
