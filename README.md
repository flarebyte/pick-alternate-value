# pick-alternate-value

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]
[![Downloads][download-badge]][npm-url]

> Pick the most suitable value from a list of possible values

This is a flexible library which facilitates the rendering of text based on
a template and a list of alternate parameters. Alternate parameters can be
evaluated against a criteria to select the fittest.

## Install

```sh
npm i -D pick-alternate-value
```

## Usage

```js
import pav from "pick-alternate-value"

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
pav.renderLongest(conf, data)
// return <a>k1v1</a> to <b>K3V</b> to <c>k4v66</c>
pav.renderLongest(conf, data, 10)
// return <c>k4v</c>
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
<dt><a href="#extractPlaceholders">extractPlaceholders(template, phStart, phEnd)</a> ⇒ <code>array</code></dt>
<dd><p>Extract the placeholders of a string template.</p>
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
<dt><a href="#coalesce">coalesce(fns, value)</a> ⇒ <code>array</code></dt>
<dd><p>Run functions sequentially until one succeeds or return null.</p>
</dd>
<dt><a href="#extractValuesFromPaths">extractValuesFromPaths(props, data)</a> ⇒ <code>object</code></dt>
<dd><p>Uses json paths mapping to transform an object</p>
</dd>
<dt><a href="#voidTemplate">voidTemplate(placeholders4clean, template)</a> ⇒ <code>object</code></dt>
<dd><p>Creates a template without specific placeholders</p>
</dd>
<dt><a href="#getTemplateParams">getTemplateParams(propsData, placeholders, selected)</a> ⇒ <code>object</code></dt>
<dd><p>Build template parameters based on given placeholders</p>
</dd>
<dt><a href="#renderFittest">renderFittest(conf, data, selector)</a> ⇒ <code>string</code></dt>
<dd><p>Render text based on a template with selection of the most suited (fit)
parameters.</p>
</dd>
<dt><a href="#renderLongest">renderLongest(conf, data, max)</a> ⇒ <code>string</code></dt>
<dd><p>Render text based on a template with selection of the longest
parameters.</p>
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
<a name="extractPlaceholders"></a>

## extractPlaceholders(template, phStart, phEnd) ⇒ <code>array</code>
Extract the placeholders of a string template.

**Kind**: global function  
**Returns**: <code>array</code> - all the placeholders  

| Param | Type | Description |
| --- | --- | --- |
| template | <code>string</code> | list of strings or objects |
| phStart | <code>string</code> | the placeholder start keyword |
| phEnd | <code>string</code> | the placeholder end keyword |

**Example**  
```js
// returns placeholder
pav.extractPlaceholders('1234${placeholder}56','${','}')
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
<a name="coalesce"></a>

## coalesce(fns, value) ⇒ <code>array</code>
Run functions sequentially until one succeeds or return null.

**Kind**: global function  
**Returns**: <code>array</code> - The result of applying the passed function  

| Param | Type | Description |
| --- | --- | --- |
| fns | <code>array</code> | a list of functions |
| value | <code>object</code> | a value to be passed to each function |

**Example**  
```js
// returns the result of f1('value') otherwise the value of f2('value')
pav.coalesce([f1, f2], 'value')
```
<a name="extractValuesFromPaths"></a>

## extractValuesFromPaths(props, data) ⇒ <code>object</code>
Uses json paths mapping to transform an object

**Kind**: global function  
**Returns**: <code>object</code> - An object with the extracted data  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>object</code> | describe each property with a list of paths. Optionally,  the first element can be a transformer function. |
| data | <code>object</code> | the data to extract the values from |

**Example**  
```js
// returns { a: ['3', '4'], b: '13' }
const x13 = value => value*13;
const data = {q: '1', p: {a: '3', b: '4'}}
pav.extractValuesFromPaths({ a: ['p.a', 'p.b'], b: [x13, 'q'] }, data)
```
<a name="voidTemplate"></a>

## voidTemplate(placeholders4clean, template) ⇒ <code>object</code>
Creates a template without specific placeholders

**Kind**: global function  
**Returns**: <code>object</code> - a template without these placeholders  

| Param | Type | Description |
| --- | --- | --- |
| placeholders4clean | <code>array</code> | a list of placeholders'start and end. |
| template | <code>string</code> | the template |

**Example**  
```js
// returns AABB
pav.voidTemplate([['<a>{{', '}}</a>']], 'AA<a>{{jdsljals}}</a>BB')
```
<a name="getTemplateParams"></a>

## getTemplateParams(propsData, placeholders, selected) ⇒ <code>object</code>
Build template parameters based on given placeholders

**Kind**: global function  
**Returns**: <code>object</code> - the merging of relevant parameters with default ones.  

| Param | Type | Description |
| --- | --- | --- |
| propsData | <code>object</code> | default parameters for the template |
| placeholders | <code>array</code> | a list of placeholder names |
| selected | <code>array</code> | the values associated with placeholder |

**Example**  
```js
// return { a: 'X', b: 'C', c: 'D', d: 'Y' }
pav.getTemplateParams({ a: ['A', 'B'], b: ['C'], c: [null, 'D', 'E'],
d: 'G' }, ['a', 'd'], ['X', 'Y'])
```
<a name="renderFittest"></a>

## renderFittest(conf, data, selector) ⇒ <code>string</code>
Render text based on a template with selection of the most suited (fit)
parameters.

**Kind**: global function  
**Returns**: <code>string</code> - the rendered template  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | configuration of the renderer |
| data | <code>object</code> | the live data |
| selector | <code>function</code> | a function which return the best selection of parameters |

**Example**  
```js
// return <a>k1v</a> to <b>K3V</b> to <c>k4v</c>
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
pav.renderFitest(conf, data, selector)
```
<a name="renderLongest"></a>

## renderLongest(conf, data, max) ⇒ <code>string</code>
Render text based on a template with selection of the longest
parameters.

**Kind**: global function  
**Returns**: <code>string</code> - the rendered template  

| Param | Type | Description |
| --- | --- | --- |
| conf | <code>object</code> | configuration of the renderer |
| data | <code>object</code> | the live data |
| max | <code>integer</code> | maximum length of the generated string |

**Example**  
```js
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
 pav.renderLongest(conf, data)
 // return <a>k1v1</a> to <b>K3V</b> to <c>k4v66</c>
 pav.renderLongest(conf, data, 10)
 // return <c>k4v</c>
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
