import _ from 'lodash';


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

const sumSize = list =>
   _.sumBy(list, s => _.size(s))
;

const minSize = (list) => {
  const noNullList = _.filter(list, s => !_.isNil(s));
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  return _.size(_.head(sorted));
};

const maxSize = (list) => {
  const noNullList = _.filter(list, s => !_.isNil(s));
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s));
  return _.size(_.last(sorted));
};

const discardPlaceholders = (template, phStart = '${', phEnd = '}') => {
  if (_.isNil(template)) return null;
  const anyNames = '[A-Za-z0-9(),.]+';
  const phS = _.escapeRegExp(phStart);
  const phE = _.escapeRegExp(phEnd);
  const search = new RegExp(`${phS}\\s*${anyNames}\\s*${phE}`, 'g');
  const withoutVars = template.replace(search, '');
  return withoutVars;
};

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

const flattenListOfList = (listOfList) => {
  if (_.isEmpty(listOfList)) return null;
  const maxIdx = _.map(listOfList, n => _.size(n) - 1);
  let idx = maxIdx;
  const size = _.size(listOfList);
  const idxZero = _.fill(Array(size), 0);
  const result = [];

  while (!_.isEqual(idx, idxZero)) {
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
  flattenListOfList,
};

module.exports = pickAlternateValue;
