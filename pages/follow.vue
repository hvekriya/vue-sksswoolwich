<template>
  <div class="follow-page-wrapper">
    <div
      class="background-overlay"
      :style="{ backgroundImage: 'url(' + defaultBgImage + ')' }"
    ></div>

    <div class="wrap">
      <div class="profile-section">
        <img
          src="https://www.sksswoolwich.org/img/WoolwichMandirLogo.png"
          class="profile-photo"
          alt="SKSS Temple Woolwich Logo"
        />
        <h1 class="profile-name">SKSS Temple Woolwich</h1>
        <p class="profile-handle">@woolwichTemple</p>
      </div>

      <ul class="link-list" v-if="linkTree && sortedLinkTree.length > 0">
        <li
          class="link-list-item"
          v-for="(item, index) in sortedLinkTree"
          :key="'link-item-' + index"
        >
          <template v-if="item.link">
            <a
              :href="item.link"
              target="_blank"
              rel="noopener noreferrer"
              class="link-button"
            >
              <i :class="item.icon" class="link-icon"></i>
              <span class="link-text">{{ item.title }}</span>
            </a>
            <small v-html="item.description" class="link-description"></small>
          </template>
          <template v-else>
            <div class="info-card">
              <h4 class="info-title">
                <i :class="item.icon" class="info-icon"></i>
                {{ item.title }}
              </h4>
              <small v-html="item.description" class="info-description"></small>
            </div>
          </template>
        </li>
      </ul>
      <p v-else class="no-links-message">No links available at the moment.</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: "linkTree", // Assuming this is a custom layout in Nuxt.js
  name: "Follow",
  data() {
    return {
      linkTree: [],
      currentIndex: -1, // This seems unused if not for active state
      backgroundVid: [],
      defaultBgImage:
        "https://images.prismic.io/sksswoolwich/db3411ef-046c-42be-90a0-e9e21e5d0613_sksswoolwich-tv-bg.png?auto=compress,format", // Default background image
    };
  },
  methods: {
    onDataChange(snapshot) {
      // Renamed 'items' to 'snapshot' for clarity
      let _linkTree = [];
      snapshot.forEach((childSnapshot) => {
        let data = childSnapshot.val();
        _linkTree.push({
          key: childSnapshot.key,
          title: data.title,
          link: data.link,
          icon: data.icon,
          description: data.description,
          order: data.order,
        });
      });
      this.linkTree = _linkTree;
    },
  },
  computed: {
    sortedLinkTree: function () {
      // Use .slice() to create a shallow copy for sorting without mutating original array
      return this.linkTree.slice().sort((a, b) => {
        // Handle cases where 'order' might be missing or not a number
        const orderA = typeof a.order === "number" ? a.order : Infinity;
        const orderB = typeof b.order === "number" ? b.order : Infinity;
        return orderA - orderB;
      });
    },
  },
  mounted() {
    // Ensure Firebase path is correct, e.g., 'link-tree' or 'linktree'
    this.$fire.database.ref("/link-tree").on("value", this.onDataChange);
  },
  beforeDestroy() {
    this.$fire.database.ref("/link-tree").off("value", this.onDataChange);
  },
  head() {
    return {
      // Example of adding Google Fonts (adjust as needed)
      link: [
        {
          rel: "stylesheet",
          href:
            "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Roboto:wght@400;700&display=swap",
        },
        // For Font Awesome icons if you're not using a Nuxt module
        // {
        //   rel: 'stylesheet',
        //   href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css'
        // }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* Base Setup for Full Page Background */
.follow-page-wrapper {
  position: relative;
  width: 100vw;
  min-height: 100vh; // Use min-height to ensure it covers viewport even with less content
  display: flex;
  justify-content: center;
  align-items: flex-start; // Align content to the top
  padding-top: 50px; // Space from the top for the profile section
  padding-bottom: 50px; // Space at the bottom
  overflow: hidden; // Hide any overflow from background elements
  box-sizing: border-box; // Include padding in width/height
}

.background-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -2; // Send to back
  background-color: rgba(0, 0, 0, 0.4); // Dark overlay
}

.background-overlay {
  background-size: cover;
  background-position: center;
  filter: brightness(0.7); // Darken image background slightly
}

/* Content Wrapper */
.wrap {
  width: 100%;
  max-width: 400px; // Increased max-width for better link button size
  margin: 0 auto;
  z-index: 1; // Bring content to front
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px; // Add horizontal padding for smaller screens
}

/* Profile Section */
.profile-section {
  text-align: center;
  color: #fff;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5); // Subtle text shadow for readability over background
}

.profile-photo {
  width: 100px; // Fixed size for consistency
  height: 100px; // Fixed size
  border-radius: 50%;
  object-fit: cover; // Ensure image covers the circular area
  border: 4px solid rgba(255, 255, 255, 0.8); // White border
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); // More prominent shadow
  margin-bottom: 15px;
}

.profile-name {
  font-family: "Montserrat", sans-serif; // Modern font
  font-size: 2.2em; // Larger for prominence
  font-weight: 700;
  margin: 0;
  line-height: 1.2;
}

.profile-handle {
  font-family: "Roboto", sans-serif; // Another modern font
  font-size: 1em;
  color: rgba(255, 255, 255, 0.8); // Slightly muted
  margin-top: 5px;
}

/* Link List */
.link-list {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%; // Make list take full width of .wrap
}

.link-list-item {
  margin-bottom: 15px; // Space between items
  background: rgba(255, 255, 255, 0.15); // Semi-transparent white background
  border-radius: 10px; // Rounded corners
  overflow: hidden; // Ensure content respects border-radius
  backdrop-filter: blur(5px); // Frosted glass effect
  -webkit-backdrop-filter: blur(5px); // For Safari
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); // Subtle lift
  transition: transform 0.2s ease, box-shadow 0.2s ease; // Smooth hover
  will-change: transform, box-shadow; // Performance hint

  &:hover {
    transform: translateY(-3px); // Lift on hover
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
}

/* Link Button Styling */
.link-button {
  display: flex; // Use flexbox for icon and text alignment
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 18px 20px; // More padding for larger buttons
  font-size: 1.1em; // Larger font size
  font-weight: 600;
  text-decoration: none;
  color: #ffffff; // White text
  border: 2px solid rgba(255, 255, 255, 0.6); // Slightly softer white border
  border-radius: 10px; // Match item border-radius
  background: transparent; // Transparent background
  transition: background-color 0.3s ease, border-color 0.3s ease, transform 0.2s ease;

  .link-icon {
    font-size: 1.3em;
    margin-right: 10px; // Space between icon and text
    color: #ffffff; // Ensure icon color is white
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.25); // Slightly more opaque on hover
    border-color: #ffffff; // Solid white border on hover
    transform: scale(1.01); // Subtle grow effect
  }
}

.link-description {
  display: block; // Ensure description is on its own line
  color: rgba(255, 255, 255, 0.7); // Slightly muted white for description
  font-size: 0.85em;
  padding: 10px 20px; // Padding to align with button text
  line-height: 1.4;
  text-align: center;
}

/* Info Card Styling (for items without a link) */
.info-card {
  background-color: rgba(255, 255, 255, 0.9); // Mostly opaque white background
  color: #333; // Darker text for readability
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  will-change: transform, box-shadow;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px); // Lift on hover
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
}

.info-title {
  font-family: "Montserrat", sans-serif;
  font-size: 1.3em;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 10px;
  color: #333;
}

.info-icon {
  margin-right: 8px;
  color: #007bff; // A prominent color for info icons
}

.info-description {
  display: block;
  font-size: 0.9em;
  line-height: 1.5;
  color: #555;
}

.no-links-message {
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-size: 1.1em;
  margin-top: 30px;
}

/* Responsive Adjustments */
@media (max-width: 576px) {
  .profile-photo {
    width: 80px;
    height: 80px;
  }
  .profile-name {
    font-size: 1.8em;
  }
  .profile-handle {
    font-size: 0.9em;
  }
  .link-button {
    padding: 15px 15px;
    font-size: 1em;
  }
  .link-description {
    padding: 8px 15px;
    font-size: 0.8em;
  }
  .info-card {
    padding: 15px;
  }
  .info-title {
    font-size: 1.1em;
  }
  .info-description {
    font-size: 0.8em;
  }
}

@media (max-height: 600px) {
  .follow-page-wrapper {
    padding-top: 30px;
    padding-bottom: 30px;
    align-items: center; // Center vertically on shorter screens
  }
}

/* Ensure icons display correctly - you need to import Font Awesome or similar globally */
/* Example for Nuxt.js, often done in nuxt.config.js plugins or head */
/* You might already have this, but if not, ensure Font Awesome CSS is linked in head() above */
</style>
