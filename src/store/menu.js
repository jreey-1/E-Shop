export default{
	// 开辟独立命名空间，避免使用混乱
	namespaced:true,

	state:{
		isCollapse: false,
	},
	mutations:{		
		toggleMenu(state) {
			state.isCollapse = !state.isCollapse
		},
	},
	getters:{
		
	},
	actions:{
		
	},
	modules:{
		
	},
}