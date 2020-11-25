<template>
	<div class="bg-box">

		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>注册</span>
			</div>

			<el-form ref="form" :model="form" label-width="70px" :rules="rules">
				<el-form-item label="账号" class="label" prop="username">
					<el-input v-model="form.username" placeholder="请输入登录用户名"></el-input>
				</el-form-item>

				<el-form-item label="密码" class="label" prop="password">
					<el-input type="password" v-model="form.password" placeholder="请输入登录密码"></el-input>
				</el-form-item>
				
				<el-form-item label="姓名" class="label" prop="fullname">
					<el-input v-model="form.fullname" placeholder="请输入姓名"></el-input>
				</el-form-item>
				
				 <el-form-item label="性别" prop="sex">
				    <el-radio-group v-model="form.sex">
				      <el-radio label="男"></el-radio>
				      <el-radio label="女"></el-radio>
				    </el-radio-group>
				  </el-form-item>
				
				<el-form-item label="手机" class="label" prop="tel">
					<el-input v-model="form.tel" placeholder="请输入手机号"></el-input>
				</el-form-item>
				
				<el-form-item class="checked" prop="delivery">
					<el-checkbox-group v-model="form.delivery">
					      <el-checkbox label="同意本站用户使用协议" name="type"></el-checkbox>
					     
					    </el-checkbox-group>
				   <!-- <el-switch v-model="form.delivery"></el-switch>
					<span>同意本站用户使用协议</span> -->
				  </el-form-item>
				
				<el-form-item class="btn-box">
					<el-button type="primary" @click="handleRegister('form')">注册</el-button>
				</el-form-item>
			</el-form>
			
			<div class="cart-footer">
				<router-link to="/login">登录账户</router-link>
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
					fullname:'',
					sex:'',
					tel:'',
					delivery:[],
				},
				
				rules:{
					username:[{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					},{
						min: 3,
						max: 20,
						message: '用户名长度为3-20位字符',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '请输入登录密码',
						trigger: 'blur'
					},{
						pattern: /[0-9]{3,}/,
						message: '密码至少为3位数字',
						trigger: 'blur'
					}],
					fullname:[{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					},{
						pattern: /^[\u4e00-\u9fa5]{2,6}$/,
						message: '请输入正确格式的姓名',
						trigger: 'blur'
					}],
					sex:[{ required: true, message: '请选择性别', trigger: 'change'}],
					tel:[{
						required: true,
						message: '请输入手机号',
						trigger: 'blur'
					},{
						pattern: /^1[3456789]\d{9}$/,
						message: '请输入正确的手机号',
						trigger: 'blur'
					}],
					delivery:[{
						type:'array',
						required: true,
						message: '同意用户使用协议才能注册',
						trigger: 'change'
					}]
				}
			}
		},
		methods:{
			handleRegister(form){
				this.$refs[form].validate(async (valid) =>{
					if(valid){
						let { status, msg, data} = await Admin.register(this.form);
						if(status){
							this.$message.success(msg);
							// 缓存
							sessionStorage.id = data.id;
							sessionStorage.role = data.role;
							sessionStorage.token = data.token;
							
							this.$router.replace('/goods/list')
						}else{
							this.$message.error(msg);
						}
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.bg-box {
		background-image: url('../../assets/bg.jpg');
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
			
			.el-form{
				.checked{
					.el-form-item__content{
						margin-left: 0!important;
					}
					
				}
			}
			.btn-box{
				width: 100%;
				margin-left: 0;
				
				.el-form-item__content{
					margin-left: 0 !important;
					
					button{
						width: 100%;
						padding: 12px 10px;
						font-size: 16px;
					}
				}
			}
			.cart-footer{
				display: flex;
				justify-content: space-between;
			}
			.el-card__header{
				padding: 14px 20px;
			}
			.el-form-item__label{
				font-weight: bold;
				text-align: center;
			}
			
			.checked .el-form-item__content{
				margin-left: 0!important;
				padding: 0 10px;
				
				.el-switch{
					margin-right: 10px;
				}
			}
		}
		
	}
</style>
