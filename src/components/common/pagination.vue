<template>
	<div class="pagination cf">
	    <el-pagination
	    	class="fr"
	    	background
	        @current-change="changePage"
	      	:current-page="pageParams.pageNum"
	      	:page-size="pageParams.pageSize"
	      	layout="total, prev, pager, next"
	      	:total="pageParams.totalNum" v-if="pageParams.totalNum > 0">
	    </el-pagination>
  </div>
</template>

<script>
	export default {
		name: 'pagination',
		data() {
			return {}
		},
		props: {
			pageParams: {
				type: Object,
				default() {
					return {
						pageNum: 1,
						pageSize: 10,
						totalNum: 0
					}
				}
			}
		},
		methods: {
			changePage(val) {
				this.pageParams.pageNum = val
				this.$emit('callback', val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pagination {
		margin: 20px 0;
	}
</style>