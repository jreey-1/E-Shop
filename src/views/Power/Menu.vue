<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>菜单权限</span>
			</div>
			<div>
				<el-alert title="Tips" type="warning" :closable="false" description="设置后台管理系统的左侧菜单，目前至多支持两层菜单，三层以上菜单将不会显示。"
				 show-icon style="margin-bottom: 20px;">
				</el-alert>
				<el-tree ref="tree" :props="defaultProps" lazy :load="loadNode" node-key="id" :default-expanded-keys="[1]">
					<span class="custom-tree-node" slot-scope="{ node, data }">
						<span>{{ node.label }}</span>
						<span>
							<el-tooltip placement="left" effect="light">
								<div slot="content" class="content-icon">{{data.icon?"":"无"}}<i :class="'el-icon-'+data.icon"></i></div>
								<el-button @click.stop="handleChange(node,data)" :disabled="data.name == '全部分类'?true:false" icon="el-icon-icon"
								 type="text">
									<i :class="'el-icon-'+data.icon"></i>图标
								</el-button>
							</el-tooltip>
							<el-button :disabled="data.name == '全部分类'?true:false" icon="el-icon-edit" @click.stop="editModle(node,data)"
							 type="text">
								编辑
							</el-button>
							<el-button icon="el-icon-plus" @click.stop="openModle(node,data)" type="text">
								添加
							</el-button>
							<el-button :disabled="data.name == '全部分类'?true:false" icon="el-icon-delete" @click.stop="handleRemove(node,data)"
							 type="text">
								删除
							</el-button>
							<el-button type="text" style="color: #000000;">
								显示序号：<el-tag size="mini">{{data.name == "全部分类"?"0":data.order}}</el-tag>
							</el-button>
						</span>
					</span>
				</el-tree>
			</div>
		</el-card>
		<el-dialog title="编辑节点" :visible.sync="edit" @closed="handleModleClose('from')">
			<el-form ref="from" :model="from" :rules="rules">
				<el-form-item label="分类名称" label-width="80px" prop="name">
					<el-input v-model="from.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组件名称" label-width="80px" prop="component">
					<el-input v-model="from.component" autocomplete="off" placeholder="指定此菜单对应的组件名称"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="80px" prop="path">
					<el-input v-model="from.path" autocomplete="off" placeholder="指定此菜单的链接地址"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="80px" prop="order">
					<el-input v-model="from.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="edit = false">取 消</el-button>
				<el-button type="primary" @click="editColse">保存</el-button>
			</div>
		</el-dialog>
		<!-- 添加弹窗 -->
		<el-dialog title="添加分类" :visible.sync="add" @closed="handleModleClose('from')">
			<el-form ref="from" :rules="rules" :model="fromAdd">
				<el-form-item label="菜单名称" label-width="80px" prop="name">
					<el-input v-model="fromAdd.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="组件名称" label-width="80px" prop="component">
					<el-input v-model="fromAdd.component" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="链接地址" label-width="80px" prop="path">
					<el-input v-model="fromAdd.path" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="显示顺序" label-width="80px" prop="order">
					<el-input v-model="fromAdd.order" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="add = false">取 消</el-button>
				<el-button type="primary" @click="handopend">添加</el-button>
			</div>
		</el-dialog>
		<el-dialog title="选择图标" :visible.sync="showIcon" class="icon">
			<div class="iconlist clear">
				<div v-for="(item,i) in element">
					<div class="item" @click="handleIcon(item.id,i,item.name)" :class="{active:isActive==i}">
						<i :class="'el-icon-'+item.name"></i>
						<div>el-icon-{{item.name}}</div>
					</div>
				</div>
				<div style="float: right; padding-top: 20px;">
					<div>
						<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
						 :current-page.sync="fromData.pageIndex" :page-sizes="[4, 8, 16, 32]" :page-size.sync="fromData.pageSize" layout="prev, pager, next"
						 :total="total">
						</el-pagination>
					</div>
				</div>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="showIcon = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Role } from '@/api/index';
	export default {
		data() {
			return {
				defaultProps: {
					children: 'children',
					label: 'name', //指的为category中的name
				},
				nodeData: '', //节点数据
				node: '', // 节点对象
				edit: false,
				add: false,
				change:{},
				showIcon: false,
				fromAdd: {
					name: '',
					component: '',
					pId: '',
					path: '',
					order: ''
				},
				fromData: {
					pageSize: 30,
					pageIndex: 1,
				},
				total: 280,
				from: {},
				isActive:-1,
				from1:{
					id:'',
					icon:''
				},
				element: [],
				rules: {
					name: [
						{ required: true, message: '编辑名称', trigger: 'blur' },
					],
					component: [
						{ required: true, message: '编辑名称', trigger: 'blur' },
					],
					path: [
						{ required: true, message: '编辑名称', trigger: 'blur' },
					],
					order: [
						{ required: true, message: '编辑名称', trigger: 'blur' },
					]
				}
			}
		},
		created() {
			document.title = "菜单权限";
		},
		methods: {
			async loadNode(node, resolve) {
				if (node.level === 0) {
					return resolve([{ id: 1, name: '全部分类' }]);
				}
				// 获取当前点击的分类id
				let { id } = node.data;
				let { status, data } = await Role.sub({ pId: id });
				if (status) {
					resolve(data);
				}
			},
			// 打开添加Modle
			openModle(node, data) {
				this.add = true;
				// 缓存节点对象
				this.fromAdd.pId = data.id;
				this.node = node;
			},
			// 打开编辑的modle
			editModle(node, data) {
				this.edit = true;
				this.node = node;
				this.from = { ...data };
			},
			// 保存编辑
			editColse() {
				this.$refs.from.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Role.menu(this.from);
						if (status) {
							this.edit = false;
							this.$message.success("修改成功！");
							// 修改节点
							this.node.data = { ...this.from }
						}
					} else {
						this.$message.error("表单验证失败");
					}
				})
			},
			// 添加节点
			handopend() {
				this.$refs.from.validate(async (valid) => {
					if (valid) {
						let { status, data } = await Role.addMenu(this.fromAdd);
						if (status) {
							// 关闭模态框
							this.add = false;
							this.$message.success("添加成功！")
							// 更新DOM
							// 新添加的data数据
							let nodeData = { ...this.fromAdd, ...data }
							// 父节点的key/node
							this.$refs.tree.append(nodeData, this.node);
						}
					} else {
						this.$message.error("表单验证失败");
					}
				})
			},
			// 关闭模态框
			handleModleClose(formName) {
				this.$refs[formName].resetFields();
			},
			// 删除指定id分类
			handleRemove(node, { id }) {
				this.$confirm('确定要删除此分类吗？', { type: "warning" })
					.then(async () => {
						//确定
						let { status, msg } = await Role.removeMenu(id);
						if (status) {
							this.$message.success("删除成功！");
							this.$refs.tree.remove(node);
						} else {
							this.$message.error("删除失败！");
						}
					})
					.catch(() => {
						// 取消
						this.$message.info('取消成功！');
					})
			},
			handleChange(node, data) {
				this.loadElement();
				this.showIcon = true;
				let {id} = data;
				this.from1.id = id;
				this.node = node;
				this.change = data;
			},
			// 获取图标
			async loadElement() {
				let { status, icons, total } = await Role.ele(this.fromData);
				if (status) {
					this.element = icons;
					this.total = total;
				}
			},
			// 点击图标
			handleIcon(id,i,name){
				this.isActive = i;
				this.from1.icon = id;
				this.change.icon = name;
			},
			handleSizeChange(val) {
				this.loadElement();
			},
			handleCurrentChange(val) {
				this.loadElement();
			},
			async handleEdit() {
				let {status} = await Role.set(this.from1);
				if(status){
					this.showIcon = false;
					this.$message.success("更换成功！");
					this.node.data = { ...this.change };
				}
			}
		},
	}
</script>

<style lang="less">
	.content-icon {
		width: 100px;
		font-size: 20px;
	}

	.iconlist {
		width: 100%;
		height: 350px;
	}

	.icon>.el-dialog {
		height: 550px;
		width: 1100px;
	}

	.icon .el-dialog__title {
		font-size: 20px;
	}

	.icon {
		.item {
			height: 100px;
			width: calc(10% - 6px);
			float: left;
			text-align: center;
			border: 1px solid #CCCCCC;
			margin-bottom: 0;
			padding: 0 2px;

			i {
				display: block;
				font-size: 25px;
				margin-top: 20px;
				margin-bottom: 10px;
			}
		}
	}

	.active {
		background-color: rgb(92, 182, 255);
		color: #FFFFFF;
	}

	.icon .item:hover {
		color: rgb(174, 227, 255);
	}

	.content1 {
		height: 300px;
		width: 600px;

		.item {
			height: 100px;
			width: 100px;
			border: 1px solid #CCCCCC;
		}
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

	.box-card {
		width: 100%;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
	}
</style>
