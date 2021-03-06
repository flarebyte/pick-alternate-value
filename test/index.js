import test from 'tape';
import pav from '../src';


const a = 'A';
const b = 'B';
const c = 'C';
const a31 = ['aaa', 'a'];
const a123 = ['b', 'bb', 'bbb'];
const a2135 = ['cc', 'c', 'ccc', 'ccccc'];
const a1N3 = ['b', null, 'bbb'];
const a1U3 = ['b', a.noMethod, 'bbb'];

test('pick the longest size', (t) => {
  t.plan(10);
  t.equal(pav.pickLongestSize(null), null, 'null');
  t.equal(pav.pickLongestSize([]), null, 'empty');
  t.equal(pav.pickLongestSize(null, 'def123'), 'def123', 'null');
  t.equal(pav.pickLongestSize([null, '']), '', 'discard null');
  t.equal(pav.pickLongestSize(['ab', 'a', 'abcd'], null, 2), 'ab', 'with max');
  t.equal(pav.pickLongestSize(['ab', 'a', 'abcd']), 'abcd', 'A');
  t.equal(pav.pickLongestSize(['abcde', 'a', 'ab']), 'abcde', 'B');
  t.equal(pav.pickLongestSize(['ab', 'ab1', 'ab2', 'a']), 'ab1', 'take 1st of 2 eq');
  t.deepEqual(pav.pickLongestSize([[1, 2], [1, 2, 3], [1]]), [1, 2, 3], 'arr of array');
  t.deepEqual(pav.pickLongestSize([{ a, b }, { a, b, c }, { a }]), { a, b, c }, 'array of obj');
});

test('pick the shortest size', (t) => {
  t.plan(10);
  t.equal(pav.pickShortestSize(null), null, 'null');
  t.equal(pav.pickShortestSize([]), null, 'empty');
  t.equal(pav.pickShortestSize([], 'def123'), 'def123', 'empty');
  t.equal(pav.pickShortestSize([null, '', 'abc']), '', 'discard null');
  t.equal(pav.pickShortestSize(['ab', 'a', 'abcd']), 'a', 'A');
  t.equal(pav.pickShortestSize(['ab', 'a', 'abcd'], null, 2), 'ab', 'with min');
  t.equal(pav.pickShortestSize(['abcde', 'a', 'ab']), 'a', 'B');
  t.equal(pav.pickShortestSize(['abd', 'a1', 'a2', 'abc']), 'a1', 'take 1st of 2 eq');
  t.deepEqual(pav.pickShortestSize([[1, 2], [1, 2, 3], [1]]), [1], 'arr of array');
  t.deepEqual(pav.pickShortestSize([{ a, b }, { a, b, c }, { a }]), { a }, 'array of obj');
});


test('sum the size', (t) => {
  t.plan(6);
  t.equal(pav.sumSize(null), 0, 'zero');
  t.equal(pav.sumSize([]), 0, 'empty');
  t.equal(pav.sumSize(['ab', 'a', 'abcd']), 7, 'A');
  t.equal(pav.sumSize(['ab', 'a', null]), 3, 'with null');
  t.deepEqual(pav.sumSize([[1, 2], [1, 2, 3], [1]]), 6, 'arr of array');
  t.deepEqual(pav.sumSize([{ a, b }, { a, b, c }, { a }]), 6, 'array of obj');
});

test('max the size', (t) => {
  t.plan(6);
  t.equal(pav.maxSize(null), null, 'zero');
  t.equal(pav.maxSize([]), null, 'empty');
  t.equal(pav.maxSize(['ab', 'a', 'abcd']), 4, 'A');
  t.equal(pav.maxSize(['ab', 'a', null]), 2, 'with null');
  t.deepEqual(pav.maxSize([[1, 2], [1, 2, 3], [1]]), 3, 'arr of array');
  t.deepEqual(pav.maxSize([{ a, b }, { a, b, c }, { a }]), 3, 'array of obj');
});

test('min the size', (t) => {
  t.plan(6);
  t.equal(pav.minSize(null), null, 'zero');
  t.equal(pav.minSize([]), null, 'empty');
  t.equal(pav.minSize(['ab', 'a', 'abcd']), 1, 'A');
  t.equal(pav.minSize(['ab', 'a', null]), 1, 'with null');
  t.deepEqual(pav.minSize([[1, 2], [1, 2, 3], [1]]), 1, 'arr of array');
  t.deepEqual(pav.minSize([{ a, b }, { a, b, c }, { a }]), 1, 'array of obj');
});

test('has no null', (t) => {
  t.plan(2);
  t.equal(pav.hasNoNull([1, 'a', 'aa']), true, 'no null');
  t.equal(pav.hasNoNull([1, null, 'aa']), false, 'empty');
});

test('discard placeholders', (t) => {
  t.plan(5);
  t.equal(pav.discardPlaceholders(null), null, 'with null');
  t.equal(pav.discardPlaceholders('12345{{ user }}6{{a.b1.c}}7{{sum(10,1)}}'),
   '1234567', 'A');
  t.equal(pav.discardPlaceholders('1[{{ user[0] }}]2', '[{{', '}}]'), '12', 'B');
  t.equal(pav.discardPlaceholders('1({{ user[0] }})2', '({{', '}})'), '12', 'B');
  t.equal(pav.discardPlaceholders('1<a>{{ user }}</a>2',
     '<a>{{', '}}</a>'), '12', 'C');
});

test('extract placeholders', (t) => {
  t.plan(4);
  const given = '12345{{user}}6{{a.b1.c}}7{{a.b[3]}}';
  t.deepEqual(pav.extractPlaceholders(null), [], 'with null');
  t.deepEqual(pav.extractPlaceholders(given), ['user', 'a.b1.c', 'a.b[3]'], 'A');
  t.deepEqual(pav.extractPlaceholders('1[{{ u1 }}]2', '[{{', '}}]'), ['u1'], 'B');
  t.deepEqual(pav.extractPlaceholders('1<a>{{ user }}</a>2<a>{{ name }}</a>3',
     '<a>{{', '}}</a>'), ['user', 'name'], 'C');
});

test('get an array inside an array', (t) => {
  t.plan(5);
  t.deepEqual(pav.getArrInArr([0, 0, 0], [a31, a123, a2135]),
   [a31[0], a123[0], a2135[0]], 'first');
  t.deepEqual(pav.getArrInArr([1, 1, 1], [a31, a123, a2135]),
    [a31[1], a123[1], a2135[1]], 'second');
  t.deepEqual(pav.getArrInArr([5, 7, 8], [a31, a123, a2135]),
     null, 'none');
  t.deepEqual(pav.getArrInArr([1, 1, 1], [a31, a1N3, a2135]),
    [a31[1], a1N3[1], a2135[1]], 'with null');
  t.deepEqual(pav.getArrInArr([1, 1, 1], [a31, a1U3, a2135]),
      [a31[1], a1U3[1], a2135[1]], 'with undefined');
});

test('decrement an index of array starting from head', (t) => {
  t.plan(12);
  t.deepEqual(pav.decArrayIndex([3, 2], [3, 2]), [2, 2], 'A');
  t.deepEqual(pav.decArrayIndex([0, 2], [3, 2]), [3, 1], 'B');
  t.deepEqual(pav.decArrayIndex([0, 1], [3, 2]), [3, 0], 'C');
  t.deepEqual(pav.decArrayIndex([1, 0], [3, 2]), [0, 0], 'D');
  t.deepEqual(pav.decArrayIndex([0, 0], [3, 2]), [-1, 0], 'E');
  t.deepEqual(pav.decArrayIndex([2, 2, 4], [3, 2, 4]), [1, 2, 4], 'F');
  t.deepEqual(pav.decArrayIndex([0, 2, 4], [3, 2, 4]), [3, 1, 4], 'G');
  t.deepEqual(pav.decArrayIndex([0, 0, 4], [3, 2, 4]), [3, 2, 3], 'H');
  t.deepEqual(pav.decArrayIndex([1, 0, 0], [3, 2, 4]), [0, 0, 0], 'I');
  t.deepEqual(pav.decArrayIndex([0, 0, 0], [3, 2, 4]), [-1, 0, 0], 'J');
  t.deepEqual(pav.decArrayIndex([0, 0, 0, 0], [3, 2, 4, 5]), [-1, 0, 0, 0], 'K');
  t.deepEqual(pav.decArrayIndex([0, 1, 0, 0], [3, 2, 4, 5]), [3, 0, 0, 0], 'L');
});


test('combine a list of list', (t) => {
  let i;
  let j;
  let k;
  t.plan(2);
  const expected = [];

  for (i of a2135) {
    for (j of a123) {
      for (k of a31) {
        expected.push([k, j, i]);
      }
    }
  }
  const actual = pav.combineListOfList([a31, a123, a2135]);
  t.equal(actual.length, 2 * 3 * 4, 'size');
  t.deepEqual(actual, expected.reverse(), 'Table');
});

test('combine a list of list with null', (t) => {
  let i;
  let j;
  let k;
  t.plan(2);
  const expected = [];

  for (i of a2135) {
    for (j of a1N3) {
      for (k of a31) {
        expected.push([k, j, i]);
      }
    }
  }
  const actual = pav.combineListOfList([a31, a1N3, a2135]);
  t.equal(actual.length, 2 * 3 * 4, 'size');
  t.deepEqual(actual, expected.reverse(), 'Table');
});

test('combine a list of list with undefined', (t) => {
  let i;
  let j;
  let k;
  t.plan(2);
  const expected = [];

  for (i of a2135) {
    for (j of a1U3) {
      for (k of a31) {
        expected.push([k, j, i]);
      }
    }
  }
  const actual = pav.combineListOfList([a31, a1U3, a2135]);
  t.equal(actual.length, 2 * 3 * 4, 'size');
  t.deepEqual(actual, expected.reverse(), 'Table');
});

test('get highest ranked combination', (t) => {
  let i;
  let j;
  let k;
  t.plan(1);
  const combi = [];

  for (i of a2135) {
    for (j of a123) {
      for (k of a31) {
        combi.push([k, j, i]);
      }
    }
  }

  const actual = pav.highestRankedCombination(combi);
  t.deepEqual(actual, ['aaa', 'bbb', 'ccccc'], 'maximum');
});

test('get highest ranked combination with null', (t) => {
  let i;
  let j;
  let k;
  t.plan(1);
  const combi = [];

  for (i of a2135) {
    for (j of ['b', 'bb', null]) {
      for (k of a31) {
        combi.push([k, j, i]);
      }
    }
  }

  const actual = pav.highestRankedCombination(combi);
  t.deepEqual(actual, ['aaa', 'bb', 'ccccc'], 'maximum');
});

test('get lowest ranked combination', (t) => {
  let i;
  let j;
  let k;
  t.plan(1);
  const combi = [];

  for (i of a2135) {
    for (j of ['b', 'bb', null]) {
      for (k of a31) {
        combi.push([k, j, i]);
      }
    }
  }

  const actual = pav.highestRankedCombination(combi, l => -1 * pav.sumSize(l));
  t.deepEqual(actual, ['a', 'b', 'c'], 'minimum');
});

test('coalesce should default to function when the first fail', (t) => {
  const nullFn = () => null;
  const valFn = value => value + 3;
  const valFn2 = value => value + 10;
  t.plan(5);
  t.equal(pav.coalesce([nullFn, valFn], 2), 5, 'NV');
  t.equal(pav.coalesce([valFn, valFn2], 2), 5, 'VV');
  t.equal(pav.coalesce([nullFn, nullFn, valFn], 2), 5, 'NNV');
  t.equal(pav.coalesce([nullFn, valFn, valFn2], 2), 5, 'NVV');
  t.equal(pav.coalesce([nullFn, nullFn], 2), null, 'NN');
});

test('extract values from paths', (t) => {
  const data = {
    t1: 't1v',
    t2: {
      t2a1: 't2a1v',
      t2a2: 't2a2v',
      t2a3: 't2a3v',
    },
  };
  const tUpper = value => value.toUpperCase();
  const props = { a: [tUpper, 't1', 't2.t2a1'], b: ['t2.t2a3'] };
  const expected = { a: ['T1V', 'T2A1V'], b: ['t2a3v'] };

  t.plan(1);
  t.deepEqual(pav.extractValuesFromPaths(props, data), expected, 'A');
});

test('void template', (t) => {
  const ph1 = ['<a>{{', '}}</a>'];
  const ph2 = ['<b>{{', '}}</b>'];
  const t1 = '1<a>{{jdsljals}}</a>2';
  const t2 = '1<a>{{jdsljals}}</a>2<b>{{dsal}}</b>3';
  t.plan(3);
  t.equal(pav.voidTemplate([ph1], t1), '12', 'A');
  t.equal(pav.voidTemplate([ph1, ph2], t2), '123', 'B');
  t.equal(pav.voidTemplate([ph2, ph1], t2), '123', 'C');
});

test('void template markdown style', (t) => {
  const ph1 = ['[{{', '}}]'];
  const ph2 = ['({{', '}})'];
  const t1 = '1[{{jdsljals}}]2';
  const t2 = '1[{{jdsljals}}]2({{dsal}})3';
  t.plan(3);
  t.equal(pav.voidTemplate([ph1], t1), '12', 'A');
  t.equal(pav.voidTemplate([ph1, ph2], t2), '123', 'B');
  t.equal(pav.voidTemplate([ph2, ph1], t2), '123', 'C');
});

test('get template params', (t) => {
  const propsData = { a: ['A', 'B'], b: ['C'], c: [null, 'D', 'E'], d: 'G' };
  const expect = { a: 'X', b: 'C', c: 'D', d: 'Y' };
  t.plan(1);
  t.deepEqual(pav.getTemplateParams(propsData, ['a', 'd'], ['X', 'Y']), expect, 'A');
});

test('is template applicable', (t) => {
  const propsData = { a: ['A', null], b: ['C'], c: [null, 'D', 'E'], d: [null, null] };
  const f1 = () => true;
  t.plan(6);
  t.ok(pav.isTemplateApplicable('template', propsData), 'S');
  t.ok(pav.isTemplateApplicable({ every: ['a'] }, propsData), 'A');
  t.ok(pav.isTemplateApplicable({ every: ['a', 'b', 'c'] }, propsData), 'ABC');
  t.notOk(pav.isTemplateApplicable({ every: ['d'] }, propsData), 'D');
  t.notOk(pav.isTemplateApplicable({ every: ['d', 'a'] }, propsData), 'DA');
  t.ok(pav.isTemplateApplicable({ every: [f1, 'd', 'a'] }, propsData), 'f1');
});

test('render the fittest among many', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: ['<a>{{a}}</a> to <b>{{b}}</b> to <c>{{c}}</c>',
      '<b>{{a}}</b> to <c>{{b}}</c>'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k1'] },
    placeholders: {
      clean: [['<a>{{', '}}</a>']],
      extract: [['<b>{{', '}}</b>'], ['<c>{{', '}}</c>']],
    },
  };

  const data = {
    k1: 'k1v',
    k2: 'k2v',
    k3: 'k3v',
    k4: 'k4v',
  };

  const selector = () => ['. to . to .', 'K3V', 'k4v'];

  t.plan(1);
  const actual = pav.renderFittest(conf, data, selector);
  t.equal(actual, '<a>k1v</a> to <b>K3V</b> to <c>k4v</c>', 'A');
});

test('render the fittest with advanced template', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: [{ every: ['a', 'b', 'c'],
      t: '<a>{{a}}</a> to <b>{{b}}</b> to <c>{{c}}</c>' },
      '<b>{{a}}</b> to <c>{{b}}</c>'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k1'] },
    placeholders: {
      clean: [['<a>{{', '}}</a>']],
      extract: [['<b>{{', '}}</b>'], ['<c>{{', '}}</c>']],
    },
  };

  const data = {
    k1: 'k1v',
    k2: 'k2v',
    k3: 'k3v',
    k4: 'k4v',
  };

  const selector = () => ['. to . to .', 'K3V', 'k4v'];

  t.plan(1);
  const actual = pav.renderFittest(conf, data, selector);
  t.equal(actual, '<a>k1v</a> to <b>K3V</b> to <c>k4v</c>', 'A');
});

test('render the fittest with advanced template and exclusion', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: [{ every: ['d'],
      t: '<a>{{a}}</a> x <b>{{b}}</b> x <c>{{c}}</c>' },
      { every: ['a', 'b'],
        t: '<a>{{a}}</a> to <b>{{b}}</b> to <c>{{c}}</c>' },
      '<b>{{a}}</b> to <c>{{b}}</c>'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k1'], d: ['k9'] },
    placeholders: {
      clean: [['<a>{{', '}}</a>']],
      extract: [['<b>{{', '}}</b>'], ['<c>{{', '}}</c>']],
    },
  };

  const data = {
    k1: 'k1v',
    k2: 'k2v',
    k3: 'k3v',
    k4: 'k4v',
  };

  const selector = () => ['. to . to .', 'K3V', 'k4v'];

  t.plan(1);
  const actual = pav.renderFittest(conf, data, selector);
  t.equal(actual, '<a>k1v</a> to <b>K3V</b> to <c>k4v</c>', 'A');
});

test('render the longest string combination among many', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: ['<a>{{a}}</a> to <b>{{b}}</b> to <c>{{c}}</c>',
      '<c>{{c}}</c>'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k6'] },
    placeholders: {
      clean: [['<a>{{', '}}</a>']],
      extract: [['<b>{{', '}}</b>'], ['<c>{{', '}}</c>']],
    },
  };

  const data = {
    k1: 'k1v1',
    k2: 'k1v11',
    k3: 'k3v',
    k4: 'k4v',
    k6: 'k4v66',
  };

  const expected1 = '<a>k1v1</a> to <b>K3V</b> to <c>k4v66</c>';
  const expected2 = '<c>k4v</c>';

  t.plan(3);
  t.equal(pav.renderLongest(conf, data), expected1, 'Longest');
  t.equal(pav.renderLongest(conf, data, 31), expected1, 'Longest within length');
  t.equal(pav.renderLongest(conf, data, 10), expected2, 'Longest with max');
});

test('render the longest string combination markdown style', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: ['({{a}}) to [{{b}}] to [{{c}}]',
      '[{{c}}]'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k6'] },
    placeholders: {
      clean: [['({{', '}})']],
      extract: [['[{{', '}}]']],
    },
  };

  const data = {
    k1: 'k1v1',
    k2: 'k1v11',
    k3: 'k3v',
    k4: 'k4v',
    k6: 'k4v66',
  };

  const expected1 = '(k1v1) to [K3V] to [k4v66]';
  const expected2 = '[k4v]';

  t.plan(3);
  t.equal(pav.renderLongest(conf, data), expected1, 'Longest');
  t.equal(pav.renderLongest(conf, data, 20), expected1, 'Longest within length');
  t.equal(pav.renderLongest(conf, data, 5), expected2, 'Longest with max');
});


test('render the longest string combination with exclusion', (t) => {
  const tUpper = value => value.toUpperCase();
  const conf = {
    templates: [{ every: ['d'],
      t: '<a>{{a}}</a> x <b>{{b}}</b> x <c>{{c}}</c>' },
      { every: ['a', 'b'],
        t: '<a>{{a}}</a> to <b>{{b}}</b> to <c>{{c}}</c>' },
      '<c>{{c}}</c>'],
    props: { a: ['k1', 'k2'], b: [tUpper, 'k3'], c: ['k4', 'k5', 'k6'], d: ['k9'] },
    placeholders: {
      clean: [['<a>{{', '}}</a>']],
      extract: [['<b>{{', '}}</b>'], ['<c>{{', '}}</c>']],
    },
  };

  const data = {
    k1: 'k1v1',
    k2: 'k1v11',
    k3: 'k3v',
    k4: 'k4v',
    k6: 'k4v66',
  };

  const expected1 = '<a>k1v1</a> to <b>K3V</b> to <c>k4v66</c>';
  const expected2 = '<c>k4v</c>';

  t.plan(2);
  t.equal(pav.renderLongest(conf, data), expected1, 'Longest');
  t.equal(pav.renderLongest(conf, data, 10), expected2, 'Longest with max');
});
