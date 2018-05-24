<template>
	<div class="course_chapter container mt20 mb20 bgw">
		<h4 class="common-head">课时目录</h4>
		<el-button type="primary" class="back-btn" @click="$router.push({ path: '/course/myCourse' })">返回我的课程</el-button>
		<div class="list-box">
			<ul class="" v-if="courseList.length">
				<li class="list-item table-layout" v-for="(item, index) in courseList" :key="index">
					<div class="info-img table-cell">
						<i class="icon-pen"></i>
					</div>
					<div class="list-info table-cell">
						<h4 class="info-tit">第 {{index + 1 }} 课 {{item.name}}</h4>
					</div>
					<div class="table-cell list-btn">
						<el-button type="primary" @click="modifyChapter(index)">修改课时</el-button>
						<el-button type="primary" @click="delChapter(index)">删除课时</el-button>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无数据哦</div>
		</div>

		<el-dialog :visible.sync="visible" title="修改课时">
			<el-form :model="form" ref="form" label-width="110px" :rules="rules">
				<el-form-item label="章节名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入章节名称"></el-input>
				</el-form-item>
				<el-form-item label="相关链接名称" prop="linkName">
					<el-input v-model="form.linkName" placeholder="请输入相关链接名称"></el-input>
				</el-form-item>
				<el-form-item label="相关链接" prop="link">
					<el-input v-model="form.link" placeholder="请输入相关链接"></el-input>
				</el-form-item>
				<el-form-item class="publish-btn-group">
					<el-button type="primary" @click.prevent="submit">确定</el-button>
					<el-button type="primary" plain @click.prevent="visible = false">取消</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		name: 'course_chapter',
		data() {
			return {
				chapter: {},
				courseList: [],
				curIndex: '',
				visible: false,
				form: {},
				rules: {
					name: [
						{ required: true, message: '请输入章节名称' }
					],
					link: [
						{ required: true, message: '请输入相关链接' }
					],
					linkName: [
						{ required: true, message: '请输入相关链接名称' }
					]
				}
			}
		},
		mounted() {
			const ID = this.$route.query.id
			this.chapter = JSON.parse(localStorage.getItem('chapter'))
			this.courseList = this.chapter[ID]
		},
		methods: {
			// 修改课时，打开弹窗
			modifyChapter(index) {
				this.visible = true
				this.curIndex = index
				this.form = Object.assign({}, this.courseList[index])
			},
			// 修改课时
			submit() {
				this.$refs.form.validate((valid) => {
           			if (valid) {
           				const _id = this.$route.query.id
						this.chapter[_id][this.curIndex] = this.form
						localStorage.setItem('chapter', JSON.stringify(this.chapter))
		           		this.visible = false
		           		this.$message({
		            		type: 'success',
		            		message: '修改成功!'
		          		})
           			} else {
           				return false
           			}
           		})
			},
			// 删除课时
			delChapter(index) {
				this.$confirm('此操作将删除该课时, 是否继续?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		        	const _id = this.$route.query.id
		        	this.chapter[_id].splice(index, 1)
		        	localStorage.setItem('chapter', JSON.stringify(this.chapter))
		          	this.$message({
		            	type: 'success',
		            	message: '删除成功!'
		          	})
		        }).catch(() => {
		          	this.$message({
		            	type: 'info',
		            	message: '已取消删除'
		          	})
		        })
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/vars.scss';
.course_chapter {
	min-height: 700px;
}

.back-btn {
	margin-left: 20px;
	margin-bottom: 20px;
}

.list-box {
	padding-top: 10px;
	border-top: 1px solid #ccc;
}

.list-item {
	box-sizing: border-box;
	padding: 10px;
	border-bottom: 1px dashed #ccc;
	.info-img {
		font-size: 24px;
		text-align: center;
	}
	.info-tit {
		font-size: 18px;
		margin-bottom: 10px;
	}
	.list-btn {
		text-align: right;
	}

	.list-info {
		padding-left: 20px;
	}
}
	
</style>