//模块化js接口
import axios from 'axios'

// 获取子菜单
let subcate = (data) => axios.get('/api/menu/sub', { params: { pId: data } })
    // 编辑
let edit = (data) => axios.put('/api/menu', data)
    // 添加
let insert = (data) => axios.post('/api/menu', data)
    // 删除
let remove = (data) => axios.delete('/api/menu', { params: data })



export default {
    subcate,
    edit,
    insert,
    remove
}