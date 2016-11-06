import _ from 'lodash';

/**
 * Pick the first string (or object) with the longest size
 * @param {array} list - list of strings or objects
 * @param {object} defaultValue - the object/string to return if null
 * @param {integer} max - the maximum size that is allowed
 * @example
 * // returns abcd
 * pav.pickLongestSize(['ab', 'a', 'abcd'])
 * @return {object} The object or string that is the longest
 */
const pickLongestSize = (list,
   defaultValue = null,
   max = Number.MAX_SAFE_INTEGER) => {
  const noNullList = _.filter(list, s => !_.isNil(s) && _.size(s) <= max);
  if (_.isEmpty(noNullList)) return defaultValue;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  const maxSize = _.size(_.last(sorted));
  const filtered = _.filter(noNullList, s => _.size(s) === maxSize);
  return _.head(filtered);
};

/**
 * Pick the first string (or object) with the shortest size
 * @param {array} list - list of strings or objects
 * @param {object} defaultValue - the object/string to return if null
 * @param {integer} min - the minimum size that is allowed
 * @example
 * // returns a1
 * pav.pickShortestSize(['abd', 'a1', 'a2', 'abc'])
 * @return {object} The object or string that is the longest
 */
const pickShortestSize = (list,
  defaultValue = null,
  min = -1
  ) => {
  const noNullList = _.filter(list, s => !_.isNil(s) && _.size(s) >= min);
  if (_.isEmpty(noNullList)) return defaultValue;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  const minSize = _.size(_.head(sorted));
  const filtered = _.filter(noNullList, s => _.size(s) === minSize);
  return _.head(filtered);
};

/**
 * Adds the size of all the items in the list
 * @param {array} list - list of strings or objects
 * @example
 * // returns 7
 * pav.sumSize(['ab', 'a', 'abcd'])
 * @return {integer} The sum of all the sizes
 */
const sumSize = list =>
   _.sumBy(list, s => _.size(s))
;

/**
 * Finds the minimum size of all the items in the list
 * @param {array} list - list of strings or objects
 * @example
 * // returns 1
 * pav.minSize(['ab', 'a', 'abcd'])
 * @return {integer} The minimum of all the sizes
 */
const minSize = (list) => {
  const noNullList = _.filter(list, s => !_.isNil(s));
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  return _.size(_.head(sorted));
};

/**
 * Finds the maximum size of all the items in the list
 * @param {array} list - list of strings or objects
 * @example
 * // returns 4
 * pav.maxSize(['ab', 'a', 'abcd'])
 * @return {integer} The maximum of all the sizes
 */
const maxSize = (list) => {
  const noNullList = _.filter(list, s => !_.isNil(s));
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  return _.size(_.last(sorted));
};

/**
 * Discard the placeholders of a string template. Useful to check
 * the minimum length of a template.
 * @param {string} template - list of strings or objects
 * @param {string} phStart - the placeholder start keyword
 * @param {string} phEnd - the placeholder end keyword
 * @example
 * // returns 123456
 * pav.discardPlaceholders('1234${placeholder}56','${','}')
 * @return {string} The template without ny placeholders
 */
const discardPlaceholders = (template, phStart = '${', phEnd = '}') => {
  if (_.isNil(template)) return null;
  const anyNames = '[A-Za-z0-9(),.]+';
  const phS = _.escapeRegExp(phStart);
  const phE = _.escapeRegExp(phEnd);
  const search = new RegExp(`${phS}\\s*${anyNames}\\s*${phE}`, 'g');
  const withoutVars = template.replace(search, '');
  return withoutVars;
};

/**
 * Gets an array using an array of indexes
 * @param {array} arrIdx - an array of indices
 * @param {array} listOfList - a list of list
 * @example
 * // returns ['b', '1']
 * pav.getArrInArr([1, 1], [['a','b'], [1, 2]])
 * @return {array} the selected list
 */
const getArrInArr = (arrIdx, listOfList) => {
  if (_.isNil(arrIdx) || _.isNil(listOfList)) return null;
  const sizeIdx = _.size(arrIdx);
  const sizeList = _.size(listOfList);
  if (sizeIdx !== sizeList) {
    throw new Error(`size idx ${sizeIdx} different of ${sizeList}`);
  }
  const result = [];
  for (let i = 0; i < sizeIdx; i += 1) {
    const value = listOfList[i][arrIdx[i]];
    if (_.isUndefined(value)) {
      return null;
    }
    result.push(value);
  }
  return result;
};

/**
 * Decrements an array of indexes from left to right.
 * For right to left, uses .reverse().
 * This is useful for iterating over indices.
 * @param {array} arrIdx - an array of indices
 * @param {array} maxIdx - an array of the maximum indices
 * @example
 * // returns [1, 2, 4]
 * pav.decArrayIndex([2, 2, 4], [3, 2, 4])
 * @return {array} the selected list
 */
const decArrayIndex = (arrIdx, maxIdx) => {
  const arrIdxl = _.cloneDeep(arrIdx);
  const maxIdxl = _.cloneDeep(maxIdx);
  const headDec = arrIdxl[0] - 1;
  if (_.size(arrIdxl) === 1) {
    return [headDec];
  }
  const tailIdx = _.tail(arrIdxl);
  const tailMaxIdx = _.tail(maxIdxl);
  const isAllZerosOnRight = _.every(tailIdx, n => n === 0);
  if (headDec < 0 && !isAllZerosOnRight) {
    const tailRes = decArrayIndex(tailIdx, tailMaxIdx);
    tailRes.unshift(maxIdxl[0]);
    return tailRes;
  }
  tailIdx.unshift(headDec);
  return tailIdx;
};

/**
 * Combine a list of list in a similar as imbricated for loops
 * @param {array} listOfList - a list of list
 * @example
 * // returns [['b', 2], ['a', 2], ['b', 1], ['a', 1]]
 * pav.combineListOfList([['a','b'], [1, 2]])
* @return {array} All the possible combinations in reverse order
 */
const combineListOfList = (listOfList) => {
  if (_.isEmpty(listOfList)) return null;
  const maxIdx = _.map(listOfList, n => _.size(n) - 1);
  let idx = maxIdx;
  const result = [];

  while (idx[0] !== -1) {
    const list = getArrInArr(idx, listOfList);
    result.push(list);
    idx = decArrayIndex(idx, maxIdx);
  }

  return result;
};


const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minSize,
  maxSize,
  discardPlaceholders,
  getArrInArr,
  decArrayIndex,
  combineListOfList,
};

module.exports = pickAlternateValue;
