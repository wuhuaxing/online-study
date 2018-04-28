<template>
	<div class="discuss-wrap mt20 container">
		<div class="banner">
			<img src="../../assets/banner/banner3.jpg" height="300" width="1200">
		</div>
		<router-view></router-view>
	</div>
</template>
`
<script>
	export default {
		name: 'discuss',
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	 @import '../../assets/common/vars.scss';
</style>