<template>
	<div class="course-detail">
		<section class="video-wrap bgw">
			<video src="../../assets/java.mp4" autobuffer autoloop loop controls width="900" height="500"></video>
		</section>

		<div class="course-msg bgw pr">
			<h4 class="course-tit">{{detail.title}}</h4>
			<p class="msg-item">课程级别：{{detail.level}}</p>
			<p class="msg-item">课程标签：<el-tag>{{detail.tab}}</el-tag></p>
			<p class="msg-item">价格： ￥{{detail.price}}</p>
			<p class="msg-item">学习人数：{{detail.learningNumber}}</p>
			<article class="msg-desc">
				{{detail.desc}}
			</article>
		</div>
	</div>
</template>

<script>
    import { requestCourseDetail } from '@/service/course.js'
 
	export default {
		name: 'courseDetail',
		data() {
			return {
				detail: {}
			}
		},
		mounted() {
			this.getDetail()
		},
		methods: {
			getDetail() {
				requestCourseDetail({ id: this.$route.query.id }).then((res) => {
					if (res.data.code === 100) {
						this.detail = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.course-detail {
		margin-top: 20px;
		.video-wrap {
			padding: 20px;
			text-align: center;
			margin-bottom: 20px;
		}
		.course-msg {
			padding: 20px;
			padding-right: 200px;
			.course-tit {
				font-size: 18px;
				line-height: 1.5;
				margin-bottom: 15px;
				color: #000;
			}
			.msg-item {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 8px;
			}
			.msg-desc {
				font-size: 14px;
				text-indent: 2em;
				line-height: 1.5;
			}
		}
	}
</style>