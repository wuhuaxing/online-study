<template>
	<div class="article-list-wrap">
		<ul class="article-list" v-if="articleList.length">
			<router-link tag="li" :to="{ path: '/' }" class="article-list-item table-layout" v-for="(item, index) in articleList" :key="index">
				<div class="article-item-img table-cell">
					<img :src="item.img">
				</div>
				<div class="article-item-msg table-cell">
					<p class="article-tit multi-ellipsis">{{item.title}}</p>
					<div class="author-date">
						<span class="article-author">{{item.author || '某人'}}</span> 
						发表于
						<time>{{item.date | dateFormat('yyyy-MM-dd HH:mm')}}</time>
					</div>
				</div>
			</router-link>
		</ul>
		<div class="empty-block" v-else>暂无文章哦</div>
	</div>
</template>

<script>
	export default {
		name: 'articleList',
		data() {
			return {
				
			}
		},
		props: {
			articleList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		mounted() {
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
@import '../../assets/common/vars.scss';
	.article-list {
		.article-list-item {
			padding: 10px 5px;
			border-bottom: 1px dashed #ccc;
			box-sizing: border-box;
			.article-item-img {
				width: 150px;
				height: 100px;
				img {
					width: 100%;
					height: 100%;
					border-radius: 5px;
				}
			}
			.article-item-msg {
				padding-left: 10px;
				padding-right: 20px;
				.article-tit{
					height: 48px;
					line-height: 1.5;
					font-size: 16px;
					margin-bottom: 10px;
					word-break: break-all;
				}
				.author-date {
					font-size: 14px;
					color: #999;
				}
			}
			&:hover {
				background-color: #efefef;
				.article-tit {
					color: $theme-color;
				}
			}
		}
	}
</style>