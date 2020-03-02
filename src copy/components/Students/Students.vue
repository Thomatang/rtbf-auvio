<template>
  <v-container fluid grid-list-xl text-xs-center v-if="students">
    <v-layout row wrap v-if="students">
      <v-flex xs12 v-for="student in students" :key="student._id">
        <v-card hover>
          <v-card-actions>
            <v-avatar>
              <img :src="student.avatar" alt="student.avatar" />
            </v-avatar>
            <v-card-title primary>
              <div>
                <div class="headline">{{ student.lastname }}</div>
                <span class="grey--text">{{ student.classesAttended }}</span>
              </div>
            </v-card-title>
            <v-btn
              @click="goToStudentProfile(student._id)"
              class="ma-2"
              outlined
              color="primary"
            >
              Profile</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card-text style="height: 100px; position: relative">
      <v-btn
        to="/addstudent"
        class="mt-12"
        fixed
        dark
        fab
        top
        right
        color="pink"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "Students",
  computed: {
    ...mapGetters(["students", "manager"])
  },
  created() {
    this.handleGetStudents();
  },
  methods: {
    handleGetStudents() {
      this.$store.dispatch("getStudents", {
        gym: this.manager.gym
      });
    },
    goToStudentProfile(studentId) {
      this.$router.push(`/Students/${studentId}`);
    }
  }
};
</script>
