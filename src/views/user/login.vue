<template>
	<div id="login" class="login-wrap" :style="{ 'background-image': `url(${bgImg})` }">
		<div class="login-box" v-loading="loading" element-loading-text="登录中...">
			<div class="login">
				<h3 class="head">欢迎登录哦</h3>
				<el-form label-width="60px" :model="form">
					<el-form-item label="用户名">
					  	<el-input v-model="form.username" placeholder="请输入用户名" v-on:keyup.enter.native="login"></el-input>
					</el-form-item>
					<el-form-item label="密  码">
					  	<el-input type="password" v-model="form.password" placeholder="请输入密码" v-on:keyup.enter.native="login"></el-input>
					</el-form-item>
					<div class="tips" v-if="ifTips"> 
						{{tips}}
					</div>
				</el-form>
				<div class="m10 clearfix">
					<router-link :to="{ path: '/register' }" class="fl c-blue" title="去注册">还没账号？去注册</router-link>
					<router-link :to="{ path: '/modify' }" class="fr c-blue" title="找回密码">忘记密码？</router-link>
				</div>
				<div class="btn-box">
					<el-button type="primary" size="medium" @click="login">登录</el-button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { loginRequest } from '@/service/user.js'
	import bgPic from '@/assets/banner/banner2.jpg' 

	export default {
		name: 'login',
		data() {
			return {
				form: {
					username: '',
					password: ''
				},
				ifTips: false,
				tips: '',
				loading: false,
				bgImg: bgPic
			}
		},
		mounted () {
		},
		methods: {
			login() {
				if (this.form.username == '' || this.form.password == '') {
					this.ifTips = true
					this.tips = '用户名或密码不能为空'
					return
				}
				this.loading = true
				const params = Object.assign({}, this.form)
				loginRequest(params).then((res) => {
					this.loading = false
					if (res.data.code === 100) {
						this.showMsg('success', '登录成功')
						const userMsg = JSON.stringify(res.data.data)
						localStorage.setItem('loginInfo', userMsg)
						const self = this
						window.setTimeout(function () {
							self.$router.replace('/')
						}, 1000)
						this.ifTips = false
					} else {
						this.tips = res.data.msg
						this.ifTips = true
						this.showMsg('error', res.data.msg)
					}
				}, (err) => {
					this.showMsg('error', '出错了~ ~')
				})
			}
		}
	}
</script>


<style lang="scss" scoped>

.m10 {
	margin: 10px 0;
}

.login-wrap { 
	overflow: hidden;
	position: fixed;
	top: 88px;
	left: 0;
	right: 0;
	bottom:0;
	background-position: center;
	background-size: cover;
}
.tips {
	margin-left: 80px;
	font-size: 12px;
	color: #d00;
	margin-top: -15px;
    margin-bottom: 20px;
}
.login-box{
	width: 428px;
	height: 250px;
	position: fixed;
	left: 50%;
	top: 140px;
	transform: translate(-50%, 0%);
	background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    .head {
    	font-size: 18px;
    	text-align: center;
    	margin-bottom: 20px;
    }
    .btn-box {
    	text-align: center;
    }
}
</style>

