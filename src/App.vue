<template>
  <div id="app">
    <Toasts></Toasts>
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

export default {
  components: { Navbar, Footer },
  name: 'App',
  methods: {
    ...mapActions([
            'getUser'
        ]),
  },
  mounted() {
    this.getUser();
  },
 
}
</script>


<style>
    @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');
    #app{
     font-family: 'Open Sans', sans-serif;
     height: 100%;
    min-height: 100vh;
    }
    html, body{
      min-height: 100vh;
    }

    .cursor{
      cursor: pointer;
    }

    .primary-btn{
      color: white;
      background: black;
    } 

    .primary-btn:hover{
      color: black;
      background: white;
    }

    @media screen and (max-width: 768px) {
        #app{
          font-size: 15px;
        }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px){
          #app{
          font-size: 17px;
          }
    }
     @media screen and (min-width: 1025px){
          #app{
          font-size: 19px;
        }
    }
   
</style>
