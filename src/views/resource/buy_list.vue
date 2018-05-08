<template>
	<div class="buy-list container bgw">
		<h4 class="common-head mt20 mb20 bgw">我的购买的资源</h4>
		<div class="list-box">
			<ul class="" v-if="buyList.length">
				<li class="list-item table-layout" v-for="(item, index) in buyList" :key="index">
					<div class="info-img table-cell">
						<img :src="handleImg(index)" alt="" width="180" height="100">
					</div>
					<div class="list-info table-cell">
						<h4 class="info-tit">{{item.title}}</h4>
						<p>价格: ￥{{item.price}}</p>
					</div>
					<div class="table-cell list-btn">
						<el-button type="primary" @click="$router.push({ path: '/course/courseDetail', query: { id: item.id } })">查看详情</el-button>
					</div>
				</li>
			</ul>
			<div class="empty-block" v-else>暂无购买记录哦</div>
		</div>
	</div>
</template>

<script>
	import img1 from '@/assets/danpianji.png'
    import img2 from '@/assets/java.png'
    import img3 from '@/assets/logo.png'
    import img4 from '@/assets/qianrushi.png'

	export default {
		data() {
			return {
				userId: localStorage.getItem('loginInfo') ? JSON.parse(localStorage.getItem('loginInfo')).id : '',
				buyList: []
			}
		},
		mounted() {
			const buyList = localStorage.getItem('buyList') ? JSON.parse(localStorage.getItem('buyList')) : []
			this.buyList = buyList.filter((x) => x.buyId.includes(this.userId))
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