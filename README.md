# pick-alternate-value

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Pick the most suitable value from a list of possible values

## Install

```sh
npm i -D pick-alternate-value
```

## Usage

```js
import pickAlternateValue from "pick-alternate-value"

pickAlternateValue() // true
```

## Functions

<dl>
<dt><a href="#pickLongestSize">pickLongestSize(list, defaultValue, max)</a> ⇒ <code>object</code></dt>
<dd><p>Pick the first string (or object) with the longest size</p>
</dd>
<dt><a href="#pickShortestSize">pickShortestSize(list, defaultValue, min)</a> ⇒ <code>object</code></dt>
<dd><p>Pick the first string (or object) with the shortest size</p>
</dd>
<dt><a href="#sumSize">sumSize(list)</a> ⇒ <code>integer</code></dt>
<dd><p>Adds the size of all the items in the list</p>
</dd>
<dt><a href="#minSize">minSize(list)</a> ⇒ <code>integer</code></dt>
<dd><p>Finds the minimum size of all the items in the list</p>
</dd>
<dt><a href="#maxSize">maxSize(list)</a> ⇒ <code>integer</code></dt>
<dd><p>Finds the maximum size of all the items in the list</p>
</dd>
<dt><a href="#hasNoNull">hasNoNull(list)</a> ⇒ <code>integer</code></dt>
<dd><p>Returns true if the list does not contain any null</p>
</dd>
<dt><a href="#discardPlaceholders">discardPlaceholders(template, phStart, phEnd)</a> ⇒ <code>string</code></dt>
<dd><p>Discard the placeholders of a string template. Useful to check
the minimum length of a template.</p>
</dd>
<dt><a href="#getArrInArr">getArrInArr(arrIdx, listOfList)</a> ⇒ <code>array</code></dt>
<dd><p>Gets an array using an array of indexes</p>
</dd>
<dt><a href="#decArrayIndex">decArrayIndex(arrIdx, maxIdx)</a> ⇒ <code>array</code></dt>
<dd><p>Decrements an array of indexes from left to right.
For right to left, uses .reverse().
This is useful for iterating over indices.</p>
</dd>
<dt><a href="#combineListOfList">combineListOfList(listOfList)</a> ⇒ <code>array</code></dt>
<dd><p>Combine a list of list in a similar as imbricated for loops</p>
</dd>
<dt><a href="#highestRankedCombination">highestRankedCombination(listCombination, rankFn, filterFn)</a> ⇒ <code>array</code></dt>
<dd><p>Finds the combination with the highest rank</p>
</dd>
</dl>

<a name="pickLongestSize"></a>

## pickLongestSize(list, defaultValue, max) ⇒ <code>object</code>
Pick the first string (or object) with the longest size

**Kind**: global function  
**Returns**: <code>object</code> - The object or string that is the longest  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |
| defaultValue | <code>object</code> | the object/string to return if null |
| max | <code>integer</code> | the maximum size that is allowed |

**Example**  
```js
// returns abcd
pav.pickLongestSize(['ab', 'a', 'abcd'])
```
<a name="pickShortestSize"></a>

## pickShortestSize(list, defaultValue, min) ⇒ <code>object</code>
Pick the first string (or object) with the shortest size

**Kind**: global function  
**Returns**: <code>object</code> - The object or string that is the longest  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |
| defaultValue | <code>object</code> | the object/string to return if null |
| min | <code>integer</code> | the minimum size that is allowed |

**Example**  
```js
// returns a1
pav.pickShortestSize(['abd', 'a1', 'a2', 'abc'])
```
<a name="sumSize"></a>

## sumSize(list) ⇒ <code>integer</code>
Adds the size of all the items in the list

**Kind**: global function  
**Returns**: <code>integer</code> - The sum of all the sizes  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |

**Example**  
```js
// returns 7
pav.sumSize(['ab', 'a', 'abcd'])
```
<a name="minSize"></a>

## minSize(list) ⇒ <code>integer</code>
Finds the minimum size of all the items in the list

**Kind**: global function  
**Returns**: <code>integer</code> - The minimum of all the sizes  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |

**Example**  
```js
// returns 1
pav.minSize(['ab', 'a', 'abcd'])
```
<a name="maxSize"></a>

## maxSize(list) ⇒ <code>integer</code>
Finds the maximum size of all the items in the list

**Kind**: global function  
**Returns**: <code>integer</code> - The maximum of all the sizes  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |

**Example**  
```js
// returns 4
pav.maxSize(['ab', 'a', 'abcd'])
```
<a name="hasNoNull"></a>

## hasNoNull(list) ⇒ <code>integer</code>
Returns true if the list does not contain any null

**Kind**: global function  
**Returns**: <code>integer</code> - true if no null  

| Param | Type | Description |
| --- | --- | --- |
| list | <code>array</code> | list of strings or objects |

**Example**  
```js
// returns false
pav.hasNoNull(['ab', null, 'abcd'])
```
<a name="discardPlaceholders"></a>

## discardPlaceholders(template, phStart, phEnd) ⇒ <code>string</code>
Discard the placeholders of a string template. Useful to check
the minimum length of a template.

**Kind**: global function  
**Returns**: <code>string</code> - The template without ny placeholders  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | list of strings or objects |
| phStart | <code>string</code> | the placeholder start keyword |
| phEnd | <code>string</code> | the placeholder end keyword |

**Example**  
```js
// returns 123456
pav.discardPlaceholders('1234${placeholder}56','${','}')
```
<a name="getArrInArr"></a>

## getArrInArr(arrIdx, listOfList) ⇒ <code>array</code>
Gets an array using an array of indexes

**Kind**: global function  
**Returns**: <code>array</code> - the selected list  

| Param | Type | Description |
| --- | --- | --- |
| arrIdx | <code>array</code> | an array of indices |
| listOfList | <code>array</code> | a list of list |

**Example**  
```js
// returns ['b', '1']
pav.getArrInArr([1, 1], [['a','b'], [1, 2]])
```
<a name="decArrayIndex"></a>

## decArrayIndex(arrIdx, maxIdx) ⇒ <code>array</code>
Decrements an array of indexes from left to right.
For right to left, uses .reverse().
This is useful for iterating over indices.

**Kind**: global function  
**Returns**: <code>array</code> - the selected list  

| Param | Type | Description |
| --- | --- | --- |
| arrIdx | <code>array</code> | an array of indices |
| maxIdx | <code>array</code> | an array of the maximum indices |

**Example**  
```js
// returns [1, 2, 4]
pav.decArrayIndex([2, 2, 4], [3, 2, 4])
```
<a name="combineListOfList"></a>

## combineListOfList(listOfList) ⇒ <code>array</code>
Combine a list of list in a similar as imbricated for loops

**Kind**: global function  
**Returns**: <code>array</code> - All the possible combinations in reverse order  

| Param | Type | Description |
| --- | --- | --- |
| listOfList | <code>array</code> | a list of list |

**Example**  
```js
// returns [['b', 2], ['a', 2], ['b', 1], ['a', 1]]
pav.combineListOfList([['a','b'], [1, 2]])
```
<a name="highestRankedCombination"></a>

## highestRankedCombination(listCombination, rankFn, filterFn) ⇒ <code>array</code>
Finds the combination with the highest rank

**Kind**: global function  
**Returns**: <code>array</code> - The highest ranked combination  

| Param | Type | Description |
| --- | --- | --- |
| listCombination | <code>array</code> | a list of list |
| rankFn | <code>function</code> | a function which returns the rank. Default by size |
| filterFn | <code>function</code> | a function which filter only the suitable combination. |

**Example**  
```js
// returns ['bb', 22]
pav.highestRankedCombination([['bb', 2], ['a', 22], ['b', 1], ['a', 1]])
```


## License

MIT © [olih](http://github.com/flarebyte)

[npm-url]: https://npmjs.org/package/pick-alternate-value
[npm-image]: https://img.shields.io/npm/v/pick-alternate-value.svg?style=flat-square

[travis-url]: https://travis-ci.org/flarebyte/pick-alternate-value
[travis-image]: https://img.shields.io/travis/flarebyte/pick-alternate-value.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/flarebyte/pick-alternate-value
[coveralls-image]: https://img.shields.io/coveralls/flarebyte/pick-alternate-value.svg?style=flat-square

[depstat-url]: https://david-dm.org/flarebyte/pick-alternate-value
[depstat-image]: https://david-dm.org/flarebyte/pick-alternate-value.svg?style=flat-square

[download-badge]: http://img.shields.io/npm/dm/pick-alternate-value.svg?style=flat-square
