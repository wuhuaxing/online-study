
/*手机号码密文*/
function phoneFormat(phone) {
	if (phone) {
		return phone.replace(/(\w{3})\w*(\w{3})/, '$1*****$2')
	} else {
		return 'ta没留下电话'
	}
}

export default phoneFormat