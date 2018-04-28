<template>
	<div class="info-home-page">
		<div class="publish-btn-group bgw">
			<el-button type="primary" plain @click="publish('/info/publishArticle')">发表文章</el-button>
			<el-button type="success" plain @click="publish('/info/publishNotice')">发布公告</el-button>
			<el-button type="warning" plain @click="publish('/info/publishCourse')">发布课程</el-button>
		</div>
		<section class="index-info clearfix bgw">
			<div class="hot-article fl">
				<h2 class="title">文章</h2>
				<article-list :articleList="articleList"></article-list>
			</div>
			<div class="hot-notice fr">
				<h2 class="title">公告</h2>
				<div class="notice_board">
			        <ul v-if="noticeList.length > 0" class="bulletin_ul">
			            <li v-for="(item, index) in noticeList" class="bulletin_li" :key="item.id">
			                <el-tooltip effect="light" :content='item.content' placement="bottom">
			                    <span class="msg"> {{ item ? item.title : '' }} </span>
			                </el-tooltip>
			                <span class="time fr">{{item ? item.date : null | dateFormat('MM-dd HH:mm') }}</span>
			            </li>
			        </ul>
			        <div v-else class="isNull-list">
			            暂无公告
			        </div>
			    </div>
			</div>
		</section>

		<!-- 课程 -->
		<section class="info-course">
			<h4 class="common-head bgw">课程信息</h4>	
			<ul class="course-list clearfix">
				<router-link class="course-list-item fl" tag="li" :to="{ path: '/' }" v-for="(item, index) in courseList" :key="index">
					<div class="course-msg bgw">
						<div class="course-img">
							<img :src="item.img" alt="">
						</div>
						<p class="course-tit ellipsis">{{item.title}}</p>
						<p class="author-date">
							<span>{{item.author}}</span>
							发布于
							<time>{{item.date | dateFormat('yyyy-MM-dd HH:mm')}}</time>
						</p>
					</div>
				</router-link>
			</ul>
		</section>
	</div>
</template>

<script>
	import { requestArticle, requestNotice, requestData } from '@/service/info.js'
	import articleList from '@/components/info/article_list.vue'

	export default {
		name: 'infoHomePage',
		components: {
			articleList
		},
		data() {
			return {
				articleList: [],
				noticeList: [],
				courseList: []
			}
		},
		mounted() {
			this.getArticle()
			this.getNoticeList()
			this.getCourseList()
		},
		methods: {
			// 获取文章数据
			getArticle() {
				requestArticle({}).then((res) => {
					if (res.data.code === 100) {
						this.articleList = res.data.data
					}
				})
			},
			// 获取公告列表
			getNoticeList() {
                const params = {}
                requestNotice(params).then((res) => {
                    if (res.data.code === 100) {
                        this.noticeList = res.data.data
                    }
                })
            },
            // 获取课程列表
            getCourseList() {
                const params = {}
                requestData(params).then((res) => {
                    if (res.data.code === 100) {
                        this.courseList = res.data.data
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
@import '~@/assets/common/course-list.scss';

.publish-btn-group {
	box-sizing: border-box;
	padding: 20px;
	margin: 20px 0;
}

.index-info {
	padding: 10px;
	max-height: 543px;
	overflow: hidden;
	margin-bottom: 20px;
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

.notice_board {
    box-sizing: border-box;
    font-size: 14px;
    max-height: 269px;
    overflow: hidden;
    margin-bottom: 20px;
    .title {
        font-size: 18px;
        padding: 12px 0px;
        border-bottom: 1px solid #c9c9c9;
        text-indent: .5em;
    }
    .bulletin_ul {
        padding: 15px 10px 0;
        overflow: hidden;
        .bulletin_li {
            padding: 10px 0 0;
            border-bottom: 1px solid #ccc;
            transition: all 1s;
            cursor: pointer;
            text-overflow:ellipsis;
            line-height: 2;
            .msg {
                display: inline-block;
                width: 60%;
                overflow:hidden;
                white-space:nowrap;
                text-overflow:ellipsis;
            }
            .time {
                color: #999;
            }
        }
    }
}


</style>