<template>
  <v-container fluid>
    <v-container fluid>
      <h1>CLASS Date & Time:</h1>
      <p>
        {{ classroom.classDate | momentDate }} at
        {{ classroom.startTime | momentTime }}
        {{ manager.gym }}
        {{ this.classId }}
      </p>
    </v-container>
    <v-container fluid>
      <h2>CLASS Category:</h2>
      <p>{{ this.classCategory }}</p>
    </v-container>
    <v-container fluid>
      <h1>Student List</h1>
      <v-layout class="d-flex flex-column" v-if="studentsByCategory">
        <v-flex v-for="student in studentsByCategory" :key="student._id">
          <v-card
            class="d-flex flex-row justify-space-between align-center"
            hover
          >
            <v-avatar class="ml-3">
              <img :src="student.avatar" alt="student.avatar" />
            </v-avatar>
            <v-card-title class="d-flex mr-12 pr-12" primary>
              <div class="headline">
                {{ student.firstname }}
              </div>
              <div class="ml-3">
                {{ student.lastname }}
              </div>
            </v-card-title>
            <v-card-actions xs12>
              <v-btn
                v-on:click="
                  handleCheckinStudentIntoClass(
                    classroom.classDate,
                    student.subscriptionValidUntil,
                    student._id
                  )
                "
                v-if="isCheckedIn(student.classesAttended) === false"
                color="primary"
              >
                CHECK-IN
              </v-btn>
              <v-btn
                v-else
                v-on:click="handleCheckoutStudentFromClass(student._id)"
                color="secondary"
                >Check-Out
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-layout v-if="error" row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <form-alert :message="error"></form-alert>
      </v-flex>
    </v-layout>
    <v-snackbar
      v-model="checkInSnackbar"
      color="success"
      :timeout="5000"
      bottom
      left
    >
      <v-icon class="mr-3">
        check_circle
      </v-icon>
      <h3>You are now checked in!</h3>
      <v-btn dark text @click="checkInSnackbar = false">Close</v-btn>
    </v-snackbar>
    <!-- Error Snackbar-->
    <v-snackbar
      v-if="checkInError"
      v-model="checkInErrorSnackbar"
      color="info"
      :timeout="5000"
      bottom
      left
    >
      <v-icon class="mr-3">
        cancel
      </v-icon>
      <h3>{{ checkInError }}</h3>
    </v-snackbar>
  </v-container>
</template>
<script>
import { mapGetters } from "vuex";
import moment from "moment";
import {
  ADD_CLASSROOM_ATTENDEE,
  GET_STUDENTS_BY_CATEGORY,
  REMOVE_CLASSROOM_ATTENDEE
} from "../../queries";

export default {
  name: "Class",
  data: () => ({
    checkInSnackbar: false,
    checkInErrorSnackbar: false
  }),
  watch: {
    checkInError(value) {
      if (value !== null) {
        this.checkInErrorSnackbar = true;
      }
    },
    checkInSuccess(value) {
      if (value !== null) {
        this.checkInSnackbar = true;
      }
    }
  },
  props: ["classId", "classCategory"],
  computed: {
    ...mapGetters([
      "loading",
      "error",
      "studentsByCategory",
      "classroom",
      "checkInError",
      "checkInSuccess",
      "manager"
    ])
  },
  created() {
    this.handleGetStudentsByCategory();
    this.handleGetClassRoom();
  },
  methods: {
    checkIfStudentCheckedIn(studentId) {
      //check if classroom attendance includes student with id
      if (
        this.classroom &&
        this.classroom.attendees.some(attendee => attendee._id === studentId)
      ) {
        this.studentAttendance.push(studentId);
        return true;
      } else {
        return false;
      }
    },
    handleGetClassRoom() {
      this.$store.dispatch("getClassroom", {
        classId: this.classId
      });
    },
    handleGetStudentsByCategory() {
      this.$store.dispatch("getStudentsByCategory", {
        classCategory: this.classCategory,
        gym: this.manager.gym
      });
    },
    handleCheckinStudentIntoClass(
      classDate,
      studentSubscriptionValidityLimit,
      studentId
    ) {
      const formattedClassDate = moment(classDate).format("MM-DD-YYYY");
      const formattedValidityLimit = moment(
        studentSubscriptionValidityLimit
      ).format("MM-DD-YYYY");
      console.log("CLASS DATE: ", formattedClassDate);
      console.log(
        "STUDENT SUBSCRIPTION VALID UNTIL: ",
        studentSubscriptionValidityLimit
      );

      if (moment(formattedClassDate) - moment(formattedValidityLimit) > 0) {
        this.$store.dispatch("displayCheckInError", "INVALID SUBSCRIPTION");
      } else {
        const variables = {
          classId: this.classId,
          studentId: studentId,
          studentCheckInStatus: "checked-in"
        };
        this.$apollo
          .mutate({
            mutation: ADD_CLASSROOM_ATTENDEE,
            variables,
            // eslint-disable-next-line no-unused-vars
            update: cache => {
              const data = cache.readQuery({
                query: GET_STUDENTS_BY_CATEGORY,
                variables: {
                  classCategory: this.classCategory,
                  gym: this.manager.gym
                }
              });
              data.getStudentsByCategory.map(student => {
                if (!student.classesAttended.includes(this.classId)) {
                  student.classesAttended.push(this.classId);
                  cache.writeQuery({
                    query: GET_STUDENTS_BY_CATEGORY,
                    variables: {
                      classCategory: this.classCategory,
                      gym: this.manager.gym
                    },
                    data
                  });
                }
              });
            }
          })
          .then(({ data }) => {
            this.$store.dispatch("getStudentsByCategory", {
              classCategory: this.classCategory,
              gym: this.manager.gym
            });
            //update classroom in state with new attendees
            const updatedClassroom = {
              ...this.classroom,
              attendees: data.addClassroomAttendee.attendees
            };
            this.$store.commit("setClassroom", updatedClassroom);
            this.$store.dispatch(
              "displayCheckInSuccess",
              "YOU ARE NOW CHECKED-IN"
            );
            return data;
          })
          // eslint-disable-next-line no-console
          .catch(err => console.error(err));
      }
    },
    handleCheckoutStudentFromClass(studentId) {
      const variables = {
        classId: this.classId,
        studentId: studentId,
        studentCheckInStatus: "checked-out"
      };
      this.$apollo
        .mutate({
          mutation: REMOVE_CLASSROOM_ATTENDEE,
          variables,
          // eslint-disable-next-line no-unused-vars
          update: (cache, { data: { removeClassroomAttendee } }) => {
            const data = cache.readQuery({
              query: GET_STUDENTS_BY_CATEGORY,
              variables: {
                classCategory: this.classCategory,
                gym: this.manager.gym
              }
            });
            data.getStudentsByCategory.map(student => {
              student.classesAttended.map(classAttended => {
                if (classAttended._id === this.classId) {
                  student.classesAttended.pop(classAttended);
                  cache.writeQuery({
                    query: GET_STUDENTS_BY_CATEGORY,
                    variables: {
                      classCategory: this.classCategory,
                      gym: this.manager.gym
                    },
                    data
                  });
                }
              });
            });
          }
        })
        .then(({ data }) => {
          //update student in state with new classesAttended
          this.$store.dispatch("getStudentsByCategory", {
            classCategory: this.classCategory,
            gym: this.manager.gym
          });
          //update classroom in state with new attendees
          const updatedClassroom = {
            ...this.classroom,
            attendees: data.removeClassroomAttendee.attendees
          };
          this.$store.commit("setClassroom", updatedClassroom);
          this.$store.dispatch(
            "displayCheckInSuccess",
            "YOU ARE NOW CHECKED-OUT"
          );
          return data;
        })
        // eslint-disable-next-line no-console
        .catch(err => console.error(err));
    },
    isCheckedIn: function(classesAttended) {
      let result = false;
      if (classesAttended === null) {
        return result;
      }
      classesAttended.map(classAttended => {
        if (classAttended._id === this.classId) {
          result = true;
        }
      });
      return result;
    }
  },
  filters: {
    momentDate: function(date) {
      return moment(date).format("MMMM Do YYYY");
    },
    momentTime: function(date) {
      return moment(date).format("h:mm");
    }
  }
};
</script>
