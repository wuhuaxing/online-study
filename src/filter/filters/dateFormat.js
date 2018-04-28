/*
 * 时间格式化
 * date: 时间戳
 * format: 转换格式
 *
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * eg:
 * yyyy-MM-dd hh:mm:ss.S => 2017-07-02 08:09:04.423
 * yyyy-MM-dd E HH:mm:ss => 2017-03-10 二 20:09:04
 * yyyy-MM-dd EE hh:mm:ss => 2017-03-10 周二 08:09:04
 * yyyy-MM-dd EEE hh:mm:ss => 2017-03-10 星期二 08:09:04
 * yyyy-M-d h:m:s.S => 2017-7-2 8:9:4.18
 */
function dateFormat (date, format) {
    if(date != undefined && date != null && date != "") {
        date = (typeof date == "string") ? Number(date) : date;
        date = new Date(date);
        var map = {
            "M+" : date.getMonth()+1, //月份
            "d+" : date.getDate(), //日
            "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
            "H+" : date.getHours(), //小时
            "m+" : date.getMinutes(), //分
            "s+" : date.getSeconds(), //秒
            "q+" : Math.floor((date.getMonth()+3)/3), //季度
            "S" : date.getMilliseconds() //毫秒
        };
        var week = {
            "0" : "/u65e5",
            "1" : "/u4e00",
            "2" : "/u4e8c",
            "3" : "/u4e09",
            "4" : "/u56db",
            "5" : "/u4e94",
            "6" : "/u516d"
        };
        if(/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
        }
        if(/(E+)/.test(format)) {
            format = format.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
        }
        for(var k in map) {
            if(new RegExp("("+ k +")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length==1) ? (map[k]) : (("00" + map[k]).substr(("" + map[k]).length)));
            }
        }
    } else {
        format = ''
    }
    return format;
}

export default dateFormat
