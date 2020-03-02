<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Add Student</h1>
      </v-flex>
    </v-layout>
    <!-- Add student form Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form
          v-model="isFormValid"
          lazy-validation
          ref="form"
          @submit.prevent="handleAddStudent"
        >
          <v-radio-group
            :rules="categoryRules"
            v-model="category"
            :mandatory="true"
            row
          >
            <v-radio label="Adults" value="adults"></v-radio>
            <v-radio label="Children" value="children"></v-radio>
          </v-radio-group>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                :rules="firstnameRules"
                v-model="firstname"
                prepend-icon="face"
                label="Firstname"
                type="text"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-text-field
                :rules="lastnameRules"
                v-model="lastname"
                prepend-icon="face"
                label="Lastname"
                type="text"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
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

          <v-layout row>
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
            <v-flex xs12>
              <v-text-field
                :rules="passwordRules"
                v-model="passwordConfirmation"
                prepend-icon="gavel"
                label="Confirm Password"
                type="password"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12>
              <v-row justify="center">
                <v-date-picker
                  label="subscriptionValidUntil"
                  :rules="subscriptionValidUntilRules"
                  v-model="subscriptionValidUntil"
                  landscape
                ></v-date-picker>
              </v-row>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex>
              <v-btn
                :loading="loading"
                :disabled="!isFormValid || loading"
                color="primary"
                type="submit"
              >
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                Signup</v-btn
              >
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "AddStudent",
  data() {
    return {
      isFormValid: true,
      firstname: "",
      lastname: "",
      gym: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      category: "",
      subscriptionValidUntil: "",
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
      lastnameRules: [lastname => !!lastname || "Last name is required"],
      categoryRules: [category => !!category || "Category is required"],
      subscriptionValidUntilRules: [
        subscriptionValidUntil =>
          !!subscriptionValidUntil || "A subscription limit is required"
      ]
    };
  },
  computed: {
    ...mapGetters(["loading", "error", "users", "manager"])
  },
  methods: {
    handleAddStudent() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("signupStudent", {
          firstname: this.firstname,
          lastname: this.lastname,
          gym: this.manager.gym,
          email: this.email,
          password: this.password,
          category: this.category,
          subscriptionValidUntil: new Date(this.subscriptionValidUntil)
        });
        this.$router.push("/");
      }
    }
  }
};
</script>
