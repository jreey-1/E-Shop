//模块化js接口
import axios from 'axios'

let list = (formData) => axios.get('/api/admin/goods/list', { params: formData })
// 删除商品
let delGoods = (data) => axios.delete('/api/admin/goods', { params: data })
// 获取子集分类
let subcate = (data) => axios.get('/api/category/sub', { params: { pId: data } })
// 添加分类
let insert = (data) => axios.post('/api/category', data);
// 删除分类
let remove = (data) => axios.delete('/api/category', { params: data });
//编辑分类
let edit = (data) => axios.put('/api/category', data);
//获取所有省份
let province = (data) => axios.get('/api/pcct/province', { params: data });
//根据省份id获取城市
let city = (id) => axios.get('/api/pcct/city', { params: { id: id } });
// 根据市区id获取县区
let county = (id) => axios.get('/api/pcct/county', { params: { id: id } });
// 根据县区id获取街道(镇)
let town = (id) => axios.get('/api/pcct/town', { params: { id: id } });
// 发布新商品
let release = (data) => axios.post('/api/admin/goods', data);
// 获取商品列表
let GoodsList = (data) => axios.get('/api/admin/goods/list',{params:data});
// 获取商品详情
let goods = (id) => axios.get('/api/admin/goods',{params:id});
// 编辑商品
let editGoods = (data) => axios.put('/api/admin/goods',data);
export default {
	list,
	subcate,
	insert,
	remove,
	edit,
	delGoods,
	province,
	city,
	county,
	town,
	release,
	GoodsList,
	goods,
	editGoods,
}
