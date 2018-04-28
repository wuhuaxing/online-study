/*
 * 文本溢出截取显示
 * str: 文本
 * len: 截取字符长度
 * overflow: 溢出最后显示字符 (default: '...')
 */
function textOverflow (str, len, overflow = "...") {
    if (str) {
        if (str.length > len) {
            str = str.substring(0, len) + overflow;
        }
    }
    return str
}

export default textOverflow