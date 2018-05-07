<template>
	<div class="modify-wrap container bgw">
		<h4 class="head-tip">找回密码！</h4>
		<el-form class="modify-form" ref="form" :model="form" label-width="80px" :rules="rule">
			<el-form-item label="昵称" prop="username">
			    <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" required>
			    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-col :span="16">
					<el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
				</el-col>
				<el-col :span="8" class="pdl15">
					<el-button type="primary" @click="sendCode" v-if="!ifsend">发送验证码</el-button>
					<el-button type="info" plain disabled v-else>{{second}}s重新发送</el-button>
				</el-col>
			</el-form-item>
			<el-form-item label="验证码" prop="validCode" required>
			    <el-input v-model="form.validCode" placeholder="请再次验证码"></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button type="primary" @click="modify">立即修改</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import { resetPwd } from '@/service/user.js'
	import qs from 'qs'

	export default {
		name: 'modify',
		data() {
			const validatePassword = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          callback();
		        }
		    }
			return {
				form: {
					username: '',
					password: '',
					validCode: '',
					phone: ''
				},
				rule: {
					username: [
						{ required: true, message: '请输入昵称' }
					],
		            password: [
		                { validator: validatePassword, trigger: 'blur' }
		            ],
		            validCode: [
		            	{ required: true, message: '请输入验证码' }
		            ]
		        },
		        ifsend: false,
		        second: 60
			}
		},
		methods: {
			// 发送验证码
			sendCode() {
				this.ifsend = true
				const self = this
				const timer = setInterval(function () {
					self.second--
					if (self.second === 0) {
						clearInterval(timer)
						self.second = 60
						self.ifsend = false
					}
				}, 1000)
			},
			// 修改密码
			modify() {
		        this.$refs.form.validate((valid) => {
			        if (valid) {
			        	if (this.form.validCode == 1234) {
			        		const params = Object.assign({}, this.form)
				            delete params.validCode
				            delete params.phone
				            resetPwd(params).then((res) => {
				            	if (res.data.code === 100) {
				            		this.showMsg('success', '密码已重置，去登陆吧')
				            		this.$router.push({ path: '/login' })
				            	}
				            })
			        	} else {
			        		this.$message('验证码错误')
			        	}
			        } else {
			            console.log('error submit!!')
			            return false
			        }
		        })
		    },
		}
	}
</script>

<style lang="scss" scoped>
	.pdl15 {
		padding-left: 15px;
	}
	.modify-wrap {
		margin: 20px auto;
		min-height: 660px;
		padding: 20px;
		border-radius: 10px;
		.head-tip {
			font-size: 20px;
			text-align: center;
			margin: 20px;
		}
		.modify-form {
			width: 500px;
			margin: 0 auto;
		}
	}
</style>