<template>
  <v-container>
    <h1>Student Profile Page</h1>
    <v-card hover v-if="handleGetStudentById">
      <v-card-actions>
        <v-avatar>
          <img :src="studentById.avatar" alt="studentById.avatar" />
        </v-avatar>
        <v-card-title primary>
          <div>
            <div class="headline">
              {{ studentById.firstname }} {{ studentById.lastname }}
            </div>
            <span class="grey--text"
              >Classes Attended: {{ studentById.classesAttended }}</span
            >
          </div>
        </v-card-title>
      </v-card-actions>
      <v-btn class="ma-2" outlined color="primary"> UNSUBSCRIBE</v-btn>
    </v-card>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Student",
  props: ["studentId"],
  computed: {
    ...mapGetters(["loading", "error", "studentById"])
  },
  created() {
    this.handleGetStudentById();
  },
  methods: {
    handleGetStudentById() {
      this.$store.dispatch("getStudentById", {
        studentId: this.studentId
      });
    }
  }
};
</script>
