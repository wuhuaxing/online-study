<template>
	<div class="discuss-home-page">
		<div class="publish-btn-group bgw">
			<el-button type="primary" plain @click="publish('/course/publishOnlineCourse')">发布网络课程</el-button>
		</div>
		<!-- 课程 -->
		<section class="discuss-course">
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
	</div>
</template>

<script>
	import { requestCourse } from '@/service/course.js'

	export default {
		name: 'discussHomePage',
		data() {
			return {
				courseList: [],
			}
		},
		mounted() {
			this.getCourseList()
		},
		methods: {
            // 获取课程列表
            getCourseList() {
                const params = {}
                requestCourse(params).then((res) => {
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

</style>