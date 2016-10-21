'use strict';

const map = input => new Promise((resolve, reject) => {
	Promise.all(input.values()).then(values => {
		const ret = new Map();

		for (const entry of Array.from(input.keys()).entries()) {
			const i = entry[0];
			const key = entry[1];
			ret.set(key, values[i]);
		}

		resolve(ret);
	}).catch(reject);
});

const obj = input => new Promise((resolve, reject) => {
	// TODO: use `Object.entries()` when targeting Node.js 6
	const keys = Object.keys(input);

	Promise.all(keys.map(key => input[key])).then(values => {
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

		resolve(ret);
	}).catch(reject);
});

module.exports = input => input instanceof Map ? map(input) : obj(input);
