<template>
	<div class="publish-article bgw">
		<h4 class="common-head">发表文章</h4>
		<el-form class="publish-article-form" ref="form" label-width="100px" :model="form" :rules="rules"> 
			<el-form-item label="标题" prop="title">
				<el-col :span="12">
					<el-input v-model="form.title" placeholder="请输入文章标题"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="概述" prop="desc">
				<el-col :span="12">
					<el-input v-model="form.desc" type="textarea" autosize placeholder="请输入文章概述"></el-input>
				</el-col>
			</el-form-item>
			<el-form-item label="文章内容" prop="contentText" style="position: relative">
				<el-col :span="23">
                    <el-input v-model="form.contentText" v-show="false"></el-input>
                    <div id="editor-trigger"></div>
                </el-col>
                <div style="position:absolute;font-size:12px;bottom:-27px;color:#23b8ff;" v-if="isToMuch">
                      输入内容过多
                </div>
			</el-form-item>
			<el-form-item label="文章标签">
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
	import wangEditor from 'wangeditor'
 
	export default {
		name: 'publish_article',
		data() {
			return {
				form: {
					title: '',
					desc: '',
					content: '',
					tab: [],
					contentText: null
				},
				rules: {
					title: [
						{ required: true, message: '请输入文章标题' },
					],
					desc: [
						{ required: true, message: '请输入文章概述' }
					],
					contentText: [
						{ required: true, message: '请输入文章内容' }
					]
				},
				tabLabel: ['技术类', '艺术类', '娱乐类', '体育类', '数码类'],
				isToMuch: false
			}
		},
		mounted() {
			const editor = new wangEditor('#editor-trigger')
			const self = this
			editor.customConfig.onchange = function (html) {
                self.form.contentText = editor.txt.text().trim()
                self.form.content = html
            }
            editor.create()
		},
		watch: {
			'form.content': {
                handler: function (val) {
                    if (val.length > 6000) {
                        this.isToMuch = true
                    } else {
                        this.isToMuch = false
                    }
                },
                deep: true
            }
		},
		methods: {
			publish() {
				this.$refs.form.validate((valid) => {
					if (valid && !this.isToMuch) {
						const _form = this.form
						const params = {
							type: '1',
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
	.publish-article {
		margin-top: 20px;
		min-height: 600px;
		.publish-article-form {
			padding: 20px;
		}
	}
</style>