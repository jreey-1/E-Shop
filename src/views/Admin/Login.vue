<template>
	<div class="bg-box">

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>登录</span>
			</div>

			<el-form ref="form" :model="form" label-width="60px" :rules="rules">
				<el-form-item label="账号" class="label" prop="username">
					<el-input v-model="form.username" placeholder="请输入登录用户名"></el-input>
				</el-form-item>

				<el-form-item label="密码" class="label" prop="password">
					<el-input type="password" v-model="form.password" placeholder="请输入登录密码"></el-input>
				</el-form-item>

				<el-form-item class="btn-box">
					<el-button type="primary" @click="handleLogin('form')">登录</el-button>
				</el-form-item>
			</el-form>

			<div class="cart-footer">
				<router-link to="/register">注册账户</router-link>
				<span>忘记密码</span>
			</div>
		</el-card>


	</div>
</template>

<script>
	import {Admin} from "@/api/index";

	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
				},
				rules: {
					// required: true, 必填项
					username: [{
							required: true,
							message: '请输入登录用户名',
							trigger: 'blur'
						},{
							min: 3,
							max: 20,
							message: '用户名长度为3-20位字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						},
						{
							pattern: /[0-9]{3,}/,
							message: '密码至少为3位数字',
							trigger: 'blur'
						}
					],
				},
			}
		},
		methods: {
			handleLogin(form) {
				// 获取组件对象，校验整个表单
				this.$refs[form].validate(async (valid) => {
					// valid为校验之后的成功失败状态
					if (valid) {
						// 发送ajax
						let {status, msg, data} = await Admin.login(this.form);
						
						if(status) {
							this.$message.success(msg);
							//缓存数据
							sessionStorage.id = data.id;
							sessionStorage.role = data.role;
							sessionStorage.token = data.token;
							// 编程式导航跳转界面
							// 重定向状态码301
							// 重定向
							let isQuery = this.$route.query.redirect;
							
							if(!isQuery){
								// 默认跳转至文章列表
								this.$router.replace('/goods/list')
							}else{
								// 如果是被强制跳转到登录界面的
								// 登录后跳转至先前欲跳转的界面
								this.$router.replace(isQuery)
							}
						}else{
							this.$message.error(msg);
						}
					} 
				});
			},
		}
	}
</script>

<style lang="less" scoped="scoped">
	.bg-box {
		background-image: url('../../assets/img/login-bg.jpg');
		background-size: cover;
		height: 100%;
		position: relative;

		.box-card {
			width: 350px;
			position: absolute;
			right: 60px;
			top: 50%;
			transform: translateY(-50%);
			font-size: 14px;

			.el-form-item {
				margin-bottom: 24px;
			}

			.el-form-item.btn-box {
				// width: 100%;
				// margin-left: 0;

				.el-form-item__content {
					margin-left: 0 !important;

					button {
						width: 100%;
						padding: 12px 10px;
						font-size: 16px;
					}
				}
			}

			.cart-footer {
				display: flex;
				justify-content: space-between;
			}

			.el-card__header {
				padding: 14px 20px;
			}

			.el-form-item__label {
				font-weight: bold;
			}
		}

	}
</style>
