import _ from "lodash"


const pickLongestSize = (list) => {
  const noNullList = _.filter(list , s => !_.isNil(s))
  if (_.isEmpty(noNullList)) return null;
  const sorted = _.sortBy(noNullList, s => _.size(s))
  const maxSize = _.size(_.last(sorted))
  const filtered = _.filter(noNullList, s => _.size(s) ===  maxSize)
  return _.head(filtered)
}

const pickShortestSize = (list) => {
  const noNullList = _.filter(list , s => !_.isNil(s))
  if (_.isEmpty(noNullList)) return null;
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

const minLengthOfStringTemplate = () => {

}

const calculateAltSizeTable = () => {

}

const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minSize,
  maxSize,
  minLengthOfStringTemplate,
  calculateAltSizeTable
}

module.exports=pickAlternateValue
