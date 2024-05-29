<template>
  <div class="wrapper container-fluid">
    <video
      autoplay
      muted
      loop
      id="myVideo"
      v-for="(video, index) in backgroundVid"
      :key="'video-' + index"
    >
      <source :src="video" type="video/mp4" />
    </video>

    <div class="wrap">
      <div class="profile">
        <img
          src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
          class="photo"
        />
        <span class="profile_name">SKSS Temple Woolwich</span>
        <span class="at">@woolwichTemple</span>
      </div>
      <ul class="list-group" v-if="linkTree">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(item, index) in sortedLinkTree"
          :key="index"
        >
          <template v-if="item.link">
            <a :href="item.link" class="btn btn-primary" style="margin-bottom: 6px">
              <i :class="item.icon" style="color: white; margin-right: 4px"></i>
              {{ item.title }}</a
            >
            <small v-html="item.description"></small>
          </template>
          <template v-else>
            <div class="info-message">
              <h4>
                <i :class="item.icon" style="margin-right: 4px"></i>
                {{ item.title }}
              </h4>
              <small v-html="item.description"></small>
            </div>
          </template>
        </li>
      </ul>
      <p v-else>No links.</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "linkTree",
  name: "Follow",
  data() {
    return {
      linkTree: [],
      currentIndex: -1,
      backgroundVid: [],
    };
  },
  methods: {
    onDataChange(items) {
      let _linkTree = [];
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _linkTree.push({
          key: key,
          title: data.title,
          link: data.link,
          icon: data.icon,
          description: data.description,
          order: data.order,
        });
      });
      this.linkTree = _linkTree;
    },
    getBackgroundVideo() {
      // Get firebase images
      const fireStorage = this.$fire.storage.ref("backgrounds");
      fireStorage
        .listAll()
        .then((res) => {
          let _backgroundVid = [];
          res.items.forEach((itemRef) => {
            this.$fire.storage
              .ref(itemRef.fullPath)
              .getDownloadURL()
              .then((url) => {
                console.log(url);
                _backgroundVid.push(url);
              })
              .catch((e) => {
                console.log(e);
              });
          });
          this.backgroundVid = _backgroundVid;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    refreshList() {
      this.currentLinks = null;
      this.currentIndex = -1;
    },
  },
  computed: {
    sortedLinkTree: function () {
      function compare(a, b) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      }
      return this.linkTree.sort(compare);
    },
  },
  mounted() {
    this.getBackgroundVideo();
    this.$fire.database.ref("/link-tree").on("value", this.onDataChange);
  },
  beforeDestroy() {
    this.$fire.database.ref("/link-tree").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
#myVideo {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.list-group-item {
  text-align: center;
}
.wrapper {
  background-image: url("https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: top;
}
.wrap {
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 60px;
}
.profile {
  text-align: center;
  color: #fff;
}
.photo {
  width: 30%;
  border-radius: 50%;
}
.profile {
  position: relative;
}
.profile_name {
  font-weight: bold;
  display: block;
}
.at {
  font-size: 13px;
}
.list-group {
  margin: 0;
  margin-bottom: 20px;
}
.list-group-item {
  font-size: 16px;
  border-radius: 0;
  margin: 4px;
  background: transparent;
  border: none;
  color: white;
}

.info-message {
  background-color: white;
  padding: 20px;
  color: $primary;
}

.btn {
  border-radius: 30px;
  font-size: 18px;
  border: solid 2px white !important;
  padding: 16px;
  background: transparent !important;
  &.btn-primary {
    width: 100%;
  }
}
</style>
