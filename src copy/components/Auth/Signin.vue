<template>
  <v-container class="fill-height" fluid text-xs-center>
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- Signin Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="elevation-12">
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSigninManager"
              align="center"
              justify="center"
            >
              <v-layout row mx-5 px-5>
                <v-flex xs12>
                  <v-text-field
                    :rules="emailRules"
                    v-model="email"
                    prepend-icon="face"
                    label="Email"
                    type="text"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row mx-5 px-5>
                <v-flex xs12>
                  <v-text-field
                    :rules="passwordRules"
                    v-model="password"
                    prepend-icon="extension"
                    label="Password"
                    type="password"
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
                <v-flex>
                  <v-btn
                    color="primary"
                    :loading="loading"
                    :disabled="!isFormValid || loading"
                    type="submit"
                  >
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Signin</v-btn
                  >
                  <h3>
                    Don't have an account?
                    <router-link to="/signup">Signup</router-link>
                  </h3>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Signin",
  data() {
    return {
      isFormValid: true,
      email: "",
      password: "",
      emailRules: [
        email => !!email || "Email is required",
        email => /.+@.+/.test(email) || "E-mail must be valid"
      ],
      passwordRules: [password => !!password || "Password is required"]
    };
  },
  computed: {
    ...mapGetters(["loading", "error", "manager"])
  },
  watch: {
    manager(value) {
      //if manager value changes, redirect to homepage
      if (value) {
        this.$router.push("/");
      }
    }
  },
  methods: {
    handleSigninManager() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signinManager", {
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
