<template>
	<div class="buy-list container bgw">
		<h4 class="common-head mt20 mb20 bgw">我的课程</h4>
		<div class="list-box">
			<ul class="" v-if="courseList.length">
				<li class="list-item table-layout" v-for="(item, index) in courseList" :key="index">
					<div class="info-img table-cell">
						<img :src="handleImg(index)" alt="" width="180" height="100">
					</div>
					<div class="list-info table-cell">
						<h4 class="info-tit">{{item.title}}</h4>
						<p>价格: ￥{{item.price}}</p>
					</div>
					<div class="table-cell list-btn">
						<el-button type="primary" @click="addChapter(item.id)">添加课时</el-button>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无购买记录哦</div>
		</div>
		<el-dialog :visible.sync="visible" title="添加课时">
			<el-form :model="form" ref="form" label-width="100px" :rules="rules">
				<el-form-item label="章节名称" prop="name">
					<el-input v-model="form.name" placeholder="请输入章节名称"></el-input>
				</el-form-item>
				<el-form-item label="相关链接名称" prop="link">
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
	import img1 from '@/assets/danpianji.png'
    import img2 from '@/assets/java.png'
    import img3 from '@/assets/logo.png'
    import img4 from '@/assets/qianrushi.png'
    import { requestCourse } from '@/service/course.js'

	export default {
		data() {
			return {
				visible: false,
				userId: localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')).id : '',
				courseList: [],
				curId: '',
				form: {
					name: '',
					link: '',
					linkName: ''
				},
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
			this.getCourseList()
		},
		methods: {
			handleImg(index) {
				switch (index) {
					case 0:
						return img1
						break
					case 1:
						return img2
						break
					case 2:
						return img3
						break
					case 3:
						return img4
						break
					default:
						return img3
						break
				}
			},
			// 获取课程列表
            getCourseList() {
                const params = {}
                requestCourse(params).then((res) => {
                    if (res.data.code === 100) {
                        this.courseList = res.data.data
                    }
                })
            },
            addChapter(id) {
            	this.visible = true
            	this.curId = id
            },
            // 添加课时提交表单
           	submit() {
           		this.$refs.form.validate((valid) => {
           			if (valid) {
           				const chapter = JSON.parse(localStorage.getItem('chapter')) || {}
		           		if (chapter && chapter[this.curId]) {
		           			chapter[this.curId].push(this.form)
		           		} else {
		           			this.$set(chapter, this.curId, [this.form])
		           		}
		           		localStorage.setItem('chapter', JSON.stringify(chapter))
		           		this.$message({ type: 'success', message: '添加课时成功' })
		           		this.visible = false
		           		this.$refs.form.resetFields()
           			} else {
           				return false
           			}
           		})
           	}
		}
	}
</script>

<style lang="scss" scoped>
.buy-list {
	min-height: 700px;
}

	.list-item {
		box-sizing: border-box;
		padding: 10px;
		border-bottom: 1px dashed #ccc;
		.info-img {
			width: 180px;
			height: 100px;
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