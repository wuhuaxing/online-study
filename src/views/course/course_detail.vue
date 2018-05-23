<template>
	<div class="course-detail">
		<section class="video-wrap bgw">
			<h4 class="chapter-tit">[ {{curChapter.name || detail.title}} ]</h4>
			<video :src="curSrc" autobuffer autoloop loop controls width="900" height="500"></video>
		</section>

		<div class="about-link bgw">
			<span>相关链接：</span>
			<a :href="curChapter.link || link" :title="curChapter.linkName || linkName">{{curChapter.linkName || linkName}}</a>
		</div>

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

		<section class="chapter-wrap bgw">
			<h4 class="common-head bgw">课程课时</h4>
			<ul class="chapter-list" v-if="chapter.length">
				<li class="list-item" v-for="(item, index) in chapter" :key='index'>
					<i class="icon-play"></i>{{item.name}}
				</li>
			</ul>
			<div class="empty-block" v-else>
				暂无数据
			</div>
		</section>
	</div>
</template>

<script>
    import { requestCourseDetail } from '@/service/course.js'
    import video1 from '@/assets/danpianji1.mp4'
    import video2 from '@/assets/danpianji2.mp4'
    import video3 from '@/assets/java.mp4'
 
	export default {
		name: 'courseDetail',
		data() {
			return {
				detail: {},
				chapter: [],
				id: this.$route.query.id,
				videos: [video1, video2, video3],
				curSrc: null,
				curChapter: {},
				link: 'http://www.51zxw.net/',
				linkName: '我要自学网'
			}
		},
		mounted() {
			this.curSrc = this.videos[Number(this.$route.query.id)] || video1
			this.getDetail()
			if (localStorage.getItem('chapter')) {
				this.chapter = JSON.parse(localStorage.getItem('chapter'))[this.id] || []
			}
		},
		methods: {
			getDetail() {
				requestCourseDetail({ id: this.$route.query.id }).then((res) => {
					if (res.data.code === 100) {
						this.detail = res.data.data
					}
				})
			},
			changeChapter(index) {
				this.curChapter = this.chapter[index]
				this.curSrc = this.videos[index]
			}
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/vars.scss';

	.course-detail {
		margin-top: 20px;
		.video-wrap {
			padding: 20px;
			text-align: center;
			margin-bottom: 20px;
			.chapter-tit {
				line-height: 2;
				font-size: 18px;
				margin-bottom: 20px;
			}
		}

		.about-link {
			padding: 20px;
			margin-bottom: 20px;
			span {
				font-size: 20px;
			}
			a {
				font-size: 16px;
				&:hover {
					color: $theme-color;
				}
			}
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

		.chapter-wrap {
			padding: 15px;
			margin-top: 20px;
			.list-item {
				padding: 10px;
				border-bottom: 1px solid #ccc;
				font-size: 16px;
				line-height: 2;
				&:hover {
					color: $theme-color;
				}
				i {
					font-size: 30px;
					margin-right: 15px;
					vertical-align: middle;
					color: $theme-color;
				}
			}
		}
	}
</style>