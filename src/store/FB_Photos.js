import axios from 'axios';

export default {
    namespaced: true,
    state: {
        photos: [],
        album_name: null,
        nextSetOfPhotos: null,
    },
    getters: {
        getPhotos: state => {
            return state.photos
        },
        getNextSetOfPhotos: state => {
            return state.nextSetOfPhotos
        },
        getAlbumName: state => {
            return state.album_name
        }
    },
    mutations: {
        setPhotos: function(state, data) {
            state.photos.push(data);
        },
        setNextSetOfPhotos: function(state, data) {
            state.nextSetOfPhotos = data
        },
        setAlbumName: function(state, data) {
            state.album_name = data
        }
    },
    actions: {
        getFBAlbum({
            commit
        }, id) {
            return new Promise((resolve, reject) => {
                var album = null
                axios
                    .get(
                        `https://graph.facebook.com/v10.0/${id}?fields=photos%7Bimages%2Calbum%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
                    )
                    .then((response) => {
                        commit('setNextSetOfPhotos', response.data.photos.paging.next)
                        commit('setAlbumName', response.data.photos.data[0].album.name)

                        album = response.data.photos.data.map((items) => {
                            return items.images;
                        });

                        response.data.photos.data
                            .map((item) => item)
                            .map((item) => {
                                return commit('setPhotos', item.images)
                            })
                            .catch((err) => {
                                if (err.msg) {
                                    this.loading = false;
                                }
                            });
                        commit('setAlbumName', response.data.photos.data[0].album.name)

                        resolve();
                    })
                    .catch((err) => {
                        if (err.msg) {
                            this.loading = false;
                        }
                    });
            });
        },
        getMorePhotos({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                if (state.nextSetOfPhotos != undefined) {
                    axios
                        .get(state.nextSetOfPhotos)
                        .then((response) => {
                            commit('setNextSetOfPhotos', response.data.paging.next)
                            response.data.data
                                .map((item) => item)
                                .map((item) => {
                                    return commit('setPhotos', item.images)
                                })
                        }).catch((err) => {
                            if (err.msg) {
                                this.loading = false;
                            }
                        });
                }
            });
        },
    }
}
