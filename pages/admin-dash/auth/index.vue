<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 login-form-1">
        <h3>Login</h3>
        <form @submit.prevent="">
          <div class="form-group">
            <input
              v-model="email"
              type="text"
              class="form-control"
              placeholder="Your Email *"
              autocomplete="username"
              required
            />
          </div>
          <div class="form-group">
            <input
              class="form-control"
              v-model="password"
              type="password"
              placeholder="Your Password *"
              autocomplete="password"
              required
            />
          </div>
          <div class="form-group">
            <button class="btn btn-primary" @click="login">Login</button>
          </div>
          <div v-if="errorMessage" color="error">
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    password: "",
    email: "",
    errorMessage: "",
  }),
  methods: {
    login() {
      if (this.email && this.password) {
        this.$fire.auth
          .signInWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // const authUser = {
            //   uid: userCredential.user.uid,
            //   email: userCredential.user.email,
            // };
            this.$router.replace("/admin-dash");
          })
          .catch((error) => {
            console.log("Login error", error);
            this.errorMessage = error.message;
          });
      }
    },
  },
};
</script>