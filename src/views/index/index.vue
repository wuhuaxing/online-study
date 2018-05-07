<template>
	<div class="index-wrap" id="index">
		<carousel-pic :banners="banners"></carousel-pic>
		<div class="container mt20">
			<!-- 模块导航 -->
			<nav class="nav-wrap mb20">
				<ul class="nav-list clearfix">
					<li class="nav-item fl" v-for="(item, index) in navList" :key="index">
						<router-link class="nav-item-link bgw" :to="{ path: item.path }" :title="item.label">
							<span class="nav-item-icon" :class="item.icon"></span>
							<p class="nav-item-name">{{item.label}}</p>
						</router-link>
					</li>
				</ul>
			</nav>

			<!-- 课程 -->
			<section class="discuss-course mb20">
				<h4 class="common-head bgw">网络课程</h4>	
				<ul class="course-list clearfix">
					<router-link class="course-list-item fl" tag="li" :to="{ path: '/course/courseDetail', query: { id: item.id } }" v-for="(item, index) in courseList" :key="index">
						<div class="course-msg bgw">
							<div class="course-img">
								<img :src="item.img" alt="">
							</div>
							<p class="course-tit ellipsis">{{item.title}}</p>
							<p class="author-date">
								<span>价格：￥{{item.price}}</span>
							</p>
							<p class="author-date">
								<span>学习人数：{{item.learningNumber}}</span>
							</p>
						</div>
					</router-link>
				</ul>
			</section>
			<!-- 热门信息 -->
			<section class="index-info clearfix bgw">
				<div class="hot-article fl">
					<h2 class="title">热门文章</h2>
					<article-list :articleList="articleList"></article-list>
				</div>
				<div class="hot-notice fr">
					<h2 class="title">最新公告</h2>
					<notice-board></notice-board>
				</div>
			</section>
		</div>
	</div>
</template>

<script>
    import carouselPic from '@/components/common/carousel_pic.vue'
    import banner1 from '@/assets/banner/banner6.jpg'
    import banner2 from '@/assets/banner/banner2.jpg'
    import banner3 from '@/assets/banner/banner3.jpg'
    import banner4 from '@/assets/banner/banner4.jpg'
    import banner5 from '@/assets/banner/banner5.jpg'
    import banner6 from '@/assets/banner/banner1.jpg'
	import noticeBoard from '@/components/common/notice_board.vue'
	import articleList from '@/components/info/article_list.vue'
	import { requestHotArticle } from '@/service/info.js'
	import { requestCourse } from '@/service/course.js'

	export default {
		name: 'index',
		components: {
			carouselPic,
			noticeBoard,
			articleList
		},
		data() {
			return {
				banners: [banner1, banner2, banner3, banner4, banner5, banner6], //首页banner图
				navList: [ // 首页模块导航
					{ label: '网上教程', path: '/course', icon: 'icon-display' },
					{ label: '信息浏览', path: '/info', icon: 'icon-newspaper' },
					{ label: '讨论区', path: '/discuss', icon: 'icon-bubbles3' },
					{ label: '资源购买', path: '/resource', icon: 'icon-database' }
				],
				articleList: [],
				courseList: [],
			}
		},
		mounted() {
			this.getArticle()
			this.getCourseList()
		},
		methods: {
			// 获取文章数据
			getArticle() {
				requestHotArticle({}).then((res) => {
					if (res.data.code === 100) {
						this.articleList = res.data.data
					}
				})
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
		}
	}
</script>

<style lang="scss" scoped>
@import '~@/assets/common/vars.scss';
@import '~@/assets/common/course-list.scss';
	.nav-wrap {
		.nav-list {
			.nav-item {
				box-sizing: border-box;
				width: 25%;
				padding: 10px;
				.nav-item-link {
					display: block;
					text-align: center;
					padding: 20px;
					font-size: 20px;
					border-radius: 5px;
					.nav-item-icon {
						font-size: 30px;
					}
					.nav-item-name {
						margin-top: 10px;
					}
					&:hover {
						color: $theme-color;
						box-shadow: 3px 3px 8px #ccc;
						.nav-item-icon {
							color: $theme-color;
						}
					}
				}
			}
		}
	}

	.index-info {
		padding: 10px;
		.hot-article,.hot-notice {
			width: 50%;
			min-height: 350px;
			box-sizing: border-box;
			padding: 10px;
		}
		.title {
	        font-size: 18px;
	        padding: 12px 0px;
	        border-bottom: 1px solid #c9c9c9;
	        text-indent: .5em;
	    }
		.hot-article {
			border-right: 1px solid #ccc;
		}
	}
</style>