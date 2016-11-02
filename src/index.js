import _ from "lodash"


const pickLongestSize = (list,
   max = Number.MAX_SAFE_INTEGER,
   defaultValue = null) => {
  const noNullList = _.filter(list , s => !_.isNil(s) && _.size(s) <= max )
  if (_.isEmpty(noNullList)) return defaultValue;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  const maxSize = _.size(_.last(sorted))
  const filtered = _.filter(noNullList, s => _.size(s) ===  maxSize)
  return _.head(filtered)
}

const pickShortestSize = (list,
  min = -1,
  defaultValue = null) => {
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

const calculateAltSizeTable = () => {

}

const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minSize,
  maxSize,
  minLengthOfTemplate,
  calculateAltSizeTable
}

module.exports=pickAlternateValue
