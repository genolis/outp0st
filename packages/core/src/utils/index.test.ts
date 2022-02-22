import s from './index';

import test from 'ava';

test('pathToState("./example/i.json")', async (t) => {
    const state = await s.pathToState('./example/i.json');
    t.assert(state?.title, 'TGE Testnet Initial');
});

test('pathToState("")', async (t) => {
    await t.throwsAsync(async () => await s.pathToState(''), null);
});

test('pathToState("hello")', async (t) => {
    await t.throwsAsync(async () => await s.pathToState('hello'), null);
});
