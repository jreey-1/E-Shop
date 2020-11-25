import axios from 'axios'

// 用户列表
let list = (formDate) => axios.get('/user/list', {
	params: formDate
})
// 删除用户
let del = (id) => axios.delete('/user/' + id);
// 获取个人资料
let info = (id) => axios.get('/user/', {params: {id: id}})
// 编辑
// let edit = (id, formData) => {
// 	console.log(id,formData);
// 	}
let edit = (id, formData) => axios.put('/user/' + id, 
	formData
)
export default {
	list,
	del,
	info,
	edit
}
