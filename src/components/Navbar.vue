<template >
  <div>
  <b-navbar class="navbar-color" toggleable="lg" type="dark" >
    <b-navbar-brand class="logo" to='/'>Movieatery</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to='/'>Home</b-nav-item>
        <b-nav-item to='/movies'>Movies</b-nav-item>
        <b-nav-item to='/cinemas'>Cinemas</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to='/signup' right v-if="user == null">Login</b-nav-item>
        <b-nav-item-dropdown right v-else>
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item to="/profile" v-if="user != null">Profile</b-dropdown-item>
          <b-dropdown-item @click="handleOnSignOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
    name: "Navbar",
     computed: {
  ...mapState([
    'user'
    ])
  },
  methods: {
    ...mapActions([
            'signOut'
        ]),
    handleOnSignOut(){
        this.signOut();
        this.$router.push({name: 'Home'});
    }
  }
}
</script>
<style scoped>

    .logo {
      font-family: 'Abril Fatface', cursive;
      font-size: 18px;
    }

    .navbar-color{
      background: black;
      color: white;
    }
</style>