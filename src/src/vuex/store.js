import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//需要维护的状态

const state = {
	title: '123',
	phone:"18914058090" , //还款中的信息车辆信息
	isBindPhone:false,
}

//所有的mutations

const mutations = {
	getNewTitle (state,payload) {
		state.title=payload.newTitle;
	},
	login(state,loginInfo){
            state.isBindPhone = loginInfo // 假定登陆成功后，设置 state.
        }
}

//所有的actions

const actions = {
	
}

//组件要使用状态中的部分数据

const getters = {

       isBindPhone: state => state.isBindPhone

}

export default new Vuex.Store({
	state,
	mutations,
	actions,
	getters
})
