
import computeWidth from './filters/computeWidth.js'
import translateDataDic from './filters/translateDataDic.js'
import dateFormat from './filters/dateFormat.js'
export default {
	install (Vue, options) {
        Vue.prototype.getWidth = computeWidth,
        Vue.prototype.translateFun = translateDataDic,
        Vue.prototype.dateFormatFun = dateFormat
	}
}