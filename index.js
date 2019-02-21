'use strict';

const KEYWORD = ''
const FILE_PATH = ''

const _ = require('lodash')
const fs = require('fs')

function getJSONFileStr (filePath) {
	return new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', function (err, d) {
			if (err) return reject(err)
			resolve(d)
		})
	})
}

function parseStringToObject(str) {
	const parseData = JSON.parse(str)
	return parseData.result
}

~ function main () {
	let appData = void 0
	getJSONFileStr(FILE_PATH)
		.then((str) => {
      appData = parseStringToObject(str)
      const result = searchReculsive({data: appData, keyword: KEYWORD})
      console.log(result)
		})
		.catch((err) => {
			console.log(err)
		})
} ()

function isFind ({data = {}, targets = ['name'], keyword = '', isCase = false} = {}) {
  const caseKeyword = isCase ? keyword : keyword.toLowerCase()
  let flag = false

  for (let i = 0, l = targets.length; i < l; i++) {
    const target = targets[i]
    if (!_.isString(data[target])) continue
    const targetStr = isCase ? data[target] : data[target].toLowerCase()
    if (targetStr.indexOf(caseKeyword) >= 0) {
      flag = true
    }
  }
  return flag
}

function searchReculsive ({data = {}, targets = ['name'], keyword = '', isCase = false} ={}) {
  keyword = keyword.toLowerCase()
  var res = _.map(data, (o) => {
    let appData = void 0
    if (isFind({data: o, targets, keyword})) {
      appData = _.cloneDeep(o)
    }
    if (!appData && o.children) {
      var tempData = searchReculsive({data: o.children, targets, keyword, isCase})
      if (_.isArray(tempData) && tempData.length > 0) {
        appData = _.assign(o, {
          children: tempData
        })
      }
    }
    return appData
  })
  return _.filter(res, (o) => !!o)
}
