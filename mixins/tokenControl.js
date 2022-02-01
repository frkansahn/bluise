export default {
    data() {
    return {
        }
    },
    computed: {
    },
    methods:{
        async tokenControl(){
            return new Promise(async (resolve, reject) => {
                try
                {
                    var _this = this;
                    var token = _this.$cookiz.get("token");
                    if(token)
                    {
                        _this.$store.dispatch('getService' , {"urlParameter":"/api/v1/token/control/" + token , "token": ""})
                        .then(response => {
                            if(response)
                            {
                                if(response.msg == "ok")
                                {
                                    resolve(true);
                                }
                                else
                                {
                                    resolve(false);
                                }
                            }
                            else
                            {
                                resolve(false);
                            }
                        })
                        .catch(err => {
                            reject(err);
                        })
                    }
                    else
                        resolve(false);
                     
                }
                catch(err){
                    reject(err);
                }
            });           
        }
    },
    mounted() {

    },
}
