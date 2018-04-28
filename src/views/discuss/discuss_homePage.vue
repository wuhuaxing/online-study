<template>
	<div class="discuss-home-page">
		<div class="publish-btn-group bgw">
			<el-button type="primary" plain @click="publish('/discuss/publishDiscuss')">发起话题</el-button>
		</div>
		<!-- 课程 -->
		<section class="discuss-course">
			<h4 class="common-head bgw">讨论话题</h4>	
			<ul class="course-list clearfix bgw">
				<li class="course-list-item clearfix" v-for="(item, index) in questionList" :key="index">
					<div class="course-msg fl">
						<p class="course-tit ellipsis">{{item.title}}</p>
						<article class="discuss-content">
							{{item.content}}
						</article>
						<p class="author-date">
							<span>{{item.author}}</span>
							发布于
							<time>{{item.date | dateFormat('yyyy-MM-dd HH:mm')}}</time>
						</p>
					</div>
					<div class="btn-box fr">
						<el-button type="primary" @click="publish('/discuss/publishDiscuss')">参与讨论</el-button>
					</div>
				</li>
			</ul>
		</section>
	</div>
</template>

<script>
	import { requestQuestion } from '@/service/discuss.js'

	export default {
		name: 'discussHomePage',
		data() {
			return {
				questionList: [],
			}
		},
		mounted() {
			this.getQuestionList()
		},
		methods: {
            // 获取课程列表
            getQuestionList() {
                const params = {}
                requestQuestion(params).then((res) => {
                    if (res.data.code === 100) {
                        this.questionList = res.data.data
                    }
                })
            },
            publish(path) {
            	if (localStorage.getItem('loginInfo')) {
            		this.$router.push({ path: path })
            	} else {
            		this.$message('请先登录再进行操作')
            	}
            } 
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/vars.scss';

.publish-btn-group {
	box-sizing: border-box;
	padding: 20px;
	margin: 20px 0;
}



.course-list {
	.course-list-item {
		padding: 10px 15px;
		box-sizing: border-box;
		border-bottom: 1px dashed #ccc;
		margin-bottom: 10px;
		.course-msg {
			width: 80%;
			padding-bottom: 15px;
			box-sizing: border-box;
			overflow: hidden;
			.course-img {
				width: 100%;
				height: 200px;
				margin-bottom: 10px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.course-tit {
				font-size: 18px;
				line-height: 1.5;
				margin-bottom: 8px;
			}
			.discuss-content {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 8px;
				padding-left: 15px;
				text-indent: 2em;
			}
			.author-date {
				font-size: 14px;
				color: #999;
			}
		}
		.btn-box {
			width: 20%;
			box-sizing: border-box;
			padding-right: 20px;
			text-align: right;
		}
		&:hover {
			box-shadow: 3px 3px 8px #ccc;
			.course-tit {
				color: $theme-color;
			}
		}
	}
}
</style>