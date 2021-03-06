import _ from 'lodash';
// Use mustache custom template delimiters.
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

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
const discardPlaceholders = (template, phStart = '{{', phEnd = '}}') => {
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
const extractPlaceholders = (template, phStart = '{{', phEnd = '}}') => {
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
    const id = arrIdx[i];
    const list = listOfList[i];
    const outOfBound = id >= _.size(list);
    if (outOfBound) {
      return null;
    }
    const value = list[id];
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

const startWithFunction = list => _.isFunction(_.head(list));

/**
 * Uses json paths mapping to transform an object
 * @param {object} props - describe each property with a list of paths. Optionally,
 the first element can be a transformer function.
 * @param {object} data - the data to extract the values from
 * @example
 * // returns { a: ['3', '4'], b: '13' }
 * const x13 = value => value*13;
 * const data = {q: '1', p: {a: '3', b: '4'}}
 * pav.extractValuesFromPaths({ a: ['p.a', 'p.b'], b: [x13, 'q'] }, data)
 * @return {object} An object with the extracted data
 */
const extractValuesFromPaths = (props, data) => {
  const propToValues = (paths) => {
    const isFn = startWithFunction(paths);
    const transf = isFn ? paths[0] : _.identity;
    const getValue = path => transf(_.get(data, path));
    const v = isFn ? _.map(_.tail(paths), getValue) : _.map(paths, getValue);
    return v;
  };
  const propsData = _.mapValues(props, propToValues);
  return propsData;
};

/**
 * Creates a template without specific placeholders
 * @param {array} placeholders4clean - a list of placeholders'start and end.
 * @param {string} template - the template
 * @example
 * // returns AABB
 * pav.voidTemplate([['<a>{{', '}}</a>']], 'AA<a>{{jdsljals}}</a>BB')
 * @return {object} a template without these placeholders
 */
const voidTemplate = (placeholders4clean, template) => {
  let templateZ = template;
  _.forEach(placeholders4clean, (p) => {
    templateZ = discardPlaceholders(templateZ, p[0], p[1]);
  });
  return templateZ;
};

/**
 * Returns true if the list contains at least one string.
 * @param {array} list - list of strings
 * @example
 * // returns true
 * pav.hasSomeString(['ab', null, 'abcd'])
 * @return {integer} true if some string
 */
const hasSomeString = list => _.some(list, _.isString);


const isTemplateApplicable = (template, props) => {
  if (_.isString(template)) {
    return true;
  }
  const every = template.every;
  if (_.isFunction(every[0])) {
    return _.head(every)(_.tail(every));
  }
  const all = _.map(every, k => hasSomeString(props[k]));
  return _.every(all, Boolean);
};

/**
 * Build template parameters based on given placeholders
 * @param {object} propsData - default parameters for the template
 * @param {array} placeholders - a list of placeholder names
 * @param {array} selected - the values associated with placeholder
 * @example
 * // return { a: 'X', b: 'C', c: 'D', d: 'Y' }
 * pav.getTemplateParams({ a: ['A', 'B'], b: ['C'], c: [null, 'D', 'E'],
 * d: 'G' }, ['a', 'd'], ['X', 'Y'])
 * @return {object} the merging of relevant parameters with default ones.
 */
const getTemplateParams = (propsData, placeholders, selected) => {
  const firstNotNull = list => _.find(list, _.negate(_.isNull));
  const params = _.mapValues(propsData, firstNotNull);
  const selParams = _.zipObject(placeholders, selected);
  _.defaults(selParams, params);
  return selParams;
};

/**
 * Render text based on a template with selection of the most suited (fit)
 * parameters.
 * @param {object} conf - configuration of the renderer
 * @param {object} data - the live data
 * @param {function} selector - a function which return the best selection of
 * parameters
 * @example
 * // return <a>k1v</a> to <b>K3V</b> to <c>k4v</c>
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

  * pav.renderFitest(conf, data, selector)
 * @return {string} the rendered template
 */
const renderFittest = (conf, data, selector) => {
  const len = conf.templates.length;
  const propsData = extractValuesFromPaths(conf.props, data);

  for (let i = 0; i < len; i += 1) {
    const templ = conf.templates[i];
    const isApplicable = isTemplateApplicable(templ, propsData);
    if (isApplicable) {
      const template = _.isString(templ) ? templ : templ.t;
      const templateZ = voidTemplate(conf.placeholders.clean, template);
      const extractPhld = p => extractPlaceholders(template, p[0], p[1]);
      const placeholders = _.flatMap(conf.placeholders.extract, extractPhld);

      const listOfList = _.map(placeholders, p => propsData[p]);
      listOfList.unshift([templateZ]);
      const selected = selector(listOfList);
      const isNotNull = !_.isNil(selected);
      if (isNotNull) {
        const paramsObj = getTemplateParams(propsData, placeholders, _.tail(selected));
        return _.template(template)(paramsObj);
      }
    } // end applicable
  }// end for
  return null;
};

/**
 * Render text based on a template with selection of the longest
 * parameters.
 * @param {object} conf - configuration of the renderer
 * @param {object} data - the live data
 * @param {integer} max - maximum length of the generated string
 * @example
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
 * @return {string} the rendered template
 */
const renderLongest = (conf, data, max = Number.MAX_SAFE_INTEGER) => {
  const sel = (list) => {
    const minTempl = discardPlaceholders(_.head(list));
    const sum = _.size(minTempl) + sumSize(_.tail(list));
    return hasNoNull(list) && (sum <= max);
  };
  const selector = (values) => {
    const listCombination = combineListOfList(values);
    return highestRankedCombination(listCombination, sumSize, sel);
  };

  return renderFittest(conf, data, selector);
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
  extractValuesFromPaths,
  voidTemplate,
  isTemplateApplicable,
  getTemplateParams,
  renderFittest,
  renderLongest,
};

module.exports = pickAlternateValue;
