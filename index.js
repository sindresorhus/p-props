'use strict';
const pMap = require('p-map');

const map = async (input, mapper, options) => {
	const values = await pMap(input.entries(), ([key, value]) => mapper(value, key), options);
	const result = new Map();

	for (const [index, key] of [...input.keys()].entries()) {
		result.set(key, values[index]);
	}

	return result;
};

const object = async (input, mapper, options) => {
	const values = await pMap(Object.entries(input), ([key, value]) => mapper(value, key), options);
	const result = {};

	for (const [index, key] of Object.keys(input).entries()) {
		result[key] = values[index];
	}

	return result;
};

const pProps = (input, mapper = (value => value), options) => {
	return input instanceof Map ?
		map(input, mapper, options) :
		object(input, mapper, options);
};

module.exports = pProps;
module.exports.default = pProps;
