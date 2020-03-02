<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Welcome!</h1>
      </v-flex>
    </v-layout>

    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error.message"></form-alert>
      </v-flex>
    </v-layout>
    <!-- Signup Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card color="secondary" class="elevation-12">
          <v-container>
            <v-form
              v-model="isFormValid"
              lazy-validation
              ref="form"
              @submit.prevent="handleSignUpManager"
            >
              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="firstnameRules"
                  v-model="firstname"
                  prepend-icon="face"
                  label="Firstname"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="lastnameRules"
                  v-model="lastname"
                  prepend-icon="face"
                  label="Lastname"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="gymRules"
                  v-model="gym"
                  prepend-icon="face"
                  label="Gym"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="emailRules"
                  v-model="email"
                  prepend-icon="face"
                  label="Email"
                  type="text"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="passwordRules"
                  v-model="password"
                  prepend-icon="extension"
                  label="Password"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs10 mx-5 px-5>
                <v-text-field
                  :rules="passwordRules"
                  v-model="passwordConfirmation"
                  prepend-icon="gavel"
                  label="Confirm Password"
                  type="password"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex offset-sm4>
                <v-btn
                  :loading="loading"
                  :disabled="!isFormValid || loading"
                  type="submit"
                  mx-5
                >
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                  Signup</v-btn
                >
              </v-flex>

              <v-flex xs10 offset-sm2>
                <h3>
                  Already have an account?
                </h3>
              </v-flex>
              <v-flex offset-sm5>
                <router-link to="/signin">Sign In</router-link>
              </v-flex>
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
  name: "Signup",
  data() {
    return {
      isFormValid: true,
      firstname: "",
      lastname: "",
      gym: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      emailRules: [
        email => !!email || "Email is required",
        email => /.+@.+/.test(email) || "E-mail must be valid"
      ],
      passwordRules: [
        password => !!password || "Password is required",
        password =>
          password.length >= 8 ||
          "Password length must be at least 8 characters",
        confirmation => confirmation === this.password || "Passwords must match"
      ],
      gymRules: [gym => !!gym || "Gym name is required"],
      firstnameRules: [firstname => !!firstname || "First name is required"],
      lastnameRules: [lastname => !!lastname || "Last name is required"]
    };
  },
  watch: {
    manager(value) {
      //if manager value changes, redirect to homepage
      if (value) {
        this.$router.push("/");
      }
    }
  },
  computed: {
    ...mapGetters(["loading", "error", "manager"])
  },
  methods: {
    handleSignUpManager() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("registerManager", {
          firstname: this.firstname,
          lastname: this.lastname,
          gym: this.gym,
          email: this.email,
          password: this.password
        });
      }
    }
  }
};
</script>
