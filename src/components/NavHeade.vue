<template>
	<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff"
	 active-text-color="#ffd04b">
		
		<div>
			<img src="@/assets/logo.efe6a81a.png" height="60" alt="" style="vertical-align: middle; outline: 0;">
			<i class="el-icon-s-operation" style="color: white; line-height: 60px; font-size: 20px; vertical-align: middle; outline: 0;"></i>
		</div>
		
		<div class="nav-down">
			<span class="avatar">
				<img src="../assets/58.jpg" alt="">
			</span>
			<el-dropdown trigger="click">
				<el-button type="primary">
					赵薇
					<i class="el-icon-arrow-down el-icon--right"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item>退出登录</el-dropdown-item>

				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</el-menu>
</template>

<script>
	export default {
		data() {
			return {
				activeIndex: '1',
				activeIndex2: '1'
			};
		},
	}
</script>

<style lang="less" scoped="scoped">
	header{
		background-color: #31404e;
		color: white;
		height: 100%;
		display: flex;
		justify-content: space-between;
		
		ul{
			display: flex;
			justify-content: space-between;
			.nav-down{
				// float: right;
			}
		}
		
	}
	header>ul{
		
		
	}
	// .bg-nav {
		

	// 	.nav-down {
	// 		display: flex;
	// 		align-items: center;
	// 		margin-right: 20px;

	// 		.avatar {
	// 			height: 40px;
	// 			overflow: hidden;

	// 			img {
	// 				width: 40px;
	// 			}
	// 		}

	// 		button {
	// 			background-color: #31404e;
	// 			border: 0;
	// 		}

	// 	}

	// }
</style>
