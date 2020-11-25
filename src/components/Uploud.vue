<template>
	<div class="top1" @mouseenter="_handleShow" @mouseleave="_handleNone">
		<el-upload class="avatar-uploader" :headers="header" action="/upload/common/" :data="{type:'avatar'}" :show-file-list="false" :on-success="handleAvatarSuccess"
		 :before-upload="beforeAvatarUpload" :on-error="handleAvatarError">
			<img v-if="value.avatar" :src="value.avatar" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			<div @click.stop="_handleRemove" class="cont" :class="{active:isActive}">
				<i class="el-icon-delete"></i>
			</div>
		</el-upload>
	</div>
</template>

<script>
	import { Role } from '@/api/index';
	
	export default {
		props: ['value', 'isActive','header','avatar'],
		methods: {
			handleAvatarSuccess({ status, src, msg }) {
				if (status) {
					this.$message.success(msg);
					this.value.avatar = src;
				}
			},
			handleAvatarError(err, file, fileList) {
				console.dir(err);
				if (err) {
					let res = JSON.parse(err.message);
					this.$message.error(res.msg);
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			_handleShow() {
				if (this.value.avatar) {
					this.$emit('confim');
				}
			},
			_handleNone() {
				this.$emit('none');
			},
			async _handleRemove() {
				let isDefault = this.value.avatar.indexOf('default')>=0;
				if(isDefault){
					this.value.avatar='';
					this.$emit('none');
					return
				}
				let {status} = await Role.remove({src:this.value.avatar});
				if(status){
					this.$message.success("删除成功！");
					this.value.avatar='';
					this.$emit('none');
				}
			}
		}
	}
</script>

<style lang="less">
	.top1 {
		width: 180px;
	}

	.avatar-uploader {
		position: relative;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .cont {
		height: 100%;
		width: 100%;
		position: absolute;
		background-color: rgba(0, 0, 0, 0.4);
		z-index: 999;
		top: 0;

		.el-icon-delete {
			font-size: 30px;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateY(-50%) translateX(-50%);
			color: #FFFFFF;
		}
	}

	.active {
		display: none;
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
