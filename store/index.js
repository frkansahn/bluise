import Vue from 'vue';

export const state = () => ({
  	config: undefined,
  	token:undefined,
  	_cusId:undefined,
  	_userId:undefined
})

export const mutations = {
  	config (state , data) {
    	state.config = data;
  	},
  	token (state , data) {
    	state.token = data;
  	},
  	_cusId (state , data) {
    	state._cusId = data;
  	},
  	_userId (state , data) {
    	state._userId = data;
  	}
}

export const getters = {
  
}

export const actions = {
  	getService({ dispatch , commit , state} , {urlParameter,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$get(`${process.env.baseUrl}${urlParameter}`, {'headers': { 'Authorization':'Bearer ' + token}})
  				.then(response => {
				    return response;
				})
				.catch(error => {
					return false;
				});
  				resolve(result.response);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	},
  	postService({ dispatch , commit , state} , {data,urlParameter,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$post(`${process.env.baseUrl}${urlParameter}` , data , {'headers': {'Content-Type':'application/json','Authorization':'Bearer ' + token}})
  				.then(response => {
				      return response;
				  })
				  .catch(error => {
					 return false;
				  });

  				resolve(result);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	},
  	uploadImage({ dispatch , commit , state} , {data,token}){
  		return new Promise(async (resolve, reject) => {
  			try
  			{
  				const result = await this.$axios.$post(`${process.env.baseUrl}/api/v1/image/upload` , data)
  				.then(response => {
				      return response;
				  })
				  .catch(error => {
					 return false;
				  });

  				resolve(result);
  			}
  			catch(err){
  				reject(err);
  			}
  		});
  	}

}