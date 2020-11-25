<template>
	<div class="card">
		<template>
			<el-card class="box-card" style="width: 460px;">
				<div slot="header" class="clearfix">
					<span>管理员角色</span>
					<el-button @click="add = true" icon="el-icon-circle-plus-outline" style="float: right;" type="primary" plain>添加角色</el-button>
				</div>
				<el-table ref="filterTable" :data="tableData" style="width: 100%">
					<el-table-column width="80px" label="#" prop="id">
					</el-table-column>
					<el-table-column width="150px" prop="name" label="角色">
						<template slot-scope="scope">
							<el-tag size="medium">{{scope.row.name}}</el-tag>
						</template>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button type="primary" plain icon="el-icon-edit" @click="handleEdit(scope.$index, tableData)"></el-button>
							<el-button type="danger" plain icon="el-icon-delete" @click="handleRemove(scope.$index, tableData)"></el-button>
							<el-button type="primary" plain icon="el-icon-setting"></el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 添加分类 -->
				<!-- :visible.sync="dialogFormVisible" -->
				<el-dialog title="添加角色" :visible.sync="add">
					<el-form :model="from" ref="from" :rules="rules">
						<el-form-item label="名称" prop="name" :label-width="formLabelWidth">
							<el-input v-model="from.name" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="add = false">取 消</el-button>
						<el-button type="primary" @click="addRole">确 定</el-button>
					</div>
				</el-dialog>

				<!-- 编辑分类 -->
				<el-dialog title="编辑角色" :visible.sync="edit">
					<el-form ref="editfrom" :rules="rules">
						<el-form-item label="名称" prop="name" label-width="80px">
							<el-input v-model="editfrom.name" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="edit = false">取 消</el-button>
						<el-button type="primary" @click="editRole">确 定</el-button>
					</div>
				</el-dialog>
			</el-card>
		</template>
		<template>
			<el-card class="box-card" style="width: 650px;">
				<div slot="header" class="clearfix">
					<i style="color: #409EFF;" class="el-icon-collection-tag"></i>
					<span style="color: #409EFF;font-size: 14px;">商品管理</span>
					<el-switch style="display: block;float: right;" v-model="value" active-color="#409EFF" inactive-color="#eeeeee">
					</el-switch>
				</div>
				<div class="list_item" v-for="o in 3" :key="o">
					<div class="text item">
						{{'商品分类 ' + o }}
					</div>
					<el-switch style="display: block;float: right;" v-model="value" active-color="#409EFF" inactive-color="#eeeeee">
					</el-switch>
				</div>

			</el-card>
		</template>
	</div>
</template>

<script>
	import {
		Role
	} from '@/api/index';
	export default {
		data() {
			return {
				value: true,
				tableData: [],
				edit: false,
				add: false,
				from: {
					name: '',
				},
				editfrom: {
					id: '',
					name: '',
				},
				rules: {
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur'
						},
						{
							pattern: /[\u4e00-\u9fa5]/,
							message: '长度在 1 到 5 个字符',
							trigger: 'blur'
						}
					]
				},
				formLabelWidth: '120px'
			}
		},
		created() {
			this.locadList();
		},
		methods: {
			// 删除角色
			async roleRemove(id) {
				let {
					status
				} = await Role.roleDel(id);
				if (status) {
					this.locadList();
				}
			},
			handleRemove(index, rows) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', {
					type: 'warning'
				}).then(() => {
					// 确定时执行的代码，
					let {
						id
					} = this.tableData[index];
					this.roleRemove(id);
					this.$message.success('删除成功!');
				}).catch(() => {
					// 取消时执行的代码
					this.$message.info('已取消删除');
				});
			},
			// 获取列表
			async locadList() {
				let {
					status,
					data
				} = await Role.roleList();
				if (status) {
					this.tableData = data;
				}
			},
			// 添加角色
			addRole() {
				this.$refs.from.validate(async (valid) => {
					if (valid) {
						let {
							status,
							msg
						} = await Role.roleAdd(this.from);
						if (status) {
							this.add = false;
							this.from.name = '';
							this.locadList();
						} else {
							this.$message.error(msg);
						}
					}
				})
			},
			// 编辑
			handleEdit(index, rows) {
				this.edit = true;
				let {
					name,
					id
				} = rows[index];
				this.editfrom.name = name;
				this.editfrom.id = id;
			},
			// 确定编辑
			editRole() {
				console.log(66)
				this.$refs.editfrom.validate((valid) => {
					console.log(88)
					if (valid) {
						let {
							id,
							name
						} = this.editfrom;
						this.EditRole(id, name);
						this.edit = false;
					}
				})
			},
			async EditRole(id, name) {
				let {
					status
				} = await Role.roleEdit(id, name);
				if (status) {
					this.locadList();
				}
			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.card {
		display: flex;
		align-items: flex-start;

		.box-card {
			margin-left: 10px;

			.el-header {
				background-color: #B3C0D1;
				color: #333;
				line-height: 60px;
			}

			.el-button--mini,
			.el-button--mini.is-round {
				padding: 7px 10px;
			}

			.el-aside {
				color: #333;
			}
			.list_item {
				color: #909399;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				margin: 5px 0;
			}
		}

	}
</style>
