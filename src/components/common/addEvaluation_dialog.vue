<template>
	<el-dialog title="督导评分" :visible.sync="visible.show" @close="cancel">
	  	<section class="form-box">
		  	<el-form ref="form" :model="form" label-width="120px" size="mini" :rules="rules">
		  		<el-form-item label="授课内容得分" required>
				    <el-input-number v-model="form.contentScore" size="medium" controls-position="right" :min="0" :max="100"></el-input-number>
				</el-form-item>
				<el-form-item label="课堂气氛得分" required>
				    <el-input-number v-model="form.activityScore" size="medium" controls-position="right" :min="0" :max="100"></el-input-number>
				</el-form-item>
				<el-form-item label="课程质量得分" required>
				    <el-input-number v-model="form.qualityScore" size="medium" controls-position="right" :min="0" :max="100"></el-input-number>
				</el-form-item>
				<el-form-item label="评价或建议" prop="suggest">
				    <el-input type="textarea" v-model="form.suggest" :maxlength="150" placeholder="请输入评价或建议,不超过150字符"></el-input>
				</el-form-item>
		  	</el-form>
	  	</section>
	  	<div slot="footer" class="dialog-footer">
	    	<el-button @click="cancel">取 消</el-button>
	    	<el-button type="primary" @click="confirm">确 定</el-button>
	  	</div>
	</el-dialog>
</template>

<script>
	export default {
		name: 'addEvaluation',
		data() {
			return {
				form: {
					suggest: '',
					contentScore: 0,
					activityScore: 0,
					qualityScore: 0
				},
				rules: {
					suggest: [
						{ required: true, message: '请输入评价或建议', trigger: 'blur' }
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
			}
		},
		methods: {
			cancel() {
				this.visible.show = false
				this.$refs.form.resetFields()
			},
			confirm() {
				this.$refs.form.validate((valid) => {
		          	if (valid) {
		            	this.$emit('callback', this.form)
		          	} else {
		           		this.showMsg('info', '请填写完整内容哦')
 		            	return false
		          	}
		        })
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style> 