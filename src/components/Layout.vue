<template>
	<div class="box">
		<el-container>
			<el-header class="header">
				
				<nav-header></nav-header>
				
			</el-header>
			<el-container class="content">
				<el-aside width="200px">
					
					<left-menu></left-menu>
					
				</el-aside>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
			
		</el-container>


	</div>

</template>

<script>
	import NavHeader from '@/components/NavHeader.vue'
	import LeftMenu from '@/components/LeftMenu.vue'
	export default {
		components: {
			NavHeader,
			LeftMenu,

		}
	}
</script>

<style lang="less">
	html,body{
		overflow: auto!important;
	}
	.box {
		height: 100%;
		section {
			height: 100%;
		}
	}

	.header.el-header {
		position: fixed;
		width: 100%;
		top: 0;
		padding: 0;
	}
	.box>.el-container>.content{
		padding-top: 60px;
	}
	.box-card {
		margin-bottom: 20px;
		.box-card-title {
			font-size: 16px;
		}
	}
	.el-aside{
		width: auto!important;
	}
</style>
