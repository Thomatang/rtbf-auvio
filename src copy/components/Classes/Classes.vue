<template>
  <v-container fluid grid-list-xl text-xs-center v-if="classes">
    <v-layout row wrap v-if="classes">
      <v-flex xs12 v-for="classroom in classes" :key="classroom._id">
        <v-card hover>
          <v-card-actions>
            <v-card-title primary>
              <div>
                <div class="headline">
                  {{ formattedTime(classroom.startTime) }}
                </div>
                <div>{{ classroom.category }}</div>
              </div>
            </v-card-title>
            <v-btn
              @click="goToClassroom(classroom._id, classroom.category)"
              class="ma-2"
              outlined
              color="primary"
            >
              Attendance</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <v-card-text style="height: 100px; position: relative">
      <v-btn to="/addclass" class="mt-12" fixed dark fab top right color="pink">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-card-text>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
export default {
  name: "Classes",
  created() {
    this.handleGetClassesList();
  },
  computed: {
    ...mapGetters(["loading", "classes", "manager"])
  },
  methods: {
    handleGetClassesList() {
      this.$store.dispatch("getClasses", { gym: this.manager.gym });
    },
    formattedTime: function(time) {
      return moment(time, "LLLL").format("lll");
    },
    goToClassroom(classId, classCategory) {
      this.$router.push(`/classes/${classCategory}/${classId}`);
    }
  }
};
</script>
