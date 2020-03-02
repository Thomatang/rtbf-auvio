<template>
  <v-app id="inspire">
    <v-navigation-drawer fixed v-model="drawer" app>
      <v-list>
        <router-link v-bind:to="{ name: 'Home' }" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icons">mdi-home</v-icon>
            </v-list-item-action>
            <v-list-item-content>Home</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name: 'Classes' }" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icons">mdi-google-classroom</v-icon>
            </v-list-item-action>
            <v-list-item-content>Classroom</v-list-item-content>
          </v-list-item>
        </router-link>
        <router-link v-bind:to="{ name: 'Students' }" class="side_bar_link">
          <v-list-item link>
            <v-list-item-action>
              <v-icon class="icons">mdi-account-badge-horizontal</v-icon>
            </v-list-item-action>
            <v-list-item-content>Students</v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app>
      <v-toolbar fixed dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link
            v-bind:to="{ name: 'Home' }"
            tag="span"
            style="cursor: pointer"
          >
            Icono<span class="logoMark">.</span>
          </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- Horizontal Navbar Links -->
        <v-toolbar-items>
          <v-btn
            text
            v-for="item in horizontalNavItems"
            :key="item.title"
            :to="item.link"
          >
            <v-icon class="icons" left>{{ item.icon }}</v-icon>
            <div class="hidden-xs-only">
              {{ item.title }}
            </div>
          </v-btn>
          <v-btn text v-if="manager" @click="handleSignoutManager">
            <v-icon class="icons">exit_to_app</v-icon>
            Signout
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <div id="app">
          <router-view />
        </div>
        <v-snackbar
          v-model="authSnackbar"
          color="success"
          :timeout="5000"
          bottom
          left
        >
          <v-icon class="mr-3">
            check_circle
          </v-icon>
          <h3>You are now signed in!</h3>
          <v-btn dark text @click="authSnackbar = false">Close</v-btn>
        </v-snackbar>
        <!--Auth Error Snackbar-->
        <v-snackbar
          v-if="authError"
          v-model="authErrorSnackbar"
          color="info"
          :timeout="5000"
          bottom
          left
        >
          <v-icon class="mr-3">
            cancel
          </v-icon>
          <h3>{{ authError.message }}</h3>
          <v-btn dark text to="/signin">SIGN IN</v-btn>
        </v-snackbar>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "App",
  watch: {
    manager(newValue, oldValue) {
      if (oldValue === null) {
        this.authSnackbar = true;
      }
    },
    authError(value) {
      if (value !== null) {
        this.authErrorSnackbar = true;
      }
    }
  },
  computed: {
    ...mapGetters(["authError", "manager"]),
    horizontalNavItems() {
      let items = [
        { icon: "lock_open", title: "Sign In", link: "/signin" },
        { icon: "create", title: "Sign Up", link: "/signup" }
      ];
      if (this.manager) {
        items = [
          {
            icon: "mdi-account-badge-horizontal",
            title: "Students",
            link: "/Students"
          }
        ];
      }
      return items;
    }
  },
  methods: {
    handleSignoutManager() {
      this.$store.dispatch("signoutManager");
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
    this.$vuetify.theme.themes.dark.primary = "#e91d63";
  },
  data: () => ({
    drawer: null,
    authSnackbar: false,
    authErrorSnackbar: false
  })
};
</script>
<style>
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px; /* Preferred icon size */
  display: inline-block;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;

  /* Support for all WebKit browsers. */
  -webkit-font-smoothing: antialiased;
  /* Support for Safari and Chrome. */
  text-rendering: optimizeLegibility;

  /* Support for Firefox. */
  -moz-osx-font-smoothing: grayscale;

  /* Support for IE. */
  font-feature-settings: "liga";
}

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

.icons {
  background: -moz-linear-gradient(top, #e91d63 0%, #a742c6 100%);
  background: -webkit-linear-gradient(top, #e91d63 0%, #a742c6 100%);
  background: linear-gradient(to bottom, #e91d63 0%, #a742c6 100%);
  -webkit-background-clip: text;
  -moz-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

a {
  text-decoration: none;
}
</style>
