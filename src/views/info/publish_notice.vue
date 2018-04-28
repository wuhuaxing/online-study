<template>
	<div class="publish-notice bgw">
		<h4 class="common-head">发布公告</h4>
		<el-form class="publish-notice-form" ref="form" label-width="100px" :model="form" :rules="rules"> 
			<el-form-item label="公告标题" prop="title">
				<el-col :span="12">
					<el-input v-model="form.title" placeholder="请输入公告标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="公告内容" prop="content">
				<el-col :span="12">
					<el-input v-model="form.content" type="textarea" autosize placeholder="请输入公告内容"></el-input>
				</el-col>
			</el-form-item>	
			<el-form-item class="publish-btn-group">
				<el-button type="primary" @click.prevent="publish">立即发表</el-button>
				<el-button type="primary" plain @click.prevent="$router.push({ path: '/info' })">取消</el-button>
			</el-form-item>
		</el-form>
	</div> 
</template>

<script>
	import { publishInfo } from '@/service/info.js'
 
	export default {
		name: 'publish_notice',
		data() {
			return {
				form: {
					title: '',
					content: '',
				},
				rules: {
					title: [
						{ required: true, message: '请输入文章标题' },
					],
					content: [
						{ required: true, message: '请输入文章内容' }
					]
				},
			}
		},
		methods: {
			publish() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						const _form = this.form
						const params = {
							type: '2',
							title: _form.title,
							desc: null,
							content: _form.content,
							author: JSON.parse(localStorage.getItem('loginInfo')).name,
							date: new Date().getTime(),
							tab: null,
							img: '' 
						}
						publishInfo(params).then((res) => {
							if (res.data.code === 100) {
								this.$message({ type: 'success', message: '发表成功' })
								this.$router.push({ path: '/info' })
							}
						})
					} else {
						this.$message('请按要求填写完整信息再提交。')
						return false
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.publish-notice {
		margin-top: 20px;
		min-height: 600px;
		.publish-notice-form {
			padding: 20px;
		}
	}
</style>