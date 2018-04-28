<template>
	<div class="publish-article bgw">
		<h4 class="common-head">发表话题</h4>
		<el-form class="publish-article-form" ref="form" label-width="100px" :model="form" :rules="rules"> 
			<el-form-item label="话题标题" prop="title">
				<el-col :span="12">
					<el-input v-model="form.title" placeholder="请输入话题标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="话题概述" prop="content">
				<el-col :span="12">
					<el-input v-model="form.content" type="textarea" autosize placeholder="请输入话题概述"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item class="publish-btn-group">
				<el-button type="primary" @click.prevent="publish">立即发表</el-button>
				<el-button type="primary" plain @click.prevent="$router.push({ path: '/discuss' })">取消</el-button>
			</el-form-item>
		</el-form>
	</div> 
</template>

<script>
	import { publishInfo } from '@/service/info.js'
 
	export default {
		name: 'publish_article',
		data() {
			return {
				form: {
					title: '',
					content: '',
				},
				rules: { // 表单验证规则
					title: [
						{ required: true, message: '请输入话题标题' },
					],
					content: [
						{ required: true, message: '请输入话题概述' }
					]
				},
			}
		},
		mounted() {
			// console.log(new Date().getTime())
		},
		methods: {
			publish() {
				this.$refs.form.validate((valid) => {
					if (valid && !this.isToMuch) {
						const _form = this.form
						const params = {
							type: '4',
							title: _form.title,
							content: _form.content,
							author: JSON.parse(localStorage.getItem('loginInfo')).name,
							date: new Date().getTime(),
						}
						publishInfo(params).then((res) => {
							if (res.data.code === 100) {
								this.$message({ type: 'success', message: '发表成功' })
								this.$router.push({ path: '/discuss' })
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
	.publish-article {
		margin-top: 20px;
		min-height: 600px;
		.publish-article-form {
			padding: 20px;
		}
	}
</style>