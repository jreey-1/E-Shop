import axios from 'axios'

// 获取角色列表
let list = () => axios.get('/api/role/list');
// 删除角色
let del = (id) => axios.delete('/role/' + id);
// 添加角色
let add = (name) => axios.post('/role', { name: name });
// 更新
let update = (id, name) => axios.put('/role/' + id, { name: name })
export default {
    list,
    del,
    add,
    update
}