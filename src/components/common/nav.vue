<template>
	<div class="nav_wrap">
		<el-menu
			:default-active="defaultActive"
      		:router="true"
      		class="el-menu-vertical-demo"
      		background-color="#545c64"
      		text-color="#fff"
      		active-text-color="#ffd04b">
      		<el-menu-item v-for="(item, index) in navList" :index="item.route" :key="index">
        		<i v-bind:class="[item.icon]"></i>
        		<span slot="title">{{item.name}}</span>
      		</el-menu-item>
    	</el-menu>
	</div>	
</template>

<script>
	export default {
		name: 'Nav',
		data(){
			return {
				navList: [],
				defaultActive: ''
			}
		},
		created() {
			if (sessionStorage.getItem('NAV')) {
				this.navList = JSON.parse(sessionStorage.getItem('NAV')).nav
			} else {
				this.navList = [{ name: '首页', route: '/admin/index', icon: 'el-icon-menu' }]
			}
		},
		mounted() {
			this.setDefaultActive()
		},
		watch: {
			'$route': {
				handler: function (val) {
					this.setDefaultActive()
				},
				deep: true
			}
		},
		methods:{
			setDefaultActive() {
				const pathArr = this.$route.path.split('/')
				this.defaultActive = pathArr.splice(0,3).join('/')
			}
		}
	}
</script>

<style lang="scss" scoped>
// @import '@/assets/common/global.scss';
$main-color: #1ab394;
$main-color-hover: #19a085;
	.nav_wrap {
		width: 224px;
	}
</style>
