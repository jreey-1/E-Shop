import Vue from 'vue'
import Vuex from 'vuex'
import { Message } from 'element-ui';
// vuex持久存储
import createPersistedState from "vuex-persistedstate";

// vuex持久化存储原理
// function save(store){
// 	// 当store初始化后调用
// 	// 获取localstorage存储的state
// 	let { vuex }  = localStorage;
// 	store.replaceState({...vuex});
	
// 	// 每次mutation
// 	store.subscribe(())
// }

// 计数器
import counter from './counter.js'
// 名字
import name from './name.js'
// 菜单
import menu from './menu.js'
// info
import user from './user.js'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {	
		
	
	},
	mutations: {		
		
	},
	getters: {
		
	},
	// 请求异步数据
	actions: {
		
	},
	modules: {
		counter,
		name,
		menu,
		user,
	},
	plugins: [createPersistedState()],
})
