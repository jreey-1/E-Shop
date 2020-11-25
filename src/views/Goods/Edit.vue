<template>
	<div>
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>发布新商品</span>
			</div>
			<div>
				<el-form ref="from" :rules="rules" :model="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="商品分类" prop="cate_1st" style="margin-bottom: 18px;">
						<el-col :span="6">
							<el-select v-model="ruleForm.cate_1st" @change="handleloadSubcate" placeholder="请选择商品一级分类">
								<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<el-select v-model="ruleForm.cate_2nd" @change="handleloadsub" placeholder="请选择商品二级分类">
								<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6">
							<el-select v-model="ruleForm.cate_3rd" placeholder="请选择商品三级分类">
								<el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id"></el-option>
							</el-select>
						</el-col>
					</el-form-item>
					<el-form-item label="商品名称" prop="name">
						<el-input v-model="ruleForm.name" style="width: 800px; margin-bottom: 0;"></el-input>
						<div class="cont">商品标题名称长度至少3个字符，最长200个汉字</div>
					</el-form-item>
					<el-form-item label="商品买点" prop="hotPoint">
						<el-input type="textarea" v-model="ruleForm.hotPoint" style="width: 800px;"></el-input>
						<div class="cont">商品卖点不能超过140个汉字</div>
					</el-form-item>
					<el-form-item label="商品价格" prop="price">
						<el-input v-model="ruleForm.price" style="width: 200px;">
							<template slot="append">元</template>
						</el-input>
						<div class="cont">价格必须是0-999999之间的数字，且不能高于市场价</div>
						<div class="cont">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</div>
					</el-form-item>
					<el-form-item label="市场价" prop="marketPrice">
						<el-input v-model="ruleForm.marketPrice" style="width: 200px;">
							<template slot="append">元</template>
						</el-input>
						<div class="cont">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
					</el-form-item>
					<el-form-item label="成本价" prop="cost">
						<el-input v-model="ruleForm.cost" style="width: 200px;">
							<template slot="append">元</template>
						</el-input>
						<div class="cont">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</div>
					</el-form-item>
					<el-form-item label="折扣">
						<el-input v-model="ruleForm.discount" style="width: 200px;" disabled>
							<template slot="append">折</template>
						</el-input>
						<div class="cont">根据销售价与市场价比例自动生成不需要编辑</div>
					</el-form-item>
					<el-form-item label="商品库存" prop="inventory">
						<el-input v-model="ruleForm.inventory" style="width: 200px;">
							<template slot="append">件</template>
						</el-input>
						<div class="cont">库存必须是0-999999之间的整数</div>
						<div class="cont">若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
					</el-form-item>
					<el-form-item label="商品货号" prop="articleNo">
						<el-input v-model="ruleForm.articleNo" style="width: 200px;"></el-input>
						<div class="cont">商品货号是商家管理商品的编号，买家不可见</div>
						<div class="cont">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
					</el-form-item>
					<el-form-item label="商品主图" prop="img_lg">
						<single-upload :url.sync="ruleForm.img_lg" type="common"></single-upload>
						<div class="cont">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
							800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-form-item>
					<el-form-item label="商品轮播图" prop="slider">
						<el-upload :file-list="fileList" action="/api/upload/slider" :headers="header" list-type="picture-card"
						 :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-error="handleError" :on-success="handleSuccess">
							<i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="ruleForm.slider" alt="">
						</el-dialog>
						<div class="cont">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
							800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
					</el-form-item>
					<el-alert title="商品详情描述" type="info" :closable="false">
					</el-alert>
					<el-form-item label="商品品牌" prop="brand">
						<el-input v-model="ruleForm.brand" style="width: 800px;"></el-input>
					</el-form-item>
					<el-form-item label="商品描述" prop="detail">
						<div id="editor"></div>
					</el-form-item>
					<el-alert title="商品物流信息" type="info" :closable="false">
					</el-alert>
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
					<el-form-item label="运费" prop="freight">
						<el-input v-model="ruleForm.freight" style="width: 200px;">
							<template slot="append">元</template>
						</el-input>
						<div class="cont">运费设为0，前台商品将显示免运费</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="handleSubmit">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-card>
	</div>
</template>

<script>
	import SingleUpload from '@/components/SingleUpload-element.vue';
	import wangEditor from 'wangeditor';
	import { Goods } from '@/api/index';
	export default {
		components: {
			SingleUpload,
		},
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`,
				},
				dialogImageUrl: '',
				dialogVisible: false,
				ruleForm: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
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
				},
				fileList: [],
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				province: [],
				city: [],
				county: [],
				town: [],
				Address: {
					province: '',
					city: '',
					county: '',
					town: '',
				},
				rules: {
					cate_1st: [
						{ required: true, message: '请选择分类', trigger: 'blur' },
					],
					cate_2nd: [
						{ required: true, message: '请选择分类', trigger: 'blur' },
					],
					cate_3rd: [
						{ required: true, message: '请选择分类', trigger: 'blur' },
					],
					name: [
						{ required: true, message: '请输入商品名称', trigger: 'blur' },
					],
					price: [
						{ required: true, message: '请输入商品价格', trigger: 'blur' },
					],
					marketPrice: [
						{ required: true, message: '请输入市场价格', trigger: 'blur' },
					],
					cost: [
						{ required: true, message: '请输入成本价格', trigger: 'blur' },
					],
					discount: [
						{ required: true, message: '请输入折扣 ,如：75%;', trigger: 'blur' },
					],
					inventory: [
						{ required: true, message: '请输入商品库存', trigger: 'blur' },
					],
					articleNo: [
						{ required: true, message: '请输入货号', trigger: 'blur' },
					],
					img_lg: [
						{ required: true, message: '请上传商品主图', trigger: 'blur' },
					],
					slider: [
						{ required: true, message: '请上传商品轮播图片', trigger: 'blur' },
					],
					detail: [
						{ required: true, message: '请输入商品详情！', trigger: 'blur' },
					],
					brand: [
						{ required: true, message: '请输入商品品牌！', trigger: 'blur' },
					],
					freight: [
						{ required: true, message: '请输入运费！', trigger: 'blur' },
					],
					province: [
						{ required: true, message: '请输入地址！', trigger: 'blur' },
					],
					hotPoint: [
						{ required: true, message: '请输入卖点！', trigger: 'blur' },
					]
				},
			}
		},
		props: ["id"],
		watch: {
			"Address.province": function(newVal, oldVal) {
				this.loadCity(newVal);
			},
			"Address.city": function(newVal, oldVal) {
				this.loadCounty(newVal);
			},
			"Address.county": function(newVal, oldVal) {
				this.loadTown(newVal)
			}
		},
		async mounted() {
			document.title = "编辑商品"
			const editor = new wangEditor(`#editor`);
			// 富文本编辑器配置图片上传的接口
			editor.config.uploadImgServer = '/api/upload/editor';
			editor.config.uploadFileName = 'file';
			editor.config.zIndex = 100;
			editor.config.uploadImgHeaders = {
				Authorization: `Bearer ${sessionStorage.token}` // 设置请求头
			}
			// 配置 onchange 回调函数，将数据同步到 vue 中
			editor.config.onchange = (newHtml) => {
				this.ruleForm.content = newHtml;
			};
			// 创建编辑器
			editor.create();
			this.editor = editor;
			// 请求一级分类
			let options = await this.loadOptions(1);
			this.options_1st = options;
			// 获取商品详情
			let { status, data } = await Goods.goods({ id: this.id });
			if (status) {
				this.ruleForm = data;
				this.handleloadSubcate(data.cate_1st);
				this.handleloadsub(data.cate_2nd);
				this.editor.txt.html(data.detail);
			}
			var swiper = data.slider.split(',');
			for (let t = 0; t < swiper.length; t++) {
				this.fileList.push({ url: swiper[t] });
			}
		},
		beforeDestroy() {
			// 调用销毁 API 对当前编辑器实例进行销毁
			this.editor.destroy()
			this.editor = null
		},
		async created() {
			// 省份
			let province = await this.loadProvince();
			// 默认选中第一项
			this.Address.province = this.province[0].province_id;
		},
		methods: {
			// 加载下一级分类
			async loadOptions(id) {
				let { status, data } = await Goods.subcate( id );
				if (status) {
					return data;
				}
			},
			// 加载二级分类
			async handleloadSubcate(val) {
				//请求二级分类
				let options = await this.loadOptions(val);
				// 判断options是否有值
				if (options.length > 0) {
					this.options_2nd = options;
					this.ruleForm.cate_2nd = options[0].id;
					this.handleloadsub(this.ruleForm.cate_2nd);
				} else {
					this.ruleForm.cate_2nd = '';
					this.options_2nd = [];
					this.options_3rd = [];
					this.ruleForm.cate_3rd = '';
				}
			},
			// 加载三级分类
			async handleloadsub(id) {
				// 判断id是否有值
				if (id) {
					let options = await this.loadOptions(id);
					if (options.length > 0) {
						this.options_3rd = options;
						this.ruleForm.cate_3rd = options[0].id;
					} else {
						this.ruleForm.cate_3rd = '';
						this.options_3rd = [];
					}
				} else {
					this.ruleForm.cate_3rd = '';
					this.options_3rd = [];
				}
			},
			// 删除图片
			async handleRemove(file, fileList) {
				console.log(file, fileList);
				let { url } = file;
				let { status } = await Goods.editRemove(url);
				if (status) {
					// 删除最后一项
					this.fileList = fileList;
					// 删除this.ruleform.slider 中的最后一项
					let silder = this.ruleForm.slider.split(',');
					var a1 = silder.indexOf(url);
					silder.splice(a1,1);
					this.ruleForm.slider = silder.join(',');
				}
			},
			handlePictureCardPreview(file) {
				this.ruleForm.slider = file.url;
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
					// 图片上传成功在this.fileList后边添加一个元素
					this.fileList.push({ url: src });
					var slider = [];
					// 将数组对象转换称为一个数组
					for (let i = 0; i < this.fileList.length; i++) {
						slider.push(this.fileList[i].url);
					}
					// 将数组转换称为字符串
					this.ruleForm.slider = slider.join(',');
					console.log(this.ruleForm.slider);
				}
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
			// 点击提交
			async handleSubmit() {
				let { status } = await Goods.editGoods(this.ruleForm);
				if (status) {
					this.$message.success("更新成功！");
					this.$router.replace('/goods/list');
				}
			}
		}
	}
</script>

<style>
	.el-select {
		margin-right: 20px;
	}

	.el-alert {
		margin-bottom: 20px;
		height: 45px;
	}

	.el-alert__title {
		font-size: 15px;
		color: #000000;
	}

	.cont {
		font-size: 12px;
		color: #b6b6b9;
	}
</style>
