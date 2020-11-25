<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix box-card-title">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%" :default-sort="{ prop: 'date', order: 'descending' }">
			<el-table-column prop="id" label="#" width="50px">
			</el-table-column>
            <el-table-column>
                <template slot-scope="scope">
					<el-table :data="scope.row.goodsList">
						<el-table-column prop="date" label="商品" width="400px">
                            <template slot-scope="scope">
				            	<div class="td-goods-name">
				                	<div style="margin-right: 15px; display: flex;align-items: center;">
					            		<img style="align-items: center;" :src="scope.row.img_md" height="75px" />
					                    <p>{{ scope.row.name }}</p>
                                    </div>				               
				            	</div>
			            	</template>
						</el-table-column>
						<el-table-column prop="goods_price" label="单价">
						</el-table-column>
						<el-table-column prop="goods_num" label="数量">
						</el-table-column>
					</el-table>
				</template>
            </el-table-column>
			
			<el-table-column prop="payment" label="付款总额" width="80px">
			</el-table-column>
			<el-table-column prop="create_time" label="下单时间" sortable width="180px">
			</el-table-column>
			<el-table-column prop="status" label="状态" sortable width="100px">
			</el-table-column>
			<el-table-column label="操作" width="65px">
				<el-button type="primary" icon="el-icon-edit"></el-button>
            </el-table-column>
		</el-table>
		<el-pagination :hide-on-single-page="value" background @size-change="handleSizeChange" @current-change="handleCurrentChange"
		 :page-sizes="[4, 8, 12, 16, 20]" :page-size="4" layout=" prev, pager, next,sizes,total" :total="total">
		</el-pagination>
	</el-card>
</template>

<script>
	import {
		Order
	} from '@/api/index'

	export default {
		data() {
			return {
				tableData: [{

				}],

				total: 28,
				value: false,
				loadData: {
					pageSize: 4,
					pageIndex: 1,
				},
				total: 0,
			}
		},
		methods: {
			// 获取所有订单列表
			async loadList(Data) {
				let {status,data} = await Order.list(Data);
				if (status) {
                    data.forEach((item,index) => {
                        item.create_time = new Date(item.create_time).toLocaleString();
                    });
                    this.tableData = data;
					this.total = data.length;
				}
			},
			handleSizeChange(val) {
                this.loadData.pageSize = val;
                this.loadList(this.loadData)
			},
			handleCurrentChange(val) {
                this.loadData.pageIndex = val;
                this.loadList(this.loadData)
            },
		},
		created() {
			this.loadList();
		},
		mounted() {
			document.title = "订单列表";
		},

	}
</script>

<style lang="less" scope>
	.el-pagination {
		margin-top: 10px;
		display: flex;
		justify-content: flex-end;
    }
    table{
          img{
        border: 1px solid #eee;
        margin-right: 10px;
    }
        // width: 100%!important;
        // margin-right: 0!important;
    }
    // .el-table__body{
    //     width: 100%!important;
    // }
    // .el-table__header{
    //      width: 100%!important;
    // }
  
    th{
        font-weight: bold;
    }
</style>
