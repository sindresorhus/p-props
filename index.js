'use strict';
const pMap = require('p-map');

const map = (input, mapper, options) => {
	return pMap(input.entries(), ([key, value]) => mapper(value, key), options).then(values => {
		const ret = new Map();

		for (const [i, key] of [...input.keys()].entries()) {
			ret.set(key, values[i]);
		}

		return ret;
	});
};

const obj = (input, mapper, options) => {
	return pMap(Object.entries(input), ([key, value]) => mapper(value, key), options).then(values => {
		const ret = {};

		for (const [i, key] of Object.keys(input).entries()) {
			ret[key] = values[i];
		}

		return ret;
	});
};

module.exports = (input, mapper, options) => {
	mapper = mapper || (value => value);
	return input instanceof Map ? map(input, mapper, options) : obj(input, mapper, options);
};
