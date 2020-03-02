<template>
  <v-container>
    <h1>Welcome to Icono <span class="logoMark">.</span></h1>
    <h2>Icono current features:</h2>
    <v-layout row>
      <ul>
        <li>Register new students</li>
        <li>Create classes and dynamically track attendance</li>
      </ul>
    </v-layout>
    <h2>Upcoming features</h2>
    <v-layout row>
      <ul>
        <li>Manager Dashboard</li>
      </ul>
    </v-layout>
    <v-layout row>
      <v-dialog v-model="loading" persistent fullscreen>
        <v-container fill-height>
          <v-layout row justify-center align-center>
            <v-progress-circular
              indeterminate
              :size="70"
              :width="7"
              color="primary"
            >
            </v-progress-circular>
          </v-layout>
        </v-container>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapGetters(["loading", "users"])
  }
};
</script>
<style>
.logoMark {
  background: -moz-linear-gradient(top, #e91d63 0%, #a742c6 100%);
  background: -webkit-linear-gradient(top, #e91d63 0%, #a742c6 100%);
  background: linear-gradient(to bottom, #e91d63 0%, #a742c6 100%);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 30px;
}
</style>
