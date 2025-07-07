<template>
  <div class="filter-dropdown-container">
    <button
      class="filter-dropdown-toggle"
      type="button"
      @click="toggleDropdown"
      :aria-expanded="isDropdownOpen ? 'true' : 'false'"
    >
      Filter by year: <span class="selected-year">{{ currentYearFilter }}</span>
      <span class="caret" :class="{ 'caret-up': isDropdownOpen }"></span>
    </button>
    <ul class="filter-dropdown-menu" :class="{ 'is-open': isDropdownOpen }">
      <li v-for="year in availableYears" :key="year">
        <NuxtLink :to="`/events/year/${year}`" @click.native="selectYear(year)">{{
          year
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
import moment from "moment"; // Make sure moment is available if not globally

export default {
  name: "PastYears",
  data() {
    return {
      isDropdownOpen: false,
      availableYears: [],
      currentYearFilter: "All Years", // Default text for the filter
    };
  },
  watch: {
    // Watch for route changes to update the currentYearFilter
    "$route.params.year": {
      immediate: true, // Run on component mount
      handler(newYear) {
        this.currentYearFilter = newYear || "All Years";
      },
    },
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectYear(year) {
      this.currentYearFilter = year;
      this.isDropdownOpen = false; // Close dropdown on selection
      // NuxtLink handles navigation, @click.native just for closing dropdown/setting text
    },
    // Dynamically generate years, e.g., from current year back to a reasonable past
    generateYears() {
      const currentYear = moment().year(); // Current year (e.g., 2025)
      const startYear = 2020; // Or whatever is the earliest event year you have
      const years = [];
      for (let year = currentYear; year >= startYear; year--) {
        years.push(year);
      }
      this.availableYears = years;
    },
    // Close dropdown if clicked outside
    handleClickOutside(event) {
      if (!this.$el.contains(event.target)) {
        this.isDropdownOpen = false;
      }
    },
  },
  mounted() {
    this.generateYears();
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener("click", this.handleClickOutside);
  },
};
</script>

<style lang="scss" scoped>
/* Color definitions - ensure these are consistent with your global theme */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #da1b60;
$text-dark: #343a40;
$text-light-gray: #6c757d;
$border-light: #e9ecef;
$bg-light: #f8f9fa;
$card-bg: #ffffff;

$font-body: "Open Sans", sans-serif;

/* Mixins for responsiveness */
@mixin media-breakpoint-up($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: 576px) {
      @content;
    }
  } @else if $breakpoint == md {
    @media (min-width: 768px) {
      @content;
    }
  } @else if $breakpoint == lg {
    @media (min-width: 992px) {
      @content;
    }
  } @else if $breakpoint == xl {
    @media (min-width: 1200px) {
      @content;
    }
  }
}

.filter-dropdown-container {
  position: relative;
  width: 100%; // Default to full width on mobile
  margin-bottom: 20px; // Space below dropdown

  @include media-breakpoint-up(md) {
    width: auto; // Auto width on larger screens
    float: right; // Float right as per original desire on desktop
    margin-bottom: 0; // No extra margin if floated
  }
}

.filter-dropdown-toggle {
  background: $primary-gradient;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px; // Pill shape
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; // Full width on mobile
  box-shadow: 0 4px 10px rgba($primary-solid-fallback, 0.2);
  transition: all 0.3s ease;
  font-family: $font-body;

  .selected-year {
    margin-left: 5px;
    font-weight: 700;
  }

  .caret {
    display: inline-block;
    width: 0;
    height: 0;
    margin-left: 8px;
    vertical-align: middle;
    border-top: 5px solid;
    border-right: 5px solid transparent;
    border-left: 5px solid transparent;
    transition: transform 0.3s ease;

    &.caret-up {
      transform: rotate(180deg);
    }
  }

  &:hover {
    background: linear-gradient(to right, darken(#8b184c, 5%), darken(#da1b60, 5%));
    transform: translateY(-1px);
    box-shadow: 0 6px 12px rgba($primary-solid-fallback, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }

  @include media-breakpoint-up(md) {
    width: auto; // Shrink to content width on desktop
  }
}

.filter-dropdown-menu {
  position: absolute;
  top: 100%; // Below the button
  left: 0;
  z-index: 1000;
  min-width: 100%; // Ensure it matches button width on mobile
  margin: 5px 0 0;
  padding: 0;
  list-style: none;
  background-color: $card-bg;
  border: 1px solid $border-light;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s ease;

  &.is-open {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  li {
    &:first-child {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-child {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
  }

  a {
    display: block;
    padding: 10px 20px;
    clear: both;
    font-weight: normal;
    line-height: 1.42857143;
    color: $text-dark;
    white-space: nowrap;
    text-decoration: none; // Remove default underline
    transition: background-color 0.2s ease, color 0.2s ease;
    font-family: $font-body;

    &:hover,
    &:focus {
      background-color: $bg-light;
      color: $primary-solid-fallback;
    }

    // Active state from NuxtLink
    &.nuxt-link-exact-active,
    &.nuxt-link-active {
      background-color: $primary-solid-fallback;
      color: white;
      font-weight: 600;
    }
  }

  @include media-breakpoint-up(md) {
    min-width: auto; // Allow dropdown to shrink to content on desktop
    right: 0; // Align right on desktop
    left: unset;
  }
}
</style>
