<template>
  <div class="wrapper container">
    <header class="page-header">
      <h1>Login</h1>
    </header>

    <div class="row">
      <div class="col-md-6 login-form-1">
        <h3>Enter your details</h3>
        <p>Speak to Haresh if you don't have login.</p>
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
          <p>OR</p>
          <div class="form-group">
            <button class="btn btn-primary" @click="loginWithGoogle">
              Login with Google
            </button>
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
            this.$router.replace("/admin-dash");
          })
          .catch((error) => {
            console.log("Login error", error);
            this.errorMessage = error.message;
          });
      }
    },
    loginWithGoogle() {
      const provider = new this.$fireModule.auth.GoogleAuthProvider();
      this.$fire.auth
        .signInWithPopup(provider)
        .then((result) => {
          // store the user ore wathever
          this.$router.replace("/admin-dash");
        })
        .catch((error) => {
          console.log("Login error", error);
          this.errorMessage = error.message;
        });
    },
  },
};
</script>
