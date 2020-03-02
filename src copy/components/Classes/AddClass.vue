<template>
  <v-container text-xs-center mt-5 pt-5>
    <!-- Signup Title -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h1>Add Class in manager's gym {{ this.manager.gym }}</h1>
      </v-flex>
    </v-layout>
    <!-- Add student form Form -->
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-form
          v-model="isFormValid"
          lazy-validation
          ref="form"
          @submit.prevent="handleAddClass"
        >
          <v-radio-group
            v-model="category"
            :mandatory="true"
            :rules="categoryRules"
          >
            <v-radio label="Adults" value="adults"></v-radio>
            <v-radio label="Children" value="children"></v-radio>
          </v-radio-group>

          <v-layout row>
            <v-flex xs12>
              <v-row justify="center">
                <v-date-picker
                  label="classDate"
                  :rules="classDateRules"
                  v-model="classDate"
                ></v-date-picker>
              </v-row>
            </v-flex>
          </v-layout>

          <v-layout row xs12 class="mb-5">
            <v-flex xs4>
              <h4>Choose a start time</h4>
              <v-row>
                <v-time-picker
                  landscape
                  label="startTime"
                  :rules="timeRules"
                  v-model="startTime"
                ></v-time-picker>
              </v-row>
            </v-flex>
          </v-layout>
          <v-layout row xs12 class="mb-5">
            <v-flex xs4 class="ml-1">
              <h4>Choose an end time</h4>
              <v-row>
                <v-time-picker
                  landscape
                  label="endTime"
                  :rules="timeRules"
                  v-model="endTime"
                ></v-time-picker>
              </v-row>
            </v-flex>
          </v-layout>

          <v-layout row class="mb-2">
            <v-flex>
              <v-btn
                :loading="loading"
                :disabled="!isFormValid || loading"
                type="submit"
                color="primary"
              >
                <span slot="loader" class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
                Add Class</v-btn
              >
            </v-flex>
          </v-layout>
          <v-layout row> </v-layout>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "AddClass",
  data() {
    return {
      isFormValid: true,
      classDate: "",
      startTime: new Date(),
      endTime: new Date(),
      category: "",
      categoryRules: [category => !!category || "Category is required"],
      classDateRules: [classDate => !!classDate || "Class Date is required"],
      timeRules: [time => !!time || "start and end time are required"]
    };
  },
  computed: {
    ...mapGetters(["loading", "error", "users", "manager", "classes"]),
    submittableStartDateTime() {
      const startDateTime =
        this.classDate !== "" ? new Date(this.classDate) : new Date();
      if (typeof this.startTime === "string") {
        const hours = this.startTime.match(/^(\d+)/)[1];
        const minutes = this.startTime.match(/:(\d+)/)[1];
        startDateTime.setHours(hours);
        startDateTime.setMinutes(minutes);
      } else {
        startDateTime.setHours(this.startTime.getHours());
        startDateTime.setMinutes(this.startTime.getMinutes());
      }
      return startDateTime;
    },
    submittableEndDateTime() {
      const endDateTime =
        this.classDate !== "" ? new Date(this.classDate) : new Date();
      if (typeof this.endTime === "string") {
        const hours = this.endTime.match(/^(\d+)/)[1];
        const minutes = this.endTime.match(/:(\d+)/)[1];
        endDateTime.setHours(hours);
        endDateTime.setMinutes(minutes);
      } else {
        endDateTime.setHours(this.endTime.getHours());
        endDateTime.setMinutes(this.endTime.getMinutes());
      }
      return endDateTime;
    }
  },
  methods: {
    handleAddClass() {
      if (this.$refs.form.validate()) {
        this.$store.dispatch("addClass", {
          classDate: new Date(this.classDate),
          startTime: this.submittableStartDateTime,
          endTime: this.submittableEndDateTime,
          category: this.category,
          gym: this.manager.gym
        });
        this.$router.push("/");
      }
    }
  }
};
</script>
