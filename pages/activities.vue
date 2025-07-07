<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Sign up for weekly activities</h1>
    </header>
    <div class="row">
      <div class="col-md-8 form-container">
        <form
          name="activity-signup"
          action="/thanks"
          method="post"
          netlify
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="activity-signup" />
          <p class="hidden">
            <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
          </p>

          <div class="form-group">
            <label for="name">Full name</label>
            <input
              type="text"
              id="name"
              class="form-control"
              name="name"
              placeholder="Full name including surname"
              aria-describedby="name"
              required
            />
          </div>

          <div class="form-group">
            <label>Select the activities you wish to join:</label>

            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="bharatanatyam"
                name="activities"
                value="Bharatanatyam class"
              />
              <label for="bharatanatyam">Bharatanatyam class (Every Monday 5pm)</label>
            </div>

            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="satsangTogether"
                name="activities"
                value="Satsang together"
              />
              <label for="satsangTogether">Satsang together (Every Monday 7pm)</label>
            </div>

            <div class="custom-checkbox">
              <input type="checkbox" id="tabla" name="activities" value="Tabla class" />
              <label for="tabla">Tabla class (Every Tuesday 7pm)</label>
            </div>

            <div class="custom-checkbox">
              <input type="checkbox" id="bhajan" name="activities" value="Bhajan class" />
              <label for="bhajan">Bhajan class (Every Wednesday 7pm)</label>
            </div>

            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="academic"
                name="activities"
                value="Maths, English & Gujarati classes"
              />
              <label for="academic"
                >Maths, English & Gujarati classes (Every Saturday 9am)</label
              >
            </div>

            <div class="custom-checkbox">
              <input
                type="checkbox"
                id="satsangClass"
                name="activities"
                value="Satsang classes"
              />
              <label for="satsangClass">Satsang classes (Every Saturday 6pm)</label>
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              id="email"
              placeholder="Your email"
              aria-describedby="email"
              required
            />
          </div>

          <div class="form-group">
            <label for="phone">Phone number</label>
            <input
              type="tel"
              class="form-control"
              name="phone"
              id="phone"
              placeholder="Phone number"
              aria-describedby="phone"
              required
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              class="form-control"
              name="message"
              id="message"
              placeholder="Any extra info"
              aria-describedby="message"
              rows="5"
            />
          </div>

          <button type="submit" value="Send message" class="btn btn-primary">
            Send request
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activities",
  head() {
    return {
      title: "Sign Up for Activities | SKSS Temple Woolwich",
      meta: [
        {
          hid: "description",
          name: "description",
          content:
            "Sign up for weekly Bharatanatyam, Satsang, Tabla, Bhajan, Maths, English & Gujarati classes at SKSS Temple Woolwich.",
        },
        // You can add more Open Graph/Twitter meta tags similar to your event page if needed
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
/* Define primary colors - ensure these are consistent with your global styles */
$primary-gradient: linear-gradient(to right, #8b184c, #da1b60);
$primary-solid-fallback: #8b184c;
$secondary-gray: #6c757d;
$light-gray-bg: #f8f9fa;
$dark-text: #343a40;
$border-color: #dee2e6;
$card-bg: #ffffff;

$font-heading: "Montserrat", sans-serif;
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

/* --- General Page Structure (matching events-page-wrapper) --- */
.wrapper {
  padding-top: 50px;
  padding-bottom: 50px;
  // background-color: $light-gray-bg; // REMOVED THIS LINE
  min-height: calc(100vh - 100px);
  font-family: $font-body;
  color: $dark-text;

  @media (max-width: 767px) {
    padding-top: 30px;
    padding-bottom: 30px;
  }
}

/* --- Page Header (matching events page header) --- */
.page-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;

  h1 {
    // Target h1 directly for page title
    font-family: $font-heading;
    font-size: 3rem;
    font-weight: 700;
    color: $primary-solid-fallback;
    margin-bottom: 10px;
    line-height: 1.2;

    @media (max-width: 767px) {
      font-size: 2.2rem;
    }
  }

  &::after {
    content: "";
    display: block;
    width: 80px;
    height: 4px;
    background-color: $primary-solid-fallback;
    margin: 10px auto 0;
    border-radius: 2px;
  }
}

/* --- Form Container Styling --- */
.form-container {
  background-color: $card-bg;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
  margin-left: auto; /* Center the form container */
  margin-right: auto; /* Center the form container */
  max-width: 700px; /* Limit max width for better readability */

  @media (max-width: 767px) {
    padding: 25px;
    margin-bottom: 30px;
  }
}

/* --- Form Group Styling --- */
.form-group {
  margin-bottom: 25px; // More vertical spacing between form groups

  label {
    display: block; // Ensure labels are on their own line
    margin-bottom: 8px;
    font-weight: 600; // Bold labels for clarity
    color: $dark-text;
    font-size: 1.05rem;
  }
}

/* --- Form Control (Input/Textarea) Styling --- */
.form-control {
  display: block;
  width: 100%;
  padding: 12px 15px;
  font-size: 1rem;
  line-height: 1.5;
  color: $dark-text;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid $border-color;
  border-radius: 8px; // Consistent border radius
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  -webkit-appearance: none; // Remove default browser styling for consistency

  &:focus {
    color: $dark-text;
    background-color: #fff;
    border-color: lighten($primary-solid-fallback, 20%); // Highlight on focus
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba($primary-solid-fallback, 0.25); // Subtle shadow on focus
  }

  &::placeholder {
    color: $secondary-gray; // Placeholder color
    opacity: 0.7; // Make it slightly transparent
  }
}

/* --- Custom Checkbox Styling --- */
.custom-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 15px; // Increased spacing for checkboxes
}

.custom-checkbox input[type="checkbox"] {
  flex-shrink: 0; // Prevent checkbox from shrinking
  width: 22px; // Slightly smaller for a modern look
  height: 22px; // Slightly smaller for a modern look
  accent-color: $primary-solid-fallback; // Use brand color
  margin-right: 12px;
  cursor: pointer;
  border-radius: 4px; // Slight border-radius for the checkbox itself
  border: 2px solid $border-color; // Add a border
  appearance: none; // Hide default checkbox
  -webkit-appearance: none;
  background-color: #fff;
  position: relative;
  transition: all 0.2s ease-in-out;

  &:checked {
    background-color: $primary-solid-fallback;
    border-color: $primary-solid-fallback;
  }

  &:checked::after {
    content: "\2713"; // Unicode checkmark
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    font-size: 14px; // Adjust checkmark size
    font-weight: bold;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba($primary-solid-fallback, 0.25);
  }
}

.custom-checkbox label {
  font-weight: normal; // Keep as normal as per your initial style, but ensure color
  font-size: 16px;
  cursor: pointer;
  color: $dark-text; // Ensure label color is consistent
}

/* --- Submit Button Styling --- */
.btn-primary {
  display: inline-block;
  padding: 12px 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  border-radius: 8px; // Consistent border-radius
  background-image: $primary-gradient; // Use the gradient
  background-color: $primary-solid-fallback; // Fallback for old browsers
  color: #fff;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba($primary-solid-fallback, 0.2); // Subtle shadow

  &:hover {
    background-image: linear-gradient(
      to right,
      darken(#8b184c, 5%),
      darken(#da1b60, 5%)
    ); // Slightly darker gradient on hover
    box-shadow: 0 6px 15px rgba($primary-solid-fallback, 0.3);
    transform: translateY(-2px); // Subtle lift on hover
  }

  &:active {
    background-image: linear-gradient(
      to right,
      darken(#8b184c, 10%),
      darken(#da1b60, 10%)
    );
    box-shadow: 0 2px 5px rgba($primary-solid-fallback, 0.4);
    transform: translateY(0); // Press effect
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
    box-shadow: none;
  }
}

.hidden {
  display: none;
}
</style>
