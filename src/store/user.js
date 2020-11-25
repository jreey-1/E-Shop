import {Admin} from '@/api/index'
export default{
	// 开辟独立命名空间，避免使用混乱
	namespaced:true,

	state:{
		// 账户信息
		info: {}
	},
	mutations:{		
		saveInfo(state, data) {
			state.info = data;
		},
	},
	getters:{
		
	},
	actions:{
		async loadInfos(context) {
			let {id} = sessionStorage;
			let {status,data} = await Admin.info({id});
			if (status) {
				context.commit('saveInfo', data)
			}
		},
		async uploadInfo(context,formData){
			let { status, msg} = await Admin.editInfo(formData);
			if(status){
			   context.commit('saveInfo', formData)
			}
			
			return { status, msg }
		}
	},
	modules:{
		
	},
}