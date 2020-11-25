export default{
	// 开辟独立命名空间，避免使用混乱
	namespaced:true,
	//计数器
	state:{
		firtsName: "Tom",
		lastName: "Smith",
	},
	mutations:{		
		
	},
	getters:{
		fullName({
			firtsName,
			lastName
		}) {
			return firtsName + '' + lastName;
		}
	},
	actions:{
		
	},
	modules:{
		
	},
}