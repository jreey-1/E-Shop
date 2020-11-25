<template>
<div>
	<el-card class="box-card">
		<div slot="header" class="clearfix box-card-title">
			<span>用户列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column prop="id" label="#" sortable width="60px">
			</el-table-column>
			<el-table-column label="头像" width="">	
				<template slot-scope="scope">
					<div class="block"><el-avatar :size="50" :src="scope.row.avatar"></el-avatar></div>
				</template>	
			</el-table-column>
			<el-table-column prop="username" label="账号" sortable>
			</el-table-column>
			<el-table-column prop="fullname" label="姓名" sortable>
			</el-table-column>
			<el-table-column prop="sex" label="性别" sortable>
			</el-table-column>
			<el-table-column prop="tel" label="手机" sortable width="120px">
			</el-table-column>
			<el-table-column label="角色" sortable>
				<template slot-scope="scope">
        			<el-tag :type="scope.row.role === 1 ? 'danger' : ''" disable-transitions>{{scope.row.role_name}}
					</el-tag>
     			 </template>
			</el-table-column>
			<el-table-column prop="login_time" label="上次登录" sortable width="170px">
			</el-table-column>
			<el-table-column prop="login_count" label="登录次数" sortable width="100px">
			</el-table-column>
			<el-table-column label="操作" width="180px">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" plain  @click="handleEditModel(scope.row)"></el-button>
					<el-button :disabled="scope.row.role === 1" type="danger" @click="handleDel(scope.row.id,scope.$index)" icon="el-icon-delete">
						<i class="el-icon-del"></i>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>		
	</el-card>

	<el-dialog title="修改信息" @close="handleModalClose('form')" :visible.sync="dialogFormVisible">
			<el-form  ref="form" :model="form" :rules="rules">
				<el-form-item label="姓名" :label-width="formLabelWidth" prop="fullname">
					<el-input v-model="form.fullname" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" :label-width="formLabelWidth" prop="tel">
					<el-input v-model="form.tel" autocomplete="off"></el-input>
				</el-form-item>
				
				<el-form-item label="权限" :label-width="formLabelWidth">
					<el-select v-model="form.role" placeholder="请选择角色">
						<el-option v-for="item in RoleList" :key="item.id" :label="item.name" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像" :label-width="formLabelWidth"  prop="avatar">
					<singleupload type='avatar' :url.sync="form.avatar"></singleupload>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="handleEdit('form')">确 定</el-button>
			</div>
		</el-dialog>
		</div>
</template>

<script>
	import { Admin,Power } from "@/api/index";
	import singleupload from '@/components/SingleUpload-element.vue';
import { createLogger } from 'vuex';

	export default {
		components: { singleupload },
		data() {
			return {
				tableData: [],	
				form:{},	
				type:{
					type:"avatar",
                }, 
				dialogFormVisible: false,
				formLabelWidth: '120px',
				RoleList:[],
				rules: {
					fullname: [
						{ required: true, message: '请输入姓名', trigger: "blur" },
						{ pattern: /^[\u4e00-\u9fa5]{2,6}$/, message: '请输入正确姓名', trigger: "blur" }
					],
					sex: [
						{ required: true, message: '清选择性别', trigger: "blur" },
					],
					avatar: [
						{ required: true, message: '请选择一张头像', trigger: "blur" },
					],
					tel: [
						{ required: true, message: '请输入手机号码', trigger: "blur" },
						{ pattern: /^1((3|5|7|8){1}\d{1}|70)\d{8}$/, message: '请输入正确的手机号码格式', trigger: "blur" }
					],
				
				},		
			};
		},
		methods: {		
			async loadList() {
				let { status,data,total } = await Admin.list();
				if (status) {
					data.forEach((item,index) => {
					    item.login_time = new Date(item.login_time).toLocaleString();
					});
					this.tableData = data;
				}
			},
			async LoadRolelist(){
				let{status,data}=await Power.list();
				if(status){
					this.RoleList=data;
				}
			},
			async handleDel(id,index) {
				this.$confirm('确认要删除这条用户信息吗?', '提示', {
					type: 'warning'
				}).then(async () => {
					console.log(id)
					let {status,goods,msg} = await Admin.del({id});
						if(status){
							this.$message.success("删除成功！");
							this.tableData.splice(index,1)
						}			
				}).catch(() => {
					this.$message.info('取消删除！');
				});		
			},
			handleEditModel(form){
				this.dialogFormVisible = true;
				// 赋值进行还原表单
				this.form = {...form};
			},
			// 保存修改
			handleEdit(form){
				this.$refs.form.validate(async(valid) => {
					if (valid) {					
						let { status, msg } = await Admin.edit(this.form);
						if (status) {
							this.loadList();
							this.$message.success(msg);
							// this.tableData.forEach((item,index)=>{
							// 	if(item.id == this.form.id){
							// 		console.log(item)
							// 		console.log(this.form);
							// 		item = this.form;
							// 	}
							// })
							this.dialogFormVisible = false
						}
						
					}
				})
				
			},
			// 模态框关闭时
			handleModalClose(formName){
				//清空表单
				this.$refs[formName].resetFields();
			}
		},
		created() {
			this.loadList();		
			this.LoadRolelist();
		},
		mounted() {
			document.title = "用户列表";
		},
	};
</script>

<style lang="less">
	.avatar {
		// width: 178px;
		height: 178px;
		display: block;
	}
</style>