import axios from 'axios';

export default {
    namespaced: true,
    state: {
        albums: [],
        nextSetOfAlbums: ''
    },
    getters: {
        getAlbums: state => {
            return state.albums
        },
        getNextSetOfAlbums: state => {
            return state.nextSetOfAlbums
        }
    },
    mutations: {
        setAlbums: function(state, data) {
            state.albums.push(data);
        },
        setNextSetOfAlbums: function(state, data) {
            state.nextSetOfAlbums = data
        }
    },
    actions: {
        getFBAlbums({
            commit
        }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(
                        `https://graph.facebook.com/v5.0/216354315082607?fields=albums%7Bcover_photo%2Cname%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
                    ).then((response) => {
                        // Commit the albums to the album state
                        commit('setNextSetOfAlbums', response.data.albums.paging.next)

                        // Filter out the ones we dont want
                        response.data.albums.data
                            .map((item) => item)
                            .filter((item) => {
                                return (
                                    item.name !== "Timeline Photos" &&
                                    item.name !== "Mobile Uploads" &&
                                    item.name !== "Instagram Photos" &&
                                    item.name !== "Profile pictures"
                                );
                            })
                            .map((item) => {
                                axios
                                    .get(
                                        `https://graph.facebook.com/v10.0/${item.id}?fields=photos.limit(4000)%7Bimages%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
                                    )
                                    .then((response) => {
                                        const all_albums = response.data.photos.data.map((items) => {
                                            return items.images;
                                        });
                                        const thumbnails = all_albums.map((nested) =>
                                            nested.map((element) => element)
                                        );
                                        // Commit the albums to the album state
                                        commit('setAlbums', {
                                            link: `/media/gallery/album/${item.id}`,
                                            name: item.name,
                                            date: item.cover_photo.created_time,
                                            cover_photo: thumbnails[0][0].source,
                                        })
                                    });
                            });
                        resolve();
                    });
            });
        },
        getMoreFBAlbums({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                if (state.nextSetOfAlbums != undefined) {
                    axios.get(state.nextSetOfAlbums).then((response) => {
                        commit('setNextSetOfAlbums', response.data.paging.next)
                        response.data.data
                            .map((item) => item)
                            .map((item) => {
                                axios
                                    .get(
                                        `https://graph.facebook.com/v5.0/${item.id}?fields=photos.limit(4000)%7Bimages%7D&access_token=${process.env.VUE_APP_FB_ACCESS}`
                                    )
                                    .then((response) => {
                                        const all_albums = response.data.photos.data.map((items) => {
                                            return items.images;
                                        });
                                        const thumbnails = all_albums.map((nested) =>
                                            nested.map((element) => element)
                                        );
                                        // Commit the albums to the album state
                                        commit('setAlbums', {
                                            link: `/media/gallery/album/${item.id}`,
                                            name: item.name,
                                            date: item.cover_photo.created_time,
                                            cover_photo: thumbnails[0][0].source,
                                        })
                                    });
                            });
                    });
                }
                resolve();
            });
        },
    }
}
