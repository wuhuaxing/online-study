<template>
	<div class="info-wrap container mt20">
		<div class="banner">
			<img src="../../assets/banner/banner6.jpg" height="300" width="1200">
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'info',
		data() {
			return {}
		}
	}
</script>

<style lang="scss" scoped>
	 @import '../../assets/common/vars.scss';
</style>