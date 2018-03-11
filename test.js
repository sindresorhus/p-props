import test from 'ava';
import delay from 'delay';
import m from '.';

test('main', async t => {
	t.deepEqual(
		await m({
			foo: delay(100).then(() => 1),
			bar: Promise.resolve(2),
			faz: 3
		}),
		{
			foo: 1,
			bar: 2,
			faz: 3
		}
	);
});

test('Map input', async t => {
	t.deepEqual(
		await m(new global.Map([
			['foo', Promise.resolve(1)],
			['bar', 2]
		])),
		new global.Map([
			['foo', 1],
			['bar', 2]
		])
	);
});

test('rejects if any of the input promises reject', async t => {
	await t.throws(
		m({
			foo: Promise.resolve(1),
			bar: Promise.reject(new Error('bar'))
		}),
		'bar'
	);
});

test('handles empty object', async t => {
	t.deepEqual(await m({}), {});
	t.deepEqual((await m(new global.Map([]))), new global.Map([]));
});

test('with mapper', async t => {
	t.deepEqual(
		await m({
			foo: 1,
			baz: Promise.resolve(2)
		}, (value, key) => Promise.resolve(value).then(resolvedValue => key + resolvedValue)),
		{
			foo: 'foo1',
			baz: 'baz2'
		}
	);
});

test('Map input with mapper', async t => {
	t.deepEqual(
		await m(new global.Map([
			['foo', 1],
			['bar', Promise.resolve(2)]
		]), (value, key) => Promise.resolve(value).then(resolvedValue => key + resolvedValue)),
		new global.Map([
			['foo', 'foo1'],
			['bar', 'bar2']
		])
	);
});
