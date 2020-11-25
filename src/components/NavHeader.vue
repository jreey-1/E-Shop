<template>

	<div class="bg-nav">
		<div class="nav-photo">
			<img height="60px" src="@/assets/logo.efe6a81a.png" alt="">
			<i @click="toggleMenu" :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}" style="color: white; line-height: 60px; font-size: 20px; vertical-align: middle; outline: 0;"></i>
			<!-- <i @click="toggleMenu" v-show="isCollapse" class="el-icon-s-unfold" style="color: white; line-height: 60px; font-size: 20px; vertical-align: middle; outline: 0;"></i> -->			
		</div>
		<!-- <div>
			<el-button @click="decrement(5)">-</el-button>
			{{count}}
			{{fullName}}
			<el-button @click="handleIncrease">+</el-button>
		</div> -->
		<div class="nav-down" :data="form">
			<span class="avatar">
				<template>
					<el-avatar :size="40" :src="info.avatar"></el-avatar>
					<!-- <img :src="form.avatar" alt=""> -->
				</template>
			</span>
			<el-dropdown trigger="click" @command="handleCommand">
				<span class="el-dropdown-link">
					{{info.fullname}}
					<i class="el-icon-arrow-down el-icon--right"></i>
				 </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="info">消息</el-dropdown-item>
					<el-dropdown-item command="set">设置</el-dropdown-item>
					<el-dropdown-item command="logout">退出登录</el-dropdown-item>

				</el-dropdown-menu>
			</el-dropdown>
		</div>

	</div>
</template>

<script>
	import { mapState,mapGetters,mapMutations } from 'vuex';
	import { Admin } from '@/api/index'
	
	export default{
		data(){
			return{
				form:{
					
				}
			}
		},
		// computed:mapState({
			// 和仓库的名字不一样
		// 	num:'count'
		// }),
		// computed:mapState(['count','x','y','z']),//和仓库的名字一样时
		computed:{
			// ...mapState('menu',['isCollapse'];),
			// ...mapState('user',['info']),
			...mapState({			
				'info':state => state.user.info,
				'count':state => state.counter.count,
				'isCollapse':state => state.menu.isCollapse,
			}),
			// fullName(){
			// 	return this.$store.getters.fullName
			// },
			...mapGetters('name',['fullName']),
			// ...mapState('counter',['count']) //如果不光光有仓库的，还有自己使用的计算属性，推荐使用
		},
		methods:{
			...mapMutations({
				handleIncrease:'counter/increment',
				toggleMenu:'menu/toggleMenu'
			}),
			...mapMutations(
				'counter',['decrement'],
			),
			// handleIncrease(){
			// 	// vuex
			// 	this.$store.commit('increment',10);
			// },
			// handleReduce(){
			// 	this.$store.commit('decrement',10)
			// },
			handleCommand(command){
				if(command === 'set'){
					this.$router.replace('/account/info');
				}
				
				if(command === 'logout'){
					this.$router.replace('/login');
					this.$message.success('退出登录');
					
					sessionStorage.id = "";
					sessionStorage.role = "";
					sessionStorage.token = "";
				}else if(command === 'set'){
					this.$router.replace('/account/infos');
				}
				
			}
		},
		created() {
			
			this.$store.dispatch('user/loadInfos');
		}
	}
</script>

<style lang="less" scoped="scoped">
	.bg-nav {
		background-color: #31404e;
		color: white;
		height: 100%;
		display: flex;
		justify-content: space-between;
		.nav-photo{
			position: relative;
			i{
				position: absolute;
			}
		}
		.nav-down {
			display: flex;
			align-items: center;
			margin-right: 30px;

			.avatar {
				height: 40px;
				overflow: hidden;

				img {
					width: 40px;
				}
			}

			button {
				background-color: #31404e;
				border: 0;
			}
			.el-dropdown-link{
				color: white;
				outline: none;
				border: 0;
				margin-left: 10px;
			}
		}

	}
</style>
