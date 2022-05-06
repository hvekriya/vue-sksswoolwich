<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Annoucments</h1>
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
            v-for="(annoucement, index) in announcements"
            :key="index"
            @click="setActiveAnnouncement(annoucement, index)"
          >
            {{ annoucement.title }}
            <br />
            <small>{{ annoucement.description }}</small>
          </li>
        </ul>
        <a href="/admin-dash/new-announcement" class="btn btn-primary"
          >Add new annoucement</a
        >
        <!-- <button
          class="m-3 btn btn-sm btn-secondary"
          @click="removeAllannouncements"
        >
          Remove All
        </button> -->
        <br />
        <br />
      </div>
      <div class="col-md-6">
        <div v-if="currentAnnouncements">
          <Announcement
            :announcement="currentAnnouncements"
            @refreshList="refreshList"
          />
        </div>
        <div v-else>
          <br />
          <p>Click on a annoucement to edit/update/delete...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Announcement from "./Announcement.vue";
export default {
  name: "Annoucments",
  components: { Announcement },
  data() {
    return {
      announcements: [],
      currentAnnouncements: null,
      currentIndex: -1,
      user: "",
    };
  },
  methods: {
    onDataChange(items) {
      let _announcements = [];
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _announcements.push({
          key: key,
          title: data.title,
          description: data.description,
          published: data.published,
        });
      });
      this.announcements = _announcements;
    },
    refreshList() {
      this.currentAnnouncements = null;
      this.currentIndex = -1;
    },
    setActiveAnnouncement(announcement, index) {
      this.currentAnnouncements = announcement;
      this.currentIndex = index;
    },
    removeAllannouncements() {
      this.$fire.database
        .ref("/annoucements")
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
        this.$fire.database.ref("/annoucements").on("value", this.onDataChange);
      }
    });
  },
  beforeDestroy() {
    this.$fire.database.ref("/annoucements").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin-left: 0;
}
</style>