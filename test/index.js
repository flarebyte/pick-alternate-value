import test from 'tape'
import pav from '../src'


test('pick the longest size', (t) => {
  const a = 'A'
  const b = 'B'
  const c = 'C'
  t.plan(8)
  t.equal(pav.pickLongestSize(null), null, 'null')
  t.equal(pav.pickLongestSize([]), null, 'empty')
  t.equal(pav.pickLongestSize([null, '']), '', 'discard null')
  t.equal(pav.pickLongestSize(['ab','a','abcd']),'abcd', 'A')
  t.equal(pav.pickLongestSize(['abcde','a','ab']),'abcde', 'B')
  t.equal(pav.pickLongestSize(['ab','ab1','ab2','a']),'ab1', 'take 1st of 2 eq')
  t.deepEqual(pav.pickLongestSize([[1,2],[1,2,3],[1]]),[1,2,3], 'arr of array')
  t.deepEqual(pav.pickLongestSize([{a,b},{a,b,c},{a}]),{a,b,c}, 'array of obj')
})

test('pick the shortest size', (t) => {
  const a = 'A'
  const b = 'B'
  const c = 'C'
  t.plan(8)
  t.equal(pav.pickShortestSize(null), null, 'null')
  t.equal(pav.pickShortestSize([]), null, 'empty')
  t.equal(pav.pickShortestSize([null, '', 'abc']),'', 'discard null')
  t.equal(pav.pickShortestSize(['ab','a','abcd']),'a', 'A')
  t.equal(pav.pickShortestSize(['abcde','a','ab']),'a', 'B')
  t.equal(pav.pickShortestSize(['abd','a1','a2','abc']),'a1', 'take 1st of 2 eq')
  t.deepEqual(pav.pickShortestSize([[1,2],[1,2,3],[1]]),[1], 'arr of array')
  t.deepEqual(pav.pickShortestSize([{a,b},{a,b,c},{a}]),{a}, 'array of obj')
})


test('sum the size', (t) => {
  const a = 'A'
  const b = 'B'
  const c = 'C'
  t.plan(6)
  t.equal(pav.sumSize(null), 0, 'zero')
  t.equal(pav.sumSize([]), 0, 'empty')
  t.equal(pav.sumSize(['ab','a','abcd']),7, 'A')
  t.equal(pav.sumSize(['ab','a',null]),3, 'with null')
  t.deepEqual(pav.sumSize([[1,2],[1,2,3],[1]]),6, 'arr of array')
  t.deepEqual(pav.sumSize([{a,b},{a,b,c},{a}]),6, 'array of obj')
})
