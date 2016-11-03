import _ from "lodash"


const pickLongestSize = (list,
   defaultValue = null,
   max = Number.MAX_SAFE_INTEGER) => {
  const noNullList = _.filter(list , s => !_.isNil(s) && _.size(s) <= max )
  if (_.isEmpty(noNullList)) return defaultValue;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  const maxSize = _.size(_.last(sorted))
  const filtered = _.filter(noNullList, s => _.size(s) ===  maxSize)
  return _.head(filtered)
}

const pickShortestSize = (list,
  defaultValue = null,
  min = -1
  ) => {
  const noNullList = _.filter(list , s => !_.isNil(s) && _.size(s) >= min)
  if (_.isEmpty(noNullList)) return defaultValue;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  const minSize = _.size(_.head(sorted))
  const filtered = _.filter(noNullList, s => _.size(s) ===  minSize)
  return _.head(filtered)
}

const sumSize = (list) => {
  return _.sumBy(list, s => _.size(s))
}

const minSize = (list) => {
  const noNullList = _.filter(list , s => !_.isNil(s))
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  return _.size(_.head(sorted))
}

const maxSize = (list) => {
  const noNullList = _.filter(list , s => !_.isNil(s))
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  return _.size(_.last(sorted))
}

const minLengthOfTemplate = (template) => {
  if (_.isNil(template)) return null;
  const withoutVars = template.replace(/\$\{\s*[A-Za-z0-9.]+\s*\}/g,'')
  return _.size(withoutVars);
}

const getArrInArr = (arrIdx, listOfList) => {
  if (_.isNil(arrIdx) || _.isNil(listOfList) ) return null;
  const sizeIdx = _.size(arrIdx);
  const sizeList = _.size(listOfList)
  if (sizeIdx !== sizeList) {
    throw new Error(`size idx ${sizeIdx} different of ${sizeList}`)
  }
  var result = [];
  for (var i=0; i< sizeIdx; i++) {
    const value = listOfList[i][arrIdx[i]];
    if (_.isUndefined(value)) {
      return null;
    }
    result.push(value);
  }
  return result;
}

const decArrayIndex = (arrIdx, maxIdx) => {
  if (sumSize(arrIdx) === 0) return null;
  const size = _.size(arrIdx);
  result = [];
  const headDec = arrIdx[0]--;
  if (headDec === -1) {
    _.tail(arrIdx);
    //dec colum suivante
  } else {
    return _.tail(arrIdx).unshift(headDec);
  }

}

const calculateAltSizeTable = (listOfList) => {
  if (_.isEmpty(listOfList)) return null;
  const maxIdx = _.map(listOfList, n => _.size(listOfList)-1);
  var idx = maxIdx;
  const size = _.size(listOfList);
  const idxZero = _.fill(Array(size), 0);
  var result = [];

  //todo neg boolean
  while (_.isEqual(idx, idxZero)) {
    const list = getArrInArr(idx, listOfList);
    const sumOfList = sumSize(list);
    result.push([sumOfList, 0, list]);
    idx = decArrayIndex(idx, maxIdx);
  }

  return result;

}

const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minSize,
  maxSize,
  minLengthOfTemplate,
  getArrInArr,
  decArrayIndex,
  calculateAltSizeTable
}

module.exports=pickAlternateValue
