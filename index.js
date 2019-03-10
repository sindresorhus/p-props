'use strict';

const pMap = require('p-map');

const map = async (input, mapper, options) => {
	const values = await pMap(input.entries(), ([key, value]) => mapper(value, key), options);
	const result = new Map();

	for (const [i, key] of [...input.keys()].entries()) {
		result.set(key, values[i]);
	}

	return result;
};

const obj = async (input, mapper, options) => {
	const values = await pMap(Object.entries(input), ([key, value]) => mapper(value, key), options);
	const result = {};

	for (const [i, key] of Object.keys(input).entries()) {
		result[key] = values[i];
	}

	return result;
};

const pProps = (input, mapper, options) => {
	mapper = mapper || (value => value);
	return input instanceof Map ?
		map(input, mapper, options) :
		obj(input, mapper, options);
};

module.exports = pProps;
module.exports.default = pProps;
