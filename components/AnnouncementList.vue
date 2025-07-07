<template>
  <div>
    <ul class="list-group" v-if="announcements && announcements.length > 0">
      <li
        class="list-group-item"
        :class="{ active: index == currentIndex }"
        v-for="(announcement, index) in sortedAnnouncements"
        :key="announcement.key || index"
      >
        <b>{{ announcement.title }}</b>
        <br />
        <small v-html="announcement.description"></small>
      </li>
    </ul>
    <p v-else>No announcements.</p>
  </div>
</template>

<script>
export default {
  name: "AnnouncementList",
  data() {
    return {
      announcements: [],
      currentIndex: -1, // Only relevant if you add click handlers to make items active
    };
  },
  methods: {
    onDataChange(snapshot) {
      let _announcements = [];
      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();

        _announcements.push({
          key: childSnapshot.key, // Firebase provides a unique key
          order: data.order,
          title: data.title,
          description: data.description,
          published: data.published, // Keeping the property, but it won't be used for filtering
          // Add other properties from Firebase data if needed
        });
      });

      // No filtering here, all fetched announcements will be displayed
      this.announcements = _announcements;
    },

    // This method is still not used and refers to `currentAnnouncements` which is undefined.
    // You might want to remove it unless you plan to use it later.
    refreshList() {
      // this.currentAnnouncements = null;
      this.currentIndex = -1;
    },
  },
  computed: {
    sortedAnnouncements: function () {
      // Using .slice() to create a shallow copy before sorting,
      // to avoid mutating the original `this.announcements` array directly.
      return this.announcements.slice().sort(function (a, b) {
        if (a.order < b.order) return -1;
        if (a.order > b.order) return 1;
        return 0;
      });
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
  list-style: none; /* Remove default list bullets */
  padding: 0; /* Remove default padding */

  .list-group-item {
    background-color: #f8f9fa; /* Light background for items */
    color: #343a40; /* Darker text for readability */
    border: 1px solid #e9ecef; /* Subtle border */
    border-radius: 8px; /* Slightly rounded corners */
    margin-bottom: 10px; /* More space between items */
    padding: 15px 20px; /* More padding inside items */
    transition: all 0.3s ease; /* Smooth transitions for hover/active */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* Subtle shadow */
    font-family: "Roboto", sans-serif; /* Keep Roboto or choose another modern font */

    &:last-child {
      margin-bottom: 0; /* No bottom margin for the last item */
    }

    &.active {
      background-color: #007bff; /* A nice primary blue for active state */
      color: #ffffff; /* White text for active state */
      border-color: #007bff;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* More pronounced shadow for active */
      transform: translateY(-2px); /* Slight lift for active item */
    }

    b {
      font-size: 1.1em; /* Slightly larger title */
      display: block; /* Make title take its own line */
      margin-bottom: 5px; /* Space between title and description */
    }

    small {
      font-size: 0.9em; /* Slightly smaller description */
      line-height: 1.5; /* Improve description readability */
      color: #6c757d; /* Softer color for description */
      .active & {
        /* Target small tag when parent is active */
        color: #e9ecef; /* Lighter color for description in active state */
      }
    }
  }
}

p {
  color: #6c757d; /* Softer color for "No announcements" text */
  text-align: center;
  padding: 20px;
  font-family: "Roboto", sans-serif;
}
</style>
