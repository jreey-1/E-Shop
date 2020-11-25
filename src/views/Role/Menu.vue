<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>菜单权限</span>
		</div>
		<el-alert title="Tips" type="warning" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。" show-icon>
		</el-alert>
		<!-- lazy为开启懒加载 -->
		<el-tree ref="tree" :props="defaultProps" node-key="id" lazy :load="loadNode">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>
					<el-button icon="el-icon-warning-outline" type="text" size="mini">
						图标
					</el-button>
					<el-button @click.stop="editShow(data,node)" icon="el-icon-edit" type="text" size="mini">
						编辑
					</el-button>
					<el-button @click.stop="addShow(data,node)" icon="el-icon-plus" type="text" size="mini">
						添加
					</el-button>
					<el-button @click.stop="handleRemove(data,node)" icon="el-icon-delete" type="text" size="mini">
						删除
					</el-button>
					<span class="number">显示序号：</span>
					<el-tag size="mini">000000</el-tag>
				</span>
			</span>
		</el-tree>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" @close="handleModalClose('form1')" :visible.sync="dialogFormVisible">
			<el-form :model="form1" ref="form1" :rules="rules">
				<el-form-item label="分类名称" prop="name" :label-width="formLabelWidth">
					<el-input v-model="form1.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handlAppend">确 定</el-button>
			</div>
		</el-dialog>

		<!-- 编辑弹窗 -->
		<el-dialog title="编辑分类" @close="handleModalClose('form2')" :visible.sync="editdialogFormVisible">
			<el-form :model="form2" ref="form2" :rules="rules">
				<el-form-item label="分类名称" :label-width="formLabelWidth">
					<el-input v-model="form2.name" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editdialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</div>
		</el-dialog>
		<!-- </div> -->
	</el-card>
</template>


<script>
	import {
		Category
	} from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'name', //指的为category中的name
				},
				node: {}, //节点对象
				nodeData: {}, //节点数据
				// 添加
				dialogFormVisible: false,
				form1: {
					name: '',
					parent_id: ''
				},
				// 编辑
				editdialogFormVisible: false,
				form2: {
					name: '',
					parent_id: ''
				},
				formLabelWidth: '120px',
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
			}
		},
		methods: {
			async loadNode(node, resolve) {
				if (node.level === 0) {
					return resolve([{
						id: 0,
						name: '全部分类'
					}])
				}
				// 获取当前选择的分类 id
				let {
					id
				} = node.data;
				let {
					status,
					data
				} = await Category.subcate({
					id
				});
				if (status) {
					resolve(data);
				}
			},
			// 打开 添加 modal框
			addShow(data, node) {
				this.dialogFormVisible = true;
				// 缓存节点对象
				this.node = node;
				this.form1.parent_id = data.id
			},
			// 添加 节点
			handlAppend() {
				this.$refs.form1.validate(async (valid) => {
					if (valid) {
						let {
							status,
							msg,
							data
						} = await Category.insert(this.form1);
						if (status) {
							this.$message.success(msg);
							this.dialogFormVisible = false;
							//更新dom
							// 新节点的data数据
							let nodeData = { ...this.form1,
								...data
							};
							// 父节点的key/node
							this.$refs.tree.append(nodeData, this.node);
						}
					}
				})
			},
			// 关闭添加modal
			handleModalClose(formName) {
				this.$refs[formName].resetFields();
				// console.log('关闭完成~~~~')
			},
			// 打开编辑 modal 框
			editShow(data, node) {
				this.form2 = { ...data
				};
				// 缓存nodeData
				this.node = node;
				this.editdialogFormVisible = true;
			},
			// 编辑 节点
			handleEdit() {
				this.$refs.form2.validate(async (valid) => {
					if (valid) {
						let {
							status,
							msg
						} = await Category.edit(this.form2);
						if (status) {
							this.$message.success(msg);
							this.editdialogFormVisible = false;
							//修改节点
							this.node.data = { ...this.form2
							}
						}
					}
				})
			},
			handleRemove(node, {
				id
			}) {
				console.log(id, 55)
				this.$confirm('确定要删除此分类密码？', {
						type: "warning"
					})
					.then(async () => {
						//确定
						let {
							status,
							msg
						} = await Category.c_remove({
							id
						});
						if (status) {
							this.$refs.tree.remove(node);
							alert('删除成功！')
							// tihs.$message.success(msg)
						} else {
							this.$message.error(msg);
						}
					})
					.catch(() => {
						//取消
						this.$message.info('取消成功！')
					})

			}
		}
	}
</script>

<style lang="less" scoped="scoped">
	.el-tree {
		margin-top: 10px;
		
		.custom-tree-node {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding-right: 8px;
			.number{
				font-size: 12px;
				padding: 0 5px;
				opacity: 0.9;
			}
		}

	}
</style>
