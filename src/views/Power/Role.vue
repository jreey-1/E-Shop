<template>
	<div style="display: flex; justify-content: space-between;">
		<div>
			<el-card class="box-card" style="width: 600px;">
				<div slot="header" class="clearfix">
					<span>角色列表</span>
					<el-button style="float: right; padding: 10px 20px" type="primary" @click="add = true" icon="el-icon-circle-plus-outline">添加角色</el-button>
				</div>
				<div>
					<el-table ref="filterTable" :data="role" style="width: 100%">
						<el-table-column prop="id" label="#" width="100">
						</el-table-column>

						<el-table-column prop="name" label="分类" width="180">
							<template slot-scope="scope">
								<el-tag :type="scope.row.name === '超级管理员' ? 'danger' : 'primary'">{{scope.row.name}}</el-tag>
							</template>
						</el-table-column>
						<el-table-column label="操作">
							<template slot-scope="scope">
								<el-button :disabled="scope.row.name == '超级管理员'?true:false" icon="el-icon-edit" @click="handleEdit(scope.$index, role)"
								 type="primary" plain></el-button>
								<el-button :disabled="scope.row.name == '超级管理员'?true:false" icon="el-icon-delete" @click="handleRemove(scope.$index, role)"
								 type="danger" plain></el-button>
								<el-button icon="el-icon-setting" @click="handleChange(scope.$index, role)" type="primary" plain></el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				<el-dialog title="添加角色" :visible.sync="add">
					<el-form :model="from" ref="from" :rules="rules">
						<el-form-item label="名称" prop="name" label-width="80px">
							<el-input v-model="from.name" autocomplete="off"></el-input>
						</el-form-item>
					</el-form>
					<div slot="footer" class="dialog-footer">
						<el-button @click="add = false">取 消</el-button>
						<el-button type="primary" @click="addRole">确 定</el-button>
					</div>
				</el-dialog>
				<el-dialog title="编辑角色" :visible.sync="edit">
					<el-form :model="editfrom" ref="editfrom" :rules="rules">
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
		</div>
		<div style="flex: 1; margin-left: 20px;" v-show="active">
			<div v-for="(item,i) in List">
				<el-card class="box-card">
					<div slot="header" style="display: flex; justify-content: space-between;">
						<span style="color: #409EFF;"><i class="el-icon-collection-tag"></i>{{item.name}}</span>
						<el-switch v-model="item.checked" @change="handleMuen(item.checked,item.id,item.children)"></el-switch>
					</div>
					<div>
						<div v-for="child in item.children" style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 10px;">
							<span>{{child.name}}</span>
							<el-switch v-model="child.checked" @change="handleSubMuen(child.checked,item,child.id)"></el-switch>
						</div>
					</div>
				</el-card>
			</div>
		</div>
	</div>
</template>

<script>
	import { Role } from '@/api/index';
	export default {
		data() {
			return {
				role: [],
				edit: false,
				add: false,
				value1: true,
				active: false,
				checkedAll: 0,
				List: [],
				fromData: [],
				muen: {
					role_id: '',
					menu_id: '',
				},
				from: {
					name: '',
				},
				editfrom: {
					id: '',
					name: '',
				},
				rules: {
					name: [
						{ required: true, message: '请输入分类名称', trigger: 'blur' },
						{ pattern: /[\u4e00-\u9fa5]/, message: '长度在 1 到 5 个字符', trigger: 'blur' }
					]
				}
			}
		},
		created() {
			document.title="用户角色";
			this.locadList();
		},
		methods: {
			//删除角色
			async roleRemove(id) {
				let { status } = await Role.del(id);
				if (status) {
					this.locadList();
				}
			},
			handleRemove(index, rows) {

				this.$confirm('此操作将永久删除该文件, 是否继续?', {
					type: 'warning'
				}).then(() => {
					// 确定时执行的代码，
					let { id } = rows[index];
					this.roleRemove(id);
					this.$message.success('删除成功!');
				}).catch(() => {
					// 取消时执行的代码
					this.$message.info('已取消删除');
				});
			},
			// 获取列表
			async locadList() {
				let { status, data } = await Role.list();
				if (status) {
					this.role = data;
				}
			},
			// 添加角色
			addRole() {
				this.$refs.from.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Role.add(this.from);
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
				let { name, id } = rows[index];
				this.editfrom.name = name;
				this.editfrom.id = id;
			},
			// 确定编辑
			editRole() {
				this.$refs.editfrom.validate((valid) => {
					if (valid) {
						this.EditRole(this.editfrom);
						this.edit = false;
					}
				})
			},
			async EditRole(data) {
				let { status } = await Role.edit(data);
				if (status) {
					this.locadList();
				}
			},
			// 点击菜单配置
			handleChange(index, rows) {
				this.active = true;
				let { id } = rows[index];
				this.locadObtain(id);
			},
			// 根据角色id获取菜单配置
			async locadObtain(id) {
				this.muen.role_id = id;
				let { status, data } = await Role.obtain(id);
				if (status) {
					this.List = data;
				}
			},
			async handleMuen(checked, id, children) {
				if (checked) {
					this.muen.menu_id = id;
					let { status } = await Role.addMuen(this.muen);
					if(status){
						this.$message.success("添加权限成功！")
					}
					children.forEach(async (item, index) => {
						item.checked = true;
						this.muen.menu_id = item.id;
						let { status } = await Role.addMuen(this.muen);
					});
				} else {
					this.muen.menu_id = id;
					let { status } = await Role.DelMuen(this.muen);
					if(status){
						this.$message.success("删除权限成功！")
					}
					children.forEach(async (item, index) => {
						if(item.checked){
							item.checked = false;
							this.muen.menu_id = item.id;
							let { status } = await Role.DelMuen(this.muen);
						}
					});
				}
			},
			async handleSubMuen(checked, parent, id) {
				if(checked){
					this.muen.menu_id = id;
					let { status } = await Role.addMuen(this.muen);
					if(status){
						this.$message.success("添加权限成功！")
					}
					if(!parent.checked){
						parent.checked = true;
						this.muen.menu_id = parent.id;
						let { status } = await Role.addMuen(this.muen);
					}
				}
				if(!checked){
					this.muen.menu_id = id;
					let { status } = await Role.DelMuen(this.muen);
					if(status){
						this.$message.success("删除权限成功！")
					}
					for(var b=0;b<parent.children.length;b++){
						var checked2 = parent.children[b].checked;
						if(checked2){
							this.checkedAll++;
						}
					}
					if(this.checkedAll>0){
						this.checkedAll=0
					}else{
						parent.checked = false;
						this.muen.menu_id = parent.id;
						let { status } = await Role.DelMuen(this.muen);
					}
				}
			}
		},


	}
</script>

<style>
	.el-card {
		margin-bottom: 20px;
	}

	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>
