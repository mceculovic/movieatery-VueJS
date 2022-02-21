<template>
    <b-container class="scontainer">
         <b-tabs content-class="mt-3" fill>
    <b-tab title="Login" active><Login/></b-tab>
    <b-tab title="Register"><Register/></b-tab>
  </b-tabs>

    </b-container>
</template>
<script>
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
export default {
    name: 'SignUp',
    components:{
        Login,
        Register
    }
}
</script>
<style scoped>
    .scontainer{
        margin-top: 10rem;
        width: 40rem;
        margin-bottom: 10rem;
    }

     @media screen and (max-width: 768px) {
      .scontainer{
          width: 15rem;
      }
     
  }
</style>