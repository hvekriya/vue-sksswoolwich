<template>
    <div class="wrapper container">
        <header class="page-header">
            <h1 class="title">Daily Darshan</h1>
        </header>
        <br />
        <br />
        <div class="row">
            <div id="lightgallery">
                <template v-for="(photo, index) in album.photo"
                          class="col-xs-6 col-sm-4 col-md-3 col-lg-2">
                    <a :href="photo.url_o" class="dailydarshan-gallery">
                        <img :src="photo.url_n"
                             class="category-banner img-responsive" />
                        <div class="dd-caption">
                            <span>{{ photo.datetaken | formatDate }}</span>
                        </div>
                    </a>
                </template>
            </div>
        </div>
        <br />
        <br />
    </div>
</template>

<script>
export default {
    name: "DailyDarshan",
    async asyncData({ $axios, error }) {
        try {
            // Event photos
            const flickrConfig = {
                api_key: process.env.flickrApiKey,
                user_id: process.env.flickrUserId,
                format: "json",
                nojsoncallback: 1,
            };

            const flickrUrl = process.env.flickrUrl;

            const set = await $axios.get(flickrUrl, {
                params: {
                    ...flickrConfig,
                    method: "flickr.photosets.getPhotos",
                    photoset_id: "72177720300123646",
                    extras: "url_n, url_o, date_upload, date_taken",
                    // per_page: "10"
                },
            });
            const album = set.data.photoset;
            return {
                album
            };
        } catch (e) {
            console.log(error);
        }
    },
    errorCaptured(err, vm, info) {
        console.log(err);
    },
    mounted() {
        const el = document.getElementById("lightgallery");
        window.lightGallery(el);
    },
}
</script>

<style lang="scss" scoped>
.dd-caption {
    padding: 10px !important;
}
.dailydarshan-gallery {
margin: 6px;
}
</style>