<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>发布新商品</span>
			</div>
			<el-form ref="form" :model="form" label-width="80px">
				<el-row>
					<el-col :span="6">
						<el-form-item label="分类" prop="cate_1st">
							<el-select v-model="form.cate_1st" placeholder="请选择一级分类">
								<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="cate_2nd">
							<el-select v-model="form.cate_2nd" placeholder="请选择二级分类">
								<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item prop="cate_3nd">
							<el-select v-model="form.cate_3nd" placeholder="请选择二级分类">
								<el-option v-for="item in options_3nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-form-item label="商品名称" label-width="100px">
					<el-input v-model="form.name" style="width: 900px;"></el-input>
					<p>商品标题名称长度至少3个字符，最长200个汉字</p>
				</el-form-item>
				<el-form-item label="商品卖点" label-width="100px">
					<el-input type="textarea" v-model="form.hotPoint" style="width: 900px;"></el-input>
					<p>卖点不能超过140个汉字</p>
				</el-form-item>
				<el-form-item label="商品价格" label-width="100px">
					<el-input v-model="form.price" style="width: 250px;"><template slot="append">元</template></el-input>
					<p>价格必须是0-999999之间的数字，切不能高于市场价</p>
					<p>此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</p>
				</el-form-item>
				<el-form-item label="市场价" label-width="100px">
					<el-input v-model="form.marketPrice" style="width: 250px;"><template slot="append">元</template></el-input>
					<p>价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</p>
				</el-form-item>
				<el-form-item label="成本价" label-width="100px">
					<el-input v-model="form.cost" style="width: 250px;"><template slot="append">元</template></el-input>
					<p>价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会再前台销售页面中显示</p>
				</el-form-item>
				<el-form-item label="折扣" label-width="100px">
					<el-input v-model="form.discount" style="width: 250px;"><template slot="append">折</template></el-input>
					<p>根据销售价与市价比例自动生成不需要编辑</p>
				</el-form-item>
				<el-form-item label="商品库存" label-width="100px">
					<el-input v-model="form.inventory" style="width: 250px;"><template slot="append">件</template></el-input>
					<p>价格必须是0-999999之间的整数</p>
					<p>若启动了库存配置，则系统自动计算商品的总数，此处无需买家填写</p>
				</el-form-item>
				<el-form-item label="商品货号" label-width="100px">
					<el-input v-model="form.articleNo" style="width: 250px;"></el-input>
					<p>商品货号是商家管理商品的编号，买家不可见</p>
					<p>最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</p>
				</el-form-item>
				<el-form-item label="商品主图" label-width="100px">
					<singleupload :type='type' :url.sync="form.img_lg"></singleupload>
					<p>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸800*800像素以上，
						大小不超过1M的正方形图片，上传后的图片将自动保存在图片口空间的默认分类中。</p>
				</el-form-item>
				<el-form-item label="商品轮播图" label-width="100px">
					<!-- 照片墙 -->
					<el-upload :file-list="fileList" action="http://localhost:3003/api/upload/slider" list-type="picture-card"
					 :headers="header" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="handleError"
					 :on-success="handleSuccess">
						<i class="el-icon-plus"></i>
					</el-upload>
					<el-dialog :visible.sync="dialogVisible">
						<img width="100%" :src="dialogImageUrl" alt="">
					</el-dialog>
					<p>上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸800*800像素以上，
						大小不超过1M的正方形图片，上传后的图片将自动保存在图片口空间的默认分类中。</p>
				</el-form-item>
				<!-- 商品详情 -->
				<el-alert title="商品详情描述" type="info" style="color: #000000;" :closable="false"></el-alert>
				<el-form-item label="商品品牌" label-width="100px">
					<el-input v-model="form.brand"></el-input>
				</el-form-item>
				<el-form-item label="商品描述" label-width="100px">
					<!-- 富文本编辑器 -->
					<div class="home">
						<div id="content"></div>
					</div>
				</el-form-item>
				<el-alert title="物流信息" type="info" style="color: #000000;" :closable="false"></el-alert>
				<el-form-item label="所在地">
					<el-select v-model="Address.province" placeholder="请选择">
						<el-option v-for="item in province" :key="item.province_id" :label="item.name" :value="item.province_id">
						</el-option>
					</el-select>
					<el-select v-model="Address.city" placeholder="请选择">
						<el-option v-for="item in city" :key="item.city_id" :label="item.name" :value="item.city_id">
						</el-option>
					</el-select>
					<el-select v-model="Address.county" placeholder="请选择">
						<el-option v-for="item in county" :key="item.county_id" :label="item.name" :value="item.county_id">
						</el-option>
					</el-select>
					<el-select v-model="Address.town" placeholder="请选择">
						<el-option v-for="item in town" :key="item.town_id" :label="item.name" :value="item.town_id">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运费" label-width="100px">
					<el-input v-model="form.freight" style="width: 250px;"><template slot="append">元</template></el-input>
					<p>运费设为0，前台商品显示免运费</p>
				</el-form-item>


				<el-form-item>
					<el-button type="primary" @click="onSubmit">提交</el-button>
				</el-form-item>
			</el-form>
		</el-card>
	</div>
</template>

<script>
	import { Goods } from '@/api/index';
	import wangEditor from 'wangeditor';
	import singleupload from '@/components/SingleUpload.vue';
	export default {
		components: { singleupload },
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				form: {
					title: '',
					description: '',
					cate_1st: '',
					cate_2nd: '',
					cate_3nd: '',
					img_lg: '',
					slider: '',
					content: '',
					img_lg: '',
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					name: '',
					price: '',
					marketPrice: '',
					cost: '',
					discount: '',
					inventory: '',
					articleNo: '',
					img_lg: '',
					img_md: '',
					slider: '',
					detail: '',
					freight: '',
					hotPoint: '',
					resource: '',
					desc: ''
				},
				// 一级分类选项
				options_1st: [],
				// 二级分类选项
				options_2nd: [],
				options_3nd: [],
				fileList: [],
				province: [],
				fileList: [],
				city: [],
				county: [],
				town: [],
				Address: {
					province: '',
					city: '',
					county: '',
					town: '',
				},
				type: {
					type: "common",
				},
				dialogImageUrl: '',
				dialogVisible: false
			}
		},
		// 侦听器，AJAX，异步操作
		watch: {
			"form.cate_1st": function(newVal, oldVal) {
				// 请求二级分类
				this.handleLoadSubcate(newVal);
			},
			"form.cate_2nd": function(newVal, oldVal) {
				this.handleLoadSubcates(newVal);
			},
			"Address.province": function(newVal, oldVal) {
				this.loadCity(newVal);
			},
			"Address.city": function(newVal, oldVal) {
				this.loadCounty(newVal);
			},
			"Address.county": function(newVal, oldVal) {
				this.loadTown(newVal)
			},
		},
		async created() {
			// 请求一级分类
			let options = await this.loadOptions(1);
			this.options_1st = options;
			// 默认选中第一项
			this.form.cate_1st = options[0].id;
			// 省份
			let province = await this.loadProvince();
			// 默认选中第一项
			this.Address.province = this.province[0].province_id;
		},
		methods: {
			// 请求下一级分类
			async loadOptions(id) {
				let { id: pId } = { id }
				// console.log({ pId });
				let { status, data } = await Goods.subcate(pId);
				if (status) {
					return data;
				}
			},
			async handleLoadSubcate(val) {
				// 请求二级分类
				let options = await this.loadOptions(val);
				this.options_2nd = options;
				// 默认选中第一项
				this.form.cate_2nd = options[0].id;
			},
			async handleLoadSubcates(id) {
				// 请求二级分类
				let options = await this.loadOptions(id);
				this.options_3nd = options;
				// 默认选中第一项
				this.form.cate_3nd = options[0].id;
			},

			//发布
			async onSubmit() {
				this.form.img_md = this.form.img_lg;
				let { status } = await Goods.release(this.form);
				if (status) {
					this.$message.success("发布成功！");
					this.$router.replace('/Goods/list');
				}
			},

			// 照片墙
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			},
			// 图片上传失败
			handleError(err, file, fileList) {
				if (err) {
					let res = JSON.parse(err.message);
					this.$message.error(res.msg);
				}
			},
			// 图片上传成功
			handleSuccess({ status, msg, src }, file, fileList) {
				if (status) {
					this.$message.success(msg);
					this.fileList.push({ url: src });
					var swiper = [];
					for (let i = 0; i < this.fileList.length; i++) {
						swiper.push(this.fileList[i].url);
					}
					this.form.slider = swiper.join(',');
				}
			},

			// 上传头像
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
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
			// 获取所有省份
			async loadProvince() {
				let { status, data } = await Goods.province();
				if (status) {
					this.province = data;
				}
			},
			// 获取城市
			async loadCity(id) {
				let { status, data } = await Goods.city(id);
				if (status) {
					this.city = data;
					// 默认选中第一项
					this.Address.city = this.city[0].city_id;
				}
			},
			// 获取县
			async loadCounty(id) {
				let { status, data } = await Goods.county(id);
				if (status) {
					this.county = data;
					// 默认选中第一项
					this.Address.county = this.county[0].county_id;
				}
			},
			// 获取街道
			async loadTown(id) {
				let { status, data } = await Goods.town(id);
				if (status) {
					this.town = data;
					// 默认选中第一项
					this.Address.town = this.town[0].town_id;
				}
			},
		},
		mounted() {
			// 富文本编辑器初始化
			document.title = '发布新商品';
			const editor = new wangEditor(`#content`);
			// 配置 onchange 回调函数，将数据同步到 vue 中
			// 配置服务器端地址
			editor.config.uploadImgServer = 'http://localhost:3003/api/upload/editor';
			editor.config.uploadFileName = 'file';
			editor.config.zIndex = 0;
			editor.config.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}` // 设置请求头
			}
			editor.config.onchange = (newHtml) => {
				this.form.content = newHtml;
				// this.editorData = newHtml
			}
			// 创建编辑器
			editor.create()
			this.editor = editor
		},
		beforeDestroy() {
			// 调用销毁 API 对当前编辑器实例进行销毁
			this.editor.destroy()
			this.editor = null
		},
	}
</script>

<style lang="less">
	.el-form-item__content>p {
		margin: 0;
		color: #999;
	}

	.el-alert {
		margin-bottom: 10px;

		.el-alert__title {
			font-size: 16px;
		}
	}
</style>
