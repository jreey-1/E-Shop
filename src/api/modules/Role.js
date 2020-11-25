import axios from 'axios';
// 获取角色列表
let list = (data) => axios.get('/api/role/list',{params:{data}});
// 添加角色
let add = (data) => axios.post('/api/role',data);
// 编辑角色
let edit = (data) => axios.put('/api/role',data);
// 删除角色
let del = (id) => axios.delete('/api/role',{params:{id:id}});
// 获取子菜单
let sub = (data) => axios.get('/api/menu/sub',{params:data});
// 获取右侧菜单
let tree = (id) => axios.get('/api/menu/tree',{params:{id:id}});
// 根据角色id获取菜单配置
let obtain = (id) => axios.get('/api/role/config',{params:{id:id}});
// 获取所有element图标
let ele = (data) => axios.get('/api/admin/icon/list',{params:data});
// 保存子菜单
let menu = (data) => axios.put('/api/menu',data);
// 添加子菜单
let addMenu = (data) => axios.post('/api/menu',data);
// 删除子菜单
let removeMenu = (id) => axios.delete('/api/menu',{params:{id:id}});
// 设置子菜单图标
let set = (data) => axios.put('/api/menu/icon',data);
// 给角色添加菜单
let addMuen = (data) => axios.post('/api/role/menu',data);
// 给角色删除菜单
let DelMuen = (data) => axios.delete('/api/role/menu',{params:data});
export default{
	list,
	add,
	edit,
	del,
	sub,
	tree,
	obtain,
	ele,
	menu,
	addMenu,
	removeMenu,
	set,
	addMuen,
	DelMuen,
}