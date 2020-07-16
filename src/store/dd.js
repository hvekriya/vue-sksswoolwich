import axios from 'axios';

export default {
    namespaced: true,
    state: {
        dailydarshan: null
    },
    getters: {
        getDD: state => {
            return state.dailydarshan
        }

    },
    mutations: {
        setDD: function(state, data) {
            state.dailydarshan = data
        }
    },
    actions: {
        getFB({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios.get(
                    `https://graph.facebook.com/v5.0/17841400662948582/media?fields=media_url%2Ctimestamp%2Cthumbnail_url%2Ccaption&access_token=${process.env.VUE_APP_FB_ACCESS}`
                ).then(response => {
                    if (response.status === 200) {
                        commit('setDD', response.data.data);
                    } else reject();
                })
            });
        }
    }
}