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

expectType<Promise<{[key: string]: string | number}>>(
	pProps<string, string | Promise<number>>(hashMap)
);
expectType<Promise<{[key: string]: boolean}>>(
	pProps<string, string | Promise<number>, boolean>(hashMap, (value, key) => {
		expectType<string | Promise<number>>(value);
		expectType<string>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	})
);
expectType<Promise<{[key: string]: boolean}>>(
	pProps<string, string | Promise<number>, boolean>(
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

const map = new Map<number, string | Promise<string>>([
	[1, Promise.resolve('1')],
	[2, '2']
]);

pProps(map).then(result => {
	expectType<string | undefined>(result.get(1));
});

expectType<Promise<Map<number, string>>>(pProps(map));
expectType<Promise<Map<number, boolean>>>(
	pProps(map, (value, key) => {
		expectType<string | Promise<string>>(value);
		expectType<number>(key);
		return Math.random() > 0.5 ? false : Promise.resolve(true);
	})
);
expectType<Promise<Map<number, boolean>>>(
	pProps(
		map,
		(value, key) => {
			expectType<string | Promise<string>>(value);
			expectType<number>(key);
			return Math.random() > 0.5 ? false : Promise.resolve(true);
		},
		{
			concurrency: 1
		}
	)
);
