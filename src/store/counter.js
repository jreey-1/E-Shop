export default{
	// 开辟独立命名空间，避免使用混乱
	namespaced:true,
	//计数器
	state:{
		count: 0,
	},
	mutations:{		
		increment(state, event, n = 1) {
			state.count += n;
		},
		decrement(state, n = 1) {
			state.count -= n;
		},
	},
	getters:{
		
	},
	actions:{
		
	},
	modules:{
		
	},
}