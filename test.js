#!/usr/bin/env node
const { doneTesting, test } = require('./');

function overrideOutput(ts) {
    ts.lastOutput = '';
    ts.write = x => ts.lastOutput = x;
}

test('Module methods', ts => {
    const t = ts.new();

    ts.ok(t,              'New instance');
    ts.ok(t.plan,         'Plan');
    ts.ok(t.ok,           'Ok');
    ts.ok(t.doneTesting,  'Done testing');
    ts.ok(t.diag,         'Diag');
    ts.ok(t.test,         'Test');
    ts.ok(t.new,          'New');
});

test('Test number', ts => {
    const t = ts.new();
    overrideOutput(t);

    ts.eq(t.testNum, 0);
    t.ok(true);
    ts.eq(t.testNum, 1);
    t.ok(true);
    ts.eq(t.testNum, 2);
    t.ok(false);
    ts.eq(t.testNum, 3);
});

test('Plan output - Explicit', ts => {
    const t = ts.new();
    overrideOutput(t);

    t.plan(5);
    ts.eq(t.lastOutput, '1..5');

    t.plan(1);
    ts.eq(t.lastOutput, '1..1');

    t.plan(0);
    ts.eq(t.lastOutput, '1..0');
});

test('Plan output - Implicit', ts => {
    const t = ts.new();
    overrideOutput(t);

    t.doneTesting();
    ts.eq(t.lastOutput, '1..0');

    t.ok(true);
    t.doneTesting();
    ts.eq(t.lastOutput, '1..1');

    t.ok(false);
    t.doneTesting();
    ts.eq(t.lastOutput, '1..2');
});

test('Diagnostic messages', ts => {
    const t = ts.new();
    overrideOutput(t);

    t.diag('Test message');
    ts.eq(t.lastOutput, '# Test message');
});

test('Test output', ts => {
    const t = ts.new();
    overrideOutput(t);

    t.ok(true);
    ts.eq(t.lastOutput, 'ok 1');

    t.ok(false);
    ts.eq(t.lastOutput, 'not ok 2');

    t.ok(true, 'Information');
    ts.eq(t.lastOutput, 'ok 3 - Information');

    t.ok(false, 'Extra information');
    ts.eq(t.lastOutput, 'not ok 4 - Extra information');

    t.doneTesting();
    ts.eq(t.lastOutput, '1..4');
});

doneTesting();
