<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>分类列表</span>
		</div>
		<div class="block">
			<el-tree ref='tree' lazy :load="loadNode" node-key="id" :props="defaultProps" :default-expanded-keys="[1]">
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button :disabled="node.id === 1" icon="el-icon-edit" @click.stop="editFormShow(node,data)" type="text" size="mini">
							编辑
						</el-button>
						<el-button icon="el-icon-circle-plus-outline" @click.stop="dialogFormShow(node,data)" type="text" size="mini">
							添加
						</el-button>
						<el-button :disabled="node.id === 1" icon="el-icon-delete" @click.stop="handleRemove(node,data)" type="text" size="mini">
							删除
						</el-button>
					</span>
				</span>
			</el-tree>
		</div>
		<el-dialog title="添加分类" @close="handleModalClose('insertform')" :visible.sync="dialogFormVisible">
		  <el-form :model="insertform" ref="insertform" :rules="rules">
		    <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
		      <el-input v-model="insertform.name" autocomplete="off"></el-input>
		    </el-form-item>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button @click="handleAppend('insertform')" type="primary">确 定</el-button>
		  </div>
		</el-dialog>
		
		<el-dialog title="编辑分类" @close="handleModalClose('editform')" :visible.sync="editFormVisible">
		  <el-form :model="editform" ref="editform" :rules="rules">
		    <el-form-item label="分类名称" :label-width="formLabelWidth" prop="name">
		      <el-input v-model="editform.name" autocomplete="off"></el-input>
		    </el-form-item>
		    
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="editFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="handleEdit">确 定</el-button>
		  </div>
		</el-dialog>
	</el-card>
</template>

<script>
	import {Goods} from '@/api/index'

	export default {
		data() {
			return {
				insertform:{
					name:'',
					pId:'',
					img:'',
				},
				editform:{
					id:'',
					name:'',
					pId:'',
					img:'',
				},
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: '120px',
				// 编辑
				editFormVisible:false,
				nodeData:{},//节点数据
				node:{},//节点对象
				rules:{
					name:[{
						required: true,
						message: '请输入分类名',
						trigger: 'blur'
					}],
				},
				props: {
					label: 'name',
				},
				defaultProps: {
					children: 'children',
					label: 'name'
				}
			}
		},

		methods: {
			async loadNode(node, resolve) {
				// console.log(node)
				if (node.level === 0) {
					return resolve([{
						id: 1,
						name: '全部分类'
					}]);
				}
				let id = node.data.id;

				let { status,data } = await Goods.subcate(id);
				if (status) {
					resolve(data)
				}
			},
			dialogFormShow(node,data){
				// 缓存节点对象
				this.node = node;
				// console.log(node);
				// console.log(data);
				this.dialogFormVisible = true;
				this.insertform.pId = data.id;
			},
			// 添加
			handleAppend(form){
				this.$refs[form].validate(async (valid) =>{
					if(valid){
						let { status, msg, data} = await Goods.insert(this.insertform);
						if(status){
							this.$message.success(msg);
							this.dialogFormVisible = false;
							// 更新dom
							let nodeData = {...this.insertform,...data};
							this.$refs.tree.append(nodeData,this.node)
							
						}else{
							this.$message.error(msg);
						}
					}else{
						this.$message.info('请输入分类名');
					}
				})
			},
			// 打开编辑的modal
			editFormShow(node,data){
				console.log(node);
				// 浅拷贝
				this.editform = {...data};
				// 缓存node
				this.node = node;
				
				this.editFormVisible = true;
			},
			// 保存编辑
			async handleEdit(){
				this.$refs.editform.validate(async (valid) =>{
					if(valid){
						let { status ,data ,msg} = await Goods.edit(this.editform);
							if(status){
								this.$message.success(msg);
								this.editFormVisible = false;
								// 更新信息
								this.node.data = {...this.editform};
							}
						}
					})
				},
				
				handleRemove(node,{ id }){
					this.$confirm('确认要删除该分类吗?', '提示', {
						type: 'warning'
					}).then(async () => {

						let {status,msg,data} = await Goods.remove({id});
						if(status){
							this.$message.success(msg);
							// 删除节点
							this.$refs.tree.remove(node)
						}else{
							this.$message.error(msg)
						}
					}).catch(() => {
						this.$message.info('取消删除！');
					});
				},
			// 模态框关闭时
			handleModalClose(formName){
				//清空表单
				this.$refs[formName].resetFields();
			}
		
		},
		mounted(){
			document.title = "商品分类"
		}
	};
</script>

<style lang="less">
	.box-card {

		.el-card__header {
			font-size: 14px;
			color: #000;
		}

		.custom-tree-node {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			padding-right: 8px;
		}
	}
</style>
