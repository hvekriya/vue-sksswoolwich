<template>
  <div class="wrapper container-fluid">
    <div class="wrap">
      <div class="profile">
        <img
          src="https://media.licdn.com/dms/image/D560BAQEhWHtCe0MXrg/company-logo_200_200/0/1689536558179?e=1713398400&v=beta&t=3c-AJpZzKfoStVU-6MSIC4yPvpzi0PSNJsMhnYJjBzE"
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
            <i :class="item.icon" style="color: white; margin-right: 4px"></i>
            <a :href="item.link" class="btn btn-primary">{{ item.title }}</a>
          </template>
          <template v-else>
            <b>{{ item.title }}</b>
          </template>
          <br />
          <small v-html="item.description"></small>
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
          description: data.description,
          order: data.order,
        });
      });
      this.linkTree = _linkTree;
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
    this.$fire.database.ref("/link-tree").on("value", this.onDataChange);
  },
  beforeDestroy() {
    this.$fire.database.ref("/link-tree").off("value", this.onDataChange);
  },
};
</script>

<style scoped>
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
  margin-top: 60px;
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
}

.btn.btn-primary {
  width: 100%;
}
</style>
