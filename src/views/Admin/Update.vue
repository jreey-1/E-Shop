<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>编辑管理员</span>
		</div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名" prop="fullname">
				<el-input v-model="ruleForm.fullname"></el-input>
			</el-form-item>
			<el-form-item label="角色" prop="role">
				<el-select v-model="ruleForm.role" placeholder="超级管理员">
					<el-option label="设计" value="shanghai"></el-option>
					<el-option label="区域二" value="beijing"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="ruleForm.sex">
					<el-radio name="sex" label="男"></el-radio>
					<el-radio name="sex" label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机" prop="tel">
				<el-input v-model="ruleForm.tel"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<!-- <el-upload class="avatar-uploader" :headers="header" :data="{type:'avatar'}" action="/upload/common/" :show-file-list="false"
				 :on-success="handleAvatarSuccess" :on-error="handleAvatarError" :before-upload="beforeAvatarUpload">
					<img v-if="ruleForm.avatar" :src="ruleForm.avatar" class="avatar">
					<i v-else class="el-9898989898iuuuuuuicon-plus avatar-uploader-icon"></i>
				</el-upload> -->
				<uploud @confim="handleShow" @none="handNone" :avatar="avatar" :value.sync="ruleForm" :header="header" :isActive="isActive">

				</uploud>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">保存修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import { Admin } from '@/api/index';
	import Uploud from '@/components/Uploud.vue';
	export default {
		components: {
			Uploud,
		},
		data() {
			return {
				avatar: "",
				imageUrl: '',
				isActive: true,
				ruleForm: {
					username: "",
					fullname: "",
					sex: '',
					tel: "",
					email: '',
					avatar: "",
				},
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				rules: {
					name: [
						{ required: true, message: '请输入标题', trigger: 'blur' },
						{ min: 3, message: '长度至少 3 个字符', trigger: 'blur' }
					],
					describe: [
						{ required: true, message: '请输入描述', trigger: 'blur' },
						{ min: 3, message: '长度至少 3 个字符', trigger: 'blur' }
					]
				},
			}
		},
		created() {
			let { id } = this.$route.params;
			this.loadInfo(id)
		},
		methods: {
			// 加载管理员个人资料
			async loadInfo(id) {
				let { status, data } = await Admin.info({ id });
				if (status) {
					this.ruleForm = data;
				}
			},
			async update() {
				let { status } = await Admin.update(this.ruleForm);
				if (status) {
					this.$router.push('/admin/list/')
				}
			},
			onSubmit() {
				this.update();
				console.log('submit!');
			},
			// submitForm() {
			// 	// 获取组件对象，校验整个表单
			// 	console.log(this.$refs.ruleForm);
			// 	this.$refs.ruleForm.validate((valid) => {
			// 		console.log(valid);
			// 	});

			// },

			// handleAvatarSuccess({ status, src, msg }) {
			// 	// this.fromEdit.avatar = URL.createObjectURL(file.raw);
			// 	if (status) {
			// 		this.$message.success(msg);
			// 		this.ruleForm.avatar = src;
			// 	}
			// },
			// handleAvatarError(err, file, fileList) {
			// 	console.dir(err);
			// 	if (err) {
			// 		let res = JSON.parse(err.message);
			// 		this.$message.error(res.msg);
			// 	}
			// },

			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type === 'image/jpeg';
			// 	const isLt2M = file.size / 1024 / 1024 < 2;

			// 	if (!isJPG) {
			// 		this.$message.error('上传头像图片只能是 JPG 格式!');
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.error('上传头像图片大小不能超过 2MB!');
			// 	}
			// 	return isJPG && isLt2M;
			// },
			handleShow() {
				this.isActive = false;
			},
			handNone() {
				this.isActive = true;
			}


		}
	}
</script>

<style>
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
