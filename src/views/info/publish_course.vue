<template>
	<div class="publish-course bgw">
		<h4 class="common-head">发布课程</h4>
		<el-form class="publish-course-form" ref="form" label-width="100px" :model="form" :rules="rules"> 
			<el-form-item label="课程标题" prop="title">
				<el-col :span="12">
					<el-input v-model="form.title" placeholder="请输入课程标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程概述" prop="desc">
				<el-col :span="12">
					<el-input v-model="form.desc" type="textarea" autosize placeholder="请输入课程概述"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程标签">
				<el-checkbox-group v-model="form.tab">
				    <el-checkbox v-for="(item, index) in tabLabel" :key="index" :label="item"></el-checkbox>
				 </el-checkbox-group>
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
		name: 'publish_course',
		data() {
			return {
				form: {
					title: '',
					desc: '',
					content: '',
					tab: [],
				},
				rules: {
					title: [
						{ required: true, message: '请输入课程标题' },
					],
					desc: [
						{ required: true, message: '请输入课程概述' }
					],
				},
				tabLabel: ['技术类', '艺术类', '娱乐类', '体育类', '数码类'],
				isToMuch: false
			}
		},
		methods: {
			publish() {
				this.$refs.form.validate((valid) => {
					if (valid) {
						const _form = this.form
						const params = {
							type: '3',
							title: _form.title,
							desc: _form.desc,
							content: _form.content,
							author: JSON.parse(localStorage.getItem('loginInfo')).name,
							date: new Date().getTime(),
							tab: _form.tab.length ? _form.tab.join('、') : '',
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
	.publish-course {
		margin-top: 20px;
		min-height: 600px;
		.publish-course-form {
			padding: 20px;
		}
	}
</style>