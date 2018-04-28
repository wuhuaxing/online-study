<template>
	<div class="publish-article bgw">
		<h4 class="common-head">发表网络课程</h4>
		<el-form class="publish-article-form" ref="form" label-width="100px" :model="form" :rules="rules"> 
			<el-form-item label="课程标题" prop="title">
				<el-col :span="12">
					<el-input v-model="form.title" placeholder="请输入课程标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程价格" prop="price">
				<el-col :span="12">
					<el-input v-model="form.price" placeholder="请输入课程价格"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程概述" prop="desc">
				<el-col :span="12">
					<el-input v-model="form.desc" type="textarea" autosize placeholder="请输入课程概述"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="课程级别">
				<el-radio-group v-model="form.level">
				    <el-radio v-for="(item, index) in levelLabel" :key="index" :label="item"></el-radio>
				 </el-radio-group>
			</el-form-item>	
			<el-form-item label="课程标签">
				<el-radio-group v-model="form.tab">
				    <el-radio v-for="(item, index) in tabLabel" :key="index" :label="item"></el-radio>
				 </el-radio-group>
			</el-form-item>	
			<el-form-item class="publish-btn-group">
				<el-button type="primary" @click.prevent="publish">立即发布</el-button>
				<el-button type="primary" plain @click.prevent="$router.push({ path: '/info' })">取消</el-button>
			</el-form-item>
		</el-form>
	</div> 
</template>

<script>
	import { publishCourse } from '@/service/course.js'
 
	export default {
		name: 'publish_article',
		data() {
			return {
				form: {
					title: '',
					price: '',
					desc: '',
					tab: '',
					level: ''
				},
				rules: {
					title: [
						{ required: true, message: '请输入课程标题' },
					],
					desc: [
						{ required: true, message: '请输入课程概述' }
					],
				},
				tabLabel: ['java', 'c#', 'c++', '单片机', '嵌入式', '数字电路', '模拟电路', '前端H5', 'ios'],
				levelLabel: ['初级', '中级', '高级'],
				isToMuch: false
			}
		},
		methods: {
			publish() {
				this.$refs.form.validate((valid) => {
					if (valid && !this.isToMuch) {
						const _form = this.form
						const params = {
							title: _form.title,
							price: _form.price,
							desc: _form.desc,
							author: _form.level,
							tab: _form.tab.length ? _form.tab.join('、') : '',
							img: null 
						}
						publishCourse(params).then((res) => {
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
	.publish-article {
		margin-top: 20px;
		min-height: 600px;
		.publish-article-form {
			padding: 20px;
		}
	}
</style>