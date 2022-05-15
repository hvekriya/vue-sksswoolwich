<template>
  <div>
    <div>
      <ul class="list-group" v-if="announcements">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(annoucement, index) in announcements"
          :key="index"
        >
          {{ annoucement.title }}
          <br />
          <small>{{ annoucement.description }}</small>
        </li>
      </ul>
      <p v-else>No announcements.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnnouncementList",
  data() {
    return {
      announcements: [],
      currentIndex: -1,
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
  },
  mounted() {
    this.$fire.database.ref("/annoucements").on("value", this.onDataChange);
  },
  beforeDestroy() {
    this.$fire.database.ref("/annoucements").off("value", this.onDataChange);
  },
};
</script>

<style lang="scss" scoped>
.list-group {
  margin: 0;
  margin-bottom: 20px;
  .list-group-item {
    font-size: 20px;
    color: $white;
    border-radius: 4;
    margin: 4px;
    background: $main-gradiant;
    small {
      color: $gray-200;
    }
  }
}
</style>
