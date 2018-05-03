<template>
	<el-dialog :title="title" :visible.sync="visible.show">
	  	<section class="form-box">
		  	<el-form ref="form" :model="form" :rules="rules">
				<el-form-item prop="content">
				    <el-input type="textarea" :rows="3" v-model="form.content" placeholder="说点什么吧。。"></el-input>
				</el-form-item>
		  	</el-form>
	  	</section>
	  	<div slot="footer" class="dialog-footer">
	    	<el-button @click="visible.show = false">取 消</el-button>
	    	<el-button type="primary" @click="confirm">确 定</el-button>
	  	</div>
	</el-dialog>
</template>

<script>
	import { addEvalua } from '@/service/add.js'

	export default {
		name: 'addEvaluation',
		data() {
			return {
				form: {
					content: '',
				},
				rules: {
					content: [
						{ required: true, message: '说点什么吧', trigger: 'blur' }
					]
				}
			}
		},
		props: {
			visible: {
				type: Object,
				default() {
					return {
						show: false
					}
				}
			},
			type: {
				type: String,
				default: ''
			},
			title: {
				type: String,
				default: '评价'
			}
		},
		methods: {
			confirm() {
				this.$refs.form.validate((valid) => {
		          	if (valid) {
		            	const params = {
		            		content: this.form.content,
		            		author: JSON.parse(localStorage.getItem('loginInfo')).name,
		            		articleId: this.$route.query.id,
		            		type: this.type,
		            		date: new Date().getTime(),
		            	}
		            	addEvalua(params).then((res) => {
		            		if (res.data.code === 100) {
		            			this.$message({ message: '发表成功', type: 'success' })
		            			this.visible.show = false
		            			this.$emit('callback')
		            		} else {
		            			this.$message({ message: res.data.msg, type: 'error' })
		            		}
		            	})
		          	} else {
		           		this.showMsg('info', '请填写内容哦')
 		            	return false
		          	}
		        })
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style> 