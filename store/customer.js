import Vue from 'vue';

export const state = () => ({
  	customerToken:undefined
})

export const mutations = {
  	customerToken (state , data) {
    	state.customerToken = data;
  	}
}

export const getters = {
  getCustomerToken: (state) => state.customerToken  
}

export const actions = {
}