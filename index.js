'use strict';

const map = input => {
	return Promise.all(input.values()).then(values => {
		const ret = new Map();

		for (const entry of Array.from(input.keys()).entries()) {
			const i = entry[0];
			const key = entry[1];
			ret.set(key, values[i]);
		}

		return ret;
	});
};

const obj = input => {
	// TODO: use `Object.entries()` when targeting Node.js 6
	const keys = Object.keys(input);

	return Promise.all(keys.map(key => input[key])).then(values => {
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

module.exports = input => input instanceof Map ? map(input) : obj(input);
