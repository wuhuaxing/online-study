
const common = {
	data() {
		return {
		}
	},
	methods: {
		/* 
		* 消息提示
		* 
		*/
		showMsg(type, msg, time = 2000, showClose = true) {
			this.$message({
				type: type,
				message: msg,
				showClose: showClose,
				duration: time
			})
		}
	}
}

export { common } 