//模块化js接口
import axios from 'axios'

// 登录
let login = (formData) => axios.post('/api/admin/login', formData);
// 注册
let register = (formDate) => axios.post('/api/admin/register', formDate);
// 获取管理员列表
let list = () => axios.get('/api/admin/list');
// 删除管理员
let del = (id) => axios.delete('/api/admin', { params: id });
// 获取管理员个人资料
let info = (id) => axios.get('/api/admin', { params: id });
// 编辑管理员个人资料
let edit = (formData) => axios.put('/api/admin', formData);
// 编辑本账户信息
let editInfo = (data) => axios.put('/api/admin/account', data)
export default {
    login,
    register,
    list,
    del,
    info,
    editInfo,
    edit
}