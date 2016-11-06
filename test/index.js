import test from 'tape';
import pav from '../src';


const a = 'A';
const b = 'B';
const c = 'C';
const a31 = ['aaa', 'a'];
const a123 = ['b', 'bb', 'bbb'];
const a2135 = ['cc', 'c', 'ccc', 'ccccc'];


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

test('discard placeholders', (t) => {
  t.plan(2);
  const p = '${';
  const given = `12345${p} user }6${p}a.b1.c}7${p}sum(10,15)}`;
  t.equal(pav.discardPlaceholders(null), null, 'with null');
  t.equal(pav.discardPlaceholders(given), '1234567', '');
});

test('get an array inside an array', (t) => {
  t.plan(3);
  t.deepEqual(pav.getArrInArr([0, 0, 0], [a31, a123, a2135]),
   [a31[0], a123[0], a2135[0]], 'first');
  t.deepEqual(pav.getArrInArr([1, 1, 1], [a31, a123, a2135]),
    [a31[1], a123[1], a2135[1]], 'second');
  t.deepEqual(pav.getArrInArr([5, 7, 8], [a31, a123, a2135]),
     null, 'none');
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

test('order list combination by rank', (t) => {
  let i;
  let j;
  let k;
  t.plan(3);
  const combi = [];

  for (i of a2135) {
    for (j of a123) {
      for (k of a31) {
        combi.push([k, j, i]);
      }
    }
  }
  const rankFn = (list => pav.sumSize(list));
  const actual = pav.orderListCombinationByRankDesc(combi, rankFn);
  t.equal(actual.length, 2 * 3 * 4, 'size');
  t.deepEqual(actual[0], ['aaa', 'bbb', 'ccccc'], 'maximum');
  t.deepEqual(actual[23], ['a', 'b', 'c'], 'minimum');
});
