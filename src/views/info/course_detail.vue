<template>
	<div class="detail-wrap mt20">
		<section class="detail-msg table-layout bgw">
			<div class="detail-img table-cell">
				<img :src="detail.img" width="400" height="220">
			</div>
			<div class="msg-item table-cell">
				<h4 class="detail-tit">{{detail.title}}</h4>
				<p class="item">发布者：{{detail.author}}</p>
				<p class="item">发布日期：{{detail.data | dateFormat('yyyy-MM-dd HH:mm')}}</p>
				<p class="item" v-if="detail.tab != null">课程标签：<el-tag size="mini" v-for="(item, index) in detail.tab.split('、')" :key="index">{{item}}</el-tag></p>
				<p class="item">课程概述：{{detail.desc}}</p>
			</div>
		</section>

		<section class="detail-comment pr bgw">
			<h4 class="common-head">课程讨论区</h4>
			<el-button type="primary" plain class="btn" @click="visible.show = true" size="mini">我要发言</el-button>
			<ul class="comment-list" v-if="detail.evaluateDTOList.length">
				<li class="comment-item" v-for="(item, index) in detail.evaluateDTOList" :key="index">
					<p class="comment-author"><span class="c-blue">{{item.author || '无名'}}</span>:</p>
					<article class="comment-content">{{item.content}}</article>
					<div class="date">
						{{item.date | dateFormat('yyyy-MM-dd HH:mm')}}
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>
				暂无评论
			</div>
		</section>
		<add-comment :visible.async="visible" :title="'我要发言'" :type="detail.type" @callback="getDetail"></add-comment>
	</div>
</template>

<script>
	import { requestDetail } from '@/service/discuss.js'
	import addComment from '@/components/common/addEvaluation_dialog'
 
	export default {
		components: { addComment },
		data() {
			return {
				visible: {
					show: false
				},
				detail: {
					evaluateDTOList: []
				}
			}
		},
		mounted() {
            this.getDetail()
		},
		methods: {
			getDetail() {
				requestDetail({ id: this.$route.query.id }).then((res) => {
					if (res.data.code === 100) {
						this.detail = res.data.data
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-content {
		p {
			font-size: 14px;
			line-height: 1.5;
			text-indent: 2em;
		}
	}
</style>

<style lang="scss" scoped>
	@import '~@/assets/common/vars.scss';
	.c-blue {
		color: $theme-color;
	}
	.btn {
		position: absolute;
		top: 10px;
		right: 20px;
	}

	.detail-msg {
		padding: 20px;
		margin-bottom: 20px;
		box-sizing: border-box;
		.detail-tit {
			height: 48px;
			font-size: 18px;
			margin-bottom: 10px;
		}
		.author-date {
			text-align: center;
			margin-bottom: 20px;
		}
		.detail-desc {
			font-size: 14px;
			line-height: 1.5;
			margin-bottom: 20px;
		}

		.detail-img {
			width: 400px;
		}
		.msg-item {
			padding-left: 15px;
			.item {
				font-size: 14px;
				line-height: 1.5;
				margin-bottom: 5px;
			}
		}
	}

	.comment-list {
		padding: 20px;
		.comment-item {
			padding: 10px;
			border-bottom: 1px dashed #ccc;
			.comment-author {
				font-size: 16px;
				margin-bottom: 10px;
			}
			.comment-content {
				line-height: 1.5;
				font-size: 14px;
				margin-bottom: 5px;
			}
			.date {
				text-align: right;
			}
		}
	}
</style>