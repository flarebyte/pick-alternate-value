import _ from "lodash"


const pickLongestSize = (list) => {
  if (_.isEmpty(list)) return null;
  const sorted = _.sortBy(list, s => _.size(s))
  const maxSize = _.size(_.last(sorted))
  const filtered = _.filter(list, s => _.size(s) ===  maxSize)
  return _.head(filtered)
}

const pickShortestSize = (list) => {
  if (_.isEmpty(list)) return null;
  const sorted = _.sortBy(list, s => _.size(s))
  const minSize = _.size(_.head(sorted))
  const filtered = _.filter(list, s => _.size(s) ===  minSize)
  return _.head(filtered)
}

const sumSize = () => {

}

const minLengthOfStringTemplate = () => {

}

const calculateAltSizeTable = () => {

}

const pickAlternateValue = {
  pickLongestSize,
  pickShortestSize,
  sumSize,
  minLengthOfStringTemplate,
  calculateAltSizeTable
}

module.exports=pickAlternateValue
