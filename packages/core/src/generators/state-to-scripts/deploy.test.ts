import test from 'ava';

import { deployOutpostState } from './deploy';
import { pathToState } from '../../utils';

import dotenv from 'dotenv';
dotenv.config();

test('deployOutpostState()', async (t) => {
    const state = await pathToState('./example/i.json');
    const newState = await deployOutpostState(state!, {
        title: 'testcase',
        mnemonic: process.env.OUTPOST_TESTS_MNEMONIC1 || 'test',
    });
    t.not(state?.contracts[0].codeId, newState.contracts[0].codeId);
});
