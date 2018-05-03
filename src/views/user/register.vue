<template>
	<div class="register-wrap container bgw">
		<h4 class="head-tip">欢迎注册，让我们愉快地在线学习吧！</h4>
		<el-form class="register-form" ref="form" :model="form" label-width="80px" :rules="rule">
			<el-form-item label="注册类型" prop="role">
				<el-radio-group v-model="form.role">
			      	<el-radio label="teacher">老师</el-radio>
			      	<el-radio label="student">学生</el-radio>
			    </el-radio-group>
			</el-form-item>
			<el-form-item label="昵称" prop="username">
			    <el-input v-model="form.username" placeholder="请输入昵称"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password" required>
			    <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="checkPassword" required>
			    <el-input type="password" v-model="form.checkPassword" auto-complete="off" placeholder="请再次输入密码"></el-input>
			</el-form-item>
			<el-form-item>
			    <el-button type="primary" @click="register">立即注册</el-button>
			</el-form-item>
		</el-form>·
	</div>
</template>

<script>
	import { registerRequest } from '@/service/user.js'
	import qs from 'qs'

	export default {
		name: 'register',
		data() {
			const validatePassword = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请输入密码'));
		        } else {
		          if (this.form.checkPassword !== '') {
		            this.$refs.form.validateField('checkPassword');
		          }
		          callback();
		        }
		    }
		    const validatePassword2 = (rule, value, callback) => {
		        if (value === '') {
		          callback(new Error('请再次输入密码'));
		        } else if (value !== this.form.password) {
		          callback(new Error('两次输入密码不一致!'));
		        } else {
		          callback();
		        }
		    }
			return {
				form: {
					role: '',
					username: '',
					password: '',
					checkPassword: ''
				},
				rule: {
					role: [
						{ required: true, message: '请选择注册类型' }
					],
					username: [
						{ required: true, message: '请输入昵称' }
					],
		            password: [
		                { validator: validatePassword, trigger: 'blur' }
		            ],
		            checkPassword: [
		                { validator: validatePassword2, trigger: 'blur' }
		            ],
		        }
			}
		},
		methods: {
			register() {
		        this.$refs.form.validate((valid) => {
			        if (valid) {
			            const params = Object.assign({}, this.form)
			            delete params.checkPassword
			            registerRequest(params).then((res) => {
			            	if (res.data.code === 100) {
			            		this.showMsg('success', '注册成功，去登陆吧')
			            		this.$router.push({ path: '/login' })
			            	}
			            })
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
	.register-wrap {
		margin: 20px auto;
		min-height: 660px;
		padding: 20px;
		border-radius: 10px;
		.head-tip {
			font-size: 20px;
			text-align: center;
			margin: 20px;
		}
		.register-form {
			width: 500px;
			margin: 0 auto;
		}
	}
</style>