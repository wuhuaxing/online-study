<template>
	<div class="detail-wrap mt20">
		<section class="detail-msg bgw">
			<h4 class="detail-tit">
				{{detail.title}}
				<sub class="author-date">
					—— <span class="c-blue">{{detail.author}} </span>
					发表于 {{detail.date | dateFormat('yyyy-MM-dd HH:mm')}}
				</sub>
			</h4>
			<article class="detail-content">
				{{detail.content}}
			</article>
		</section>

		<section class="detail-comment pr bgw">
			<h4 class="common-head">大家的回答</h4>
			<el-button type="primary" plain class="btn" @click="visible.show = true" size="mini">我来回答</el-button>
			<ul class="comment-list" v-if="detail.evaluateDTOList.length">
				<li class="comment-item" v-for="(item, index) in detail.evaluateDTOList" :key="index">
					<p class="comment-author">#{{index + 1}}楼:</p>
					<article class="comment-content">{{item.content}}</article>
					<div class="date">
						—— <span class="c-blue">{{item.author || '无名'}}</span> 的回答{{item.date | dateFormat('yyyy-MM-dd HH:mm')}}
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>
				还没有人回答这个问题呢
			</div>
		</section>
		<add-comment :visible.async="visible" :title="'回答'" :type="detail.type" @callback="getDetail"></add-comment>
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
		.detail-tit {
			font-size: 18px;
			margin-bottom: 10px;
		}
		.author-date {
			margin-bottom: 20px;
			margin-left: 10px;
		}
		.detail-desc {
			font-size: 14px;
			line-height: 1.5;
			margin-bottom: 20px;
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