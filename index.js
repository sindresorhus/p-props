'use strict';
const pMap = require('p-map');

const map = (input, mapper, options) => {
	return pMap(input.entries(), entry => Promise.resolve(entry[1]).then(value => mapper(value, entry[0])), options).then(values => {
		const ret = new Map();

		for (const entry of Array.from(input.keys()).entries()) {
			const i = entry[0];
			const key = entry[1];
			ret.set(key, values[i]);
		}

		return ret;
	});
};

const obj = (input, mapper, options) => {
	// TODO: use `Object.entries()` when targeting Node.js 6
	const keys = Object.keys(input);

	return pMap(keys, key => Promise.resolve(input[key]).then(value => mapper(value, key)), options).then(values => {
		const ret = {};

		// TODO: use destructuring when targeting Node.js 6
		// for (const [i, key] of keys.entries()) {
		// 	ret[key] = values[i];
		// }

		for (const entry of keys.entries()) {
			const i = entry[0];
			const key = entry[1];
			ret[key] = values[i];
		}

		return ret;
	});
};

module.exports = (input, mapper, options) => {
	mapper = mapper || (value => value);
	return input instanceof Map ? map(input, mapper, options) : obj(input, mapper, options);
};
