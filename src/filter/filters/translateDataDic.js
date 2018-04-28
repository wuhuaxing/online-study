/*
 * data: 需要翻译的数据
 * dict: 数据字典
 * sep: 数据分隔符
 * con: 数据连接符
 * key: 返回数据的键值
 */
function translateDataDic (data, dict, {sep = ',', con = '、', key = 'code', isArray = false} = {}) {
    let arr = []
    if (data !== null && data !== '') {
        // debugger
        data = data.toString().split(sep)
        dict.forEach(function (i){
            if (data.includes(i[key].toString())) arr.push(i.name)
        })
    }
    if (isArray) {
        return arr
    } else {
        return arr.join(con)
    }
}

export default translateDataDic
