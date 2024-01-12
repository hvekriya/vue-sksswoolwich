<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Link tree</h1>
      <div v-if="user">
        <span>{{ user.email }} | </span>
        <a @click="logout">Logout</a>
      </div>
    </header>
    <div class="list row">
      <div class="col-md-6">
        <ul class="list-group">
          <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(item, index) in linkTreeItems"
            :key="index"
            @click="setActiveLink(item, index)"
          >
            {{ item.order }}. {{ item.title }}
            <br />
            <small v-html="item.description"></small>
          </li>
        </ul>
        <a
          href="/admin-dash/link-tree/new-link-tree-item"
          class="btn btn-primary"
          >Add new link</a
        >
        <br />
        <br />
      </div>
      <div class="col-md-6">
        <div v-if="currentLink">
          <EditLink :linkItem="currentLink" @refreshList="refreshList" />
        </div>
        <div v-else>
          <br />
          <p>Click on a item to edit/update/delete...</p>
          <p>
            You can use
            <a href="https://gujarati.indiatyping.com/"
              >https://gujarati.indiatyping.com/</a
            >
            to type english lipi to gujarati
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditLink from "./edit-link-tree.vue";
export default {
  name: "LinkTree",
  components: { EditLink },
  data() {
    return {
      linkTreeItems: [],
      currentLink: null,
      currentIndex: -1,
      user: "",
    };
  },
  methods: {
    onDataChange(items) {
      let _links = [];
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _links.push({
          key: key,
          order: data.order,
          title: data.title,
          description: data.description,
          link: data.link,
        });
      });
      this.linkTreeItems = _links;
    },
    refreshList() {
      this.currentLink = null;
      this.currentIndex = -1;
    },
    setActiveLink(item, index) {
      this.currentLink = item;
      this.currentIndex = index;
    },
    removeAllannouncements() {
      this.$fire.database
        .ref("/link-tree")
        .deleteAll()
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    logout() {
      this.$fire.auth.signOut().then((result) => {
        this.user = "";
        this.$router.push("/admin-dash/auth");
      });
    },
  },
  mounted() {
    this.$fire.auth.onAuthStateChanged((user) => {
      this.user = user;

      if (!this.user) {
        this.$router.replace("/admin-dash/auth");
      } else {
        this.$fire.database.ref("/link-tree").on("value", this.onDataChange);
      }
    });
  },
  beforeDestroy() {
    this.$fire.database.ref("/link-tree").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-left: 0;
}
</style>
