<template>
  <div class="wrapper container">
    <header class="page-header">
      <br />
      <h1>Sign up for weekly activities</h1>
    </header>
    <div class="row">
      <div class="col-md-8" style="margin-bottom: 40px">
        <form
          name="activity-signup"
          action="/thanks"
          method="post"
          netlify
          netlify-honeypot="bot-field"
        >
          <input type="hidden" name="form-name" value="activity-signup" />

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
              type="text"
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
              type="text"
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
              type="text"
              class="form-control"
              name="message"
              id="message"
              placeholder="Any extra info"
              aria-describedby="message"
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
};
</script>

<style lang="scss" scoped>
.custom-checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.custom-checkbox input[type="checkbox"] {
  width: 24px;
  height: 24px;
  accent-color: #8c3a99; /* purple-ish; adjust to match your brand */
  margin-right: 12px;
  cursor: pointer;
  transform: scale(1.1);
}

.custom-checkbox label {
  font-weight: normal;
  font-size: 16px;
  cursor: pointer;
}
</style>
