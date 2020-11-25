<template>
	<div class="box">
		<div class="title">管理员列表</div>
		<el-table :data="tableData" style="width: 97%">
			<el-table-column prop="id" label="#" width="80"></el-table-column>
			<el-table-column prop="username" label="用户名" width="140"></el-table-column>
			<el-table-column prop="fullname" label="姓名"></el-table-column>
			<el-table-column prop="sex" label="性别" width="80"></el-table-column>
			<el-table-column prop="tel" label="手机"></el-table-column>
			<el-table-column prop="email" label="邮箱"></el-table-column>
			<el-table-column prop="avatar" label="头像">
				<template slot-scope="tableData">
					<img :src="tableData.row.avatar" alt="" height="50px">
				</template>
			</el-table-column>
			<el-table-column prop="button" label="操作" width="200">
				<template slot-scope="tableData">
					<router-link :to="{name:'AdminUpdate',params:{id:tableData.row.id}}" style="color: white;">
						<el-button type="primary" icon="el-icon-edit"> 编辑</el-button>
					</router-link>
				<!-- 	<el-link :href="``">
						<el-button type="primary" icon="el-icon-edit"> 编辑</el-button>
					</el-link> -->
					<el-button type="danger" icon="el-icon-delete" @click="open(tableData.row.id,tableData.$index)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import { Admin } from "@/api/index"
	export default {
		data() {
			return {
				tableData: []
			}
		},
		created() {
			this.loadList()
		},
		methods: {
			async loadList() {
				let { status, data } = await Admin.list()
				if (status) {
					this.tableData = data
				}
			},

			open(id, index) {

				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					console.log(typeof id);
					let { status } = await Admin.del(id);
					this.tableData.splice(index, 1);
					if (status) {
						this.$message.success('删除成功!');
					}
				}).catch(() => {
					this.$message.info('已取消删除');
				});
			}
		}
	}
</script>

<style lang="less">
	.red {
		background-color: #F56C6C;
		border: #F56C6C;
	}

	.box {
		box-shadow: 0 0 12px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.6);

		.title {
			height: 52px;
			line-height: 52px;
			font-size: 18px;
			color: rgb(48, 49, 51);
			padding-left: 15px;
			border-bottom: 1px solid rgb(235, 238, 245);
			margin-bottom: 20px;
		}

		.el-table {
			margin: 0 auto;
		}

		.el-button {
			margin-left: 10px;
		}
	}
</style>
