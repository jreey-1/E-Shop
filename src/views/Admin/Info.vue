<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<!-- 表单 -->
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="账户" prop="username">
				<el-input disabled="disabled" v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="name">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<single-upload :url.sync="ruleForm.avatar"></single-upload>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import SingleUpload from '@/components/SingleUpload';
	import {
		Admin
	} from '@/api/index'
	export default {
		components: {
			SingleUpload
		},
		props: ['id'],
		data() {
			return {
				// isActive: true,
				// avatar: '',
				// fromEdit: {},
				imageUrl: '',
				// 表单
				ruleForm: {
					username: '',
					fullname: '',
					avatar: '',
					tel: '',
				},
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				rules: {
					username: [{
						required: true,
						message: '请选择用户名',
						trigger: 'blur'
					}],
					fullname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
							required: true,
							message: '请输入手机号',
							trigger: 'blur'
						},
						{
							pattern: /0?(13|14|15|17|18|19)[0-9]{9}/, //使用正则的时候不能设置type的number类型，否则会出现错误
							message: '请输入正确的手机号',
							trigger: 'blur'
						}
					],
				},
			}
		},
		created() {
			let {
				id
			} = this.$route.params;
			this.loadInfo(id);
		},
		methods: {
			handleShow() {
				this.isActive = false;
			},
			handNone() {
				this.isActive = true;
			},
			// 加载管理员个人资料
			async loadInfo(id) {
				let {
					status,
					data
				} = await Admin.info({
					id
				});
				if (status) {
					this.ruleForm = data;
				}
			},
			handleRemove(file, fileList) {
				console.log(file, fileidList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if (valid) {
						// 保存的函数
						let {
							status,
							data,
							msg
						} = await Admin.saveInfo(this.ruleForm);
						if (status) {
							this.ruleForm = data;
							this.$message.success(msg);
							this.$router.push('/admin/list');
						}
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			}
		}
	}
</script>

<style scoped="scoped">
	.el-form{
		width: 800px;
		margin: 0 atuo;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}
</style>
