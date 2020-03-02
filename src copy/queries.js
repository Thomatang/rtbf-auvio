import { gql } from "apollo-boost";

//  USER Queries
export const GET_USERS = gql`
  query($gym: String!) {
    getStudents(gym: $gym) {
      _id
      firstname
      lastname
      gym
      email
      avatar
      category
      subscriptionValidUntil
      checkInStatus
    }
  }
`;

export const GET_STUDENTS_BY_CATEGORY = gql`
  query($classCategory: String, $gym: String) {
    getStudentsByCategory(classCategory: $classCategory, gym: $gym) {
      _id
      firstname
      lastname
      gym
      email
      avatar
      category
      subscriptionValidUntil
      checkInStatus
      classesAttended {
        _id
      }
    }
  }
`;

export const GET_STUDENT_BY_ID = gql`
  query($studentId: String) {
    getStudentById(studentId: $studentId) {
      _id
      firstname
      lastname
      gym
      email
      avatar
      category
      subscriptionValidUntil
      checkInStatus
    }
  }
`;

export const INFINITE_SCROLL_STUDENTS = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollStudents(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      students {
        _id
        firstname
        lastname
        gym
        email
        avatar
        category
      }
    }
  }
`;

// MANAGER QUERIES
export const GET_CURRENT_MANAGER = gql`
  query {
    getCurrentManager {
      _id
      firstname
      lastname
      email
      password
      avatar
      joinDate
      gym
    }
  }
`;

// CLASS Queries
export const INFINITE_SCROLL_CLASSES = gql`
  query($pageNum: Int!, $pageSize: Int!) {
    infiniteScrollClasses(pageNum: $pageNum, pageSize: $pageSize) {
      hasMore
      classes {
        classDate
        startTime
        endTime
        _id
        category
        attendees {
          _id
        }
      }
    }
  }
`;

export const GET_CLASSES = gql`
  query($gym: String!) {
    getClasses(gym: $gym) {
      classDate
      startTime
      endTime
      _id
      gym
      category
      attendees {
        _id
      }
    }
  }
`;

export const GET_CLASSROOM = gql`
  query($classId: ID!) {
    getClassroom(classId: $classId) {
      _id
      classDate
      startTime
      endTime
      category
      attendees {
        _id
      }
    }
  }
`;
// CLASS Mutation
export const ADD_CLASS = gql`
  mutation(
    $classDate: String!
    $startTime: String!
    $endTime: String!
    $category: String!
    $gym: String!
  ) {
    addClass(
      classDate: $classDate
      startTime: $startTime
      endTime: $endTime
      category: $category
      gym: $gym
    ) {
      classDate
      startTime
      endTime
      _id
      category
      gym
    }
  }
`;

export const ADD_CLASSROOM_ATTENDEE = gql`
  mutation($classId: ID!, $studentId: ID!, $studentCheckInStatus: String!) {
    addClassroomAttendee(
      classId: $classId
      studentId: $studentId
      studentCheckInStatus: $studentCheckInStatus
    ) {
      attendees {
        _id
        firstname
        lastname
        email
      }
      classesAttended {
        _id
        classDate
      }
    }
  }
`;

export const REMOVE_CLASSROOM_ATTENDEE = gql`
  mutation($classId: ID!, $studentId: ID!, $studentCheckInStatus: String!) {
    removeClassroomAttendee(
      classId: $classId
      studentId: $studentId
      studentCheckInStatus: $studentCheckInStatus
    ) {
      attendees {
        _id
        firstname
        lastname
        email
      }
      classesAttended {
        _id
        classDate
      }
    }
  }
`;

//USER Mutation
export const SIGNUP_USER = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $gym: String!
    $category: String
    $subscriptionValidUntil: String
  ) {
    signupStudent(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      gym: $gym
      category: $category
      subscriptionValidUntil: $subscriptionValidUntil
    ) {
      _id
      firstname
      lastname
      email
      gym
      category
      subscriptionValidUntil
    }
  }
`;

//MANAGER Mutations
export const REGISTER_MANAGER = gql`
  mutation(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
    $gym: String!
  ) {
    registerManager(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
      gym: $gym
    ) {
      token
    }
  }
`;

export const SIGNIN_MANAGER = gql`
  mutation($email: String!, $password: String!) {
    signinManager(email: $email, password: $password) {
      token
    }
  }
`;
