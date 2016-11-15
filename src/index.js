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
 * Returns true if the list does not contain any null
 * @param {array} list - list of strings or objects
 * @example
 * // returns false
 * pav.hasNoNull(['ab', null, 'abcd'])
 * @return {integer} true if no null
 */
const hasNoNull = list => !_.some(list, _.isNil);
const anyNames = '[A-Za-z0-9.,)(\\[\\]\'-]+';

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
  const phS = _.escapeRegExp(phStart);
  const phE = _.escapeRegExp(phEnd);
  const search = new RegExp(`${phS}\\s*${anyNames}\\s*${phE}`, 'g');
  const withoutVars = template.replace(search, '');
  return withoutVars;
};

/**
 * Extract the placeholders of a string template.
 * @param {string} template - list of strings or objects
 * @param {string} phStart - the placeholder start keyword
 * @param {string} phEnd - the placeholder end keyword
 * @example
 * // returns placeholder
 * pav.extractPlaceholders('1234${placeholder}56','${','}')
 * @return {array} all the placeholders
 */
const extractPlaceholders = (template, phStart = '${', phEnd = '}') => {
  if (_.isNil(template)) return [];
  const phS = _.escapeRegExp(phStart);
  const phE = _.escapeRegExp(phEnd);
  const search = new RegExp(`${phS}\\s*(${anyNames})\\s*${phE}`, 'g');
  const results = [];
  let match = search.exec(template);
  while (match !== null) {
    results.push(match[1]);
    match = search.exec(template);
  }

  return results;
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

/**
 * Finds the combination with the highest rank
 * @param {array} listCombination - a list of list
 * @param {function} rankFn - a function which returns the rank. Default by size
 * @param {function} filterFn - a function which filter only the suitable
 * combination.
 * @example
 * // returns ['bb', 22]
 * pav.highestRankedCombination([['bb', 2], ['a', 22], ['b', 1], ['a', 1]])
 * @return {array} The highest ranked combination
 */
const highestRankedCombination = (listCombination,
  rankFn = sumSize, filterFn = hasNoNull) => {
  const filtered = _.filter(listCombination, filterFn);
  if (_.isEmpty(filtered)) return null;
  const sorted = _.sortBy(filtered, rankFn);
  return _.last(sorted);
};

/**
 * Run functions sequentially until one succeeds or return null.
 * @param {array} fns - a list of functions
 * @param {object} value - a value to be passed to each function
 * @example
 * // returns the result of f1('value') otherwise the value of f2('value')
 * pav.coalesce([f1, f2], 'value')
 * @return {array} The result of applying the passed function
 */

const coalesce = (fns, value) => {
  const len = fns.length;
  for (let i = 0; i < len; i += 1) {
    const result = fns[i](value);
    const isNotNull = !_.isNil(result);
    if (isNotNull) {
      return result;
    }
  }
  return null;
};

const extractValuesFromPaths = (conf, data) => {
  const getValue = path => _.get(data, path);
  const propToValues = p => _.map(p, getValue);
  const propsData = _.mapValues(conf.props, propToValues);
  return propsData;
};

const voidTemplate = (conf, template) => {
  let templateZ = template;
  _.forEach(conf.placeholders.clean, (p) => {
    templateZ = discardPlaceholders(templateZ, p[0], p[1]);
  });
  return templateZ;
};

const getTemplateParams = (propsData, placeholders, selected) => {
  const params = _.mapValues(propsData, _.head);
  const selParams = _.zipObject(placeholders, selected);
  _.defaults(selParams, params);
  return selParams;
};

const renderFitest = (conf, data, selector) => {
  const len = conf.templates.length;
  const propsData = extractValuesFromPaths(conf, data);

  for (let i = 0; i < len; i += 1) {
    const template = conf.templates[i];
    const templateZ = voidTemplate(conf, template);

    const extractPhld = p => extractPlaceholders(template, p[0], p[1]);
    const placeholders = _.flatMap(conf.placeholders.extract, extractPhld);
    const listOfList = _.map(placeholders, p => propsData[p]);
    listOfList.unshift(templateZ);
    const selected = selector(listOfList);
    const isNotNull = !_.isNil(selected);
    if (isNotNull) {
      const paramsObj = getTemplateParams(propsData, placeholders, selected);
      return _.template(template)(paramsObj);
    }
  }// end for
  return null;
};

const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minSize,
  maxSize,
  hasNoNull,
  discardPlaceholders,
  extractPlaceholders,
  getArrInArr,
  decArrayIndex,
  combineListOfList,
  highestRankedCombination,
  coalesce,
  renderFitest,
};

module.exports = pickAlternateValue;
