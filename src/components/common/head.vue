<template>
	<div class="head_wrap clearfix">
		<div class="head-content clearfix">
			<div class="logo fl">
				<i class="icon-books"></i>
				<router-link class="tit" :to="{ path: '/' }">STUDY ON LINE</router-link>
			</div>

			<nav class="head-nav fl">
				<ul class="head-nav-box clearfix">
					<li class="head-nav-item fl" v-for="(item, index) in navList" :key="index">
						<router-link v-bind:class="{ active: $route.path === item.path || $route.path.includes(item.name) }" :to="{ path: item.path }" :title="item.label">{{item.label}}</router-link>
					</li>
				</ul>
			</nav>

			<div class="user fr" v-if="userName">
				<el-popover
				  ref="popover4"
				  placement="bottom"
				  width="150"
				  trigger="hover">
				  	<ul class="operate-box">
				  		<li class="operate-item" @click="logout"><i class="fa fa-sign-out"></i>退出</li>
				  	</ul>
				</el-popover>
				<a v-popover:popover4><i class="icon-grin"></i> {{userName}}</a>
			</div>
			<div class="user fr" v-else>
				<router-link :to="{ path: '/login' }" class="login-btn" title="登录">登录</router-link> 
				<router-link :to="{ path: '/register' }" class="login-btn" title="注册">注册</router-link>
			</div>
		</div>
	</div>	
</template>

<script>
	import { mapState } from 'vuex'
	import noticeBoard from '@/components/common/notice_board.vue'

	export default {
		name: 'sysHead',
		components: {
			noticeBoard
		},
		data() {
			return {
				navList: [ // 首页模块导航
					{ label: '首页', path: '/', name: 'index' },
					{ label: '网上教程', path: '/course', name: 'course' },
					{ label: '信息浏览', path: '/info', name: 'info' },
					{ label: '讨论区', path: '/discuss', name: 'discuss' },
					{ label: '相关资源', path: '/resource', name: 'resource' }
				],
			}
		},
		created() {
		},
		methods: {
			logout() {
				this.$router.push({ path: '/' })
				localStorage.removeItem('loginInfo')
				this.userName = ''
			}
		}
	}
</script>

<style lang="scss">
	.operate-box {
		padding-left: 20px;
		.operate-item {
			cursor: pointer;
			&:hover {
				color: #a5e4ea;
			}
		}
	}
</style>

<style lang="scss" scoped>
@import '../../assets/common/vars.scss';
.head_wrap {
	position: fixed;
	top: 0px;
	left: 0px;
	width: 100%;
	min-width: 1200px;
	height: $head-h;
	background: #ecf5ff;
	transform: translateZ(0);
	z-index: 999;
	.head-content {
		width: 1200px;
		margin: 0 auto;
		.logo {
			font-size: 30px;
			margin-right: 30px;
			line-height: $head-h;
		}
		.notice {
			width: 600px;
			.notice-tit {
				font-size: 14px;
				line-height: 80px;
				margin-right: 5px;
			}
		}
		.user {
			width: 110px;
			line-height: $head-h;
			text-align: right;
			a {
				font-size: 18px;
				&:hover {
					color: $theme-color;
				}
			}
			.login-btn {
				padding: 5px 10px;
				margin-left: 5px;
				border: 1px solid #ccc;
				border-radius: 5px;
				font-size: 14px;
				&:hover {
					border-color: $theme-color;
				}
			}
		}
		.head-nav-box {
			line-height: $head-h;
			.head-nav-item {
				margin-right: 15px;
				a {
					font-size: 16px;
					&.active {
						color: $theme-color;
					}
					&:hover {
						color: $theme-color;
					}
				}
			}
		}
	}
}
</style>
