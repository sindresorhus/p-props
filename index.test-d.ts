import {expectType} from 'tsd-check';
import pProps from '.';

expectType<Promise<{[key in 'foo']: string}>>(pProps({foo: 'bar'}));
expectType<Promise<{[key in 'foo']: boolean}>>(
	pProps({foo: 'bar'}, (value, key) => {
		expectType<string>(value);
		expectType<'foo'>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	})
);
expectType<Promise<{[key in 'foo']: boolean}>>(
	pProps(
		{foo: 'bar'},
		(value, key) => {
			expectType<string>(value);
			expectType<'foo'>(key);
			return Math.random() > 0.5 ? false : Promise.resolve(true);
		},
		{
			concurrency: 1
		}
	)
);

const hashMap = {
	unicorn: Promise.resolve(1),
	foo: 'bar'
};

expectType<Promise<{[key in 'unicorn' | 'foo']: string | number}>>(pProps(hashMap));
expectType<Promise<{[key in 'unicorn' | 'foo']: boolean}>>(
	pProps(hashMap, (value, key) => {
		expectType<string | Promise<number>>(value);
		expectType<string>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	})
);
expectType<Promise<{[key in 'unicorn' | 'foo']: boolean}>>(
	pProps(
		hashMap,
		(value, key) => {
			expectType<string | Promise<number>>(value);
			expectType<string>(key);
			return Math.random() > 0.5 ? false : Promise.resolve(true);
		},
		{
			concurrency: 1
		}
	)
);

const partialMap: {foo?: Promise<string>} = {}
expectType<Promise<{foo?: string}>>(pProps(partialMap));

const map = new Map<number, string | Promise<string>>([
	[1, Promise.resolve('1')],
	[2, '2']
]);

pProps(map).then(result => {
	expectType<Map<number, string>>(result);
	expectType<string | undefined>(result.get(1));
});

expectType<Promise<Map<number, string>>>(pProps(map));
expectType<Promise<Map<number, number>>>(
	pProps(map, (value, key) => {
		expectType<string | Promise<string>>(value);
		expectType<number>(key);
		return Math.random() > 0.5 ? 1 : Promise.resolve(2);
	})
);
expectType<Promise<Map<number, number>>>(
	pProps(
		map,
		(value, key) => {
			expectType<string | Promise<string>>(value);
			expectType<number>(key);
			return Math.random() > 0.5 ? 1 : Promise.resolve(2);
		},
		{
			concurrency: 1
		}
	)
);
