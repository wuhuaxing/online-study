<template>
	<div class="foot_wrap cf">
		@footer
	</div>	
</template>

<script>
	export default {
		name: 'sysFooter',
		data() {
			return {}
		},
		methods: {}
	}
</script>

<style lang="scss" scoped>
.foot_wrap {
	// position: fixed;
	// bottom: 0px;
	// left: 0px;
	width: 100%;
	height: 100px;
	font-size: 16px;
	padding: 10px;
	margin-top: 20px;	
	text-align: center;
	color: #fff;
	background-color: #303133;
}
</style>
