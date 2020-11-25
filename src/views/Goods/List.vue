<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix box-card-title">
			<span>商品列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column label="商品名称" width="">
				<template slot-scope="scope">
					<div class="td-goods-name">
						<div style="margin-right: 15px; display: flex">
							<img style="align-items: center" :src="scope.row.img_md" height="75px" />
						</div>
						<div>
							<p>{{ scope.row.name }}</p>
							<p>商品货号：{{ scope.row.articleNo }}</p>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" sortable width="100px">
			</el-table-column>
			<el-table-column prop="inventory" label="库存" sortable width="100px">
			</el-table-column>
			<el-table-column prop="create_time" label="发布时间" sortable width="180px">
			</el-table-column>
			<el-table-column prop="operate" label="操作" width="180px">
				<template slot-scope="scope">
					<el-button plain>
						<router-link :to="{ name: 'GoodsEdit', params: { id: scope.row.id } }">
							<i class="el-icon-edit"></i>
							编辑
						</router-link>
					</el-button>
					<el-button type="danger" @click="handleDel(scope.row.id,scope.$index)" icon="el-icon-delete">
						<i class="el-icon-del"></i>
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		<template>
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[4, 8, 12, 16, 20]"
			 :page-size="4" layout=" prev, pager, next,sizes,total" :total="total">
			</el-pagination>
		</template>
	</el-card>
</template>

<script>
	import {Goods} from "@/api/index";

	export default {
		data() {
			return {
				tableData: [],
				formPage:{
					pageSize: 4,
					pageIndex: 1,
				},
				total:0,
			};
		},
		methods: {
			// 分页器
			handleCurrentChange(val) {
				this.formPage.pageIndex = val;
				this.loadList(this.formPage);
			},
			handleSizeChange(val) {
				this.formPage.pageSize = val;
				this.loadList(this.formPage);
			},
			
			async loadList(formPage) {
				let { status,goods,total } = await Goods.list(formPage);
				if (status) {
					this.tableData = goods;
					this.total = total
				}
			},
			async handleDel(id,index) {
				this.$confirm('确认要删除该商品吗?', '提示', {
					type: 'warning'
				}).then(async () => {
					let {status,goods,msg} = await Goods.delGoods({id:id});
						if(status){
							this.$message.success("删除成功！");
							// this.tableData.splice(index,1)
							this.loadList(this.formPage);
						}			
				}).catch(() => {
					this.$message.info('取消删除！');
				});
				console.log(id,index)
				
			},
		},
		created() {
			this.loadList();
		},
		mounted() {
			document.title = "商品列表";
		},
	};
</script>

<style lang="less" scope>
	.box-card {
		margin-bottom: 20px;

		.box-card-title {
			font-size: 16px;
		}
	}
	table{
	      img{
	    border: 1px solid #eee;
	    margin-right: 10px;
		}
	}
	.td-goods-name {
		display: flex;
		align-items: center;
	}

	.el-pagination {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;

		.el-pagination__sizes {
			order: 10;
			// flex: 1;
			// text-align: right;
		}

		.el-pagination__total {
			order: 20;
		}
	}
</style>
