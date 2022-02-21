<template>
    <div>
    <b-container class="filter-container">
   <label class="mr-sm-2" for="cinema">Cinema:</label>
         <b-form-input
          id="cinema"
          v-model="cinema"
          type="text"
          style="width: 12rem; display: inline;"
        ></b-form-input>
        <label class="mr-sm-2" for="city">City:</label>
         <b-form-input
          id="city"
          v-model="city"
          type="text"
          style="width: 12rem; display: inline;"
        ></b-form-input>
        <label class="mr-sm-2" for="street">Street:</label>
         <b-form-input
          id="street"
          v-model="street"
          type="text"
          style="width: 12rem; display: inline;"
        ></b-form-input>
        <b-button @click="clear" class="primary-btn">Clear</b-button>
    </b-container>
    <div v-if="items.length > 0">
    <b-container>
       <CinemaCard v-for="cin in items" :key="cin.id" :cinema="cin"/>
    </b-container>
    </div>
    <h3 class="align-center" v-else>No cinemas found.</h3>

</div>
</template>
<script>
import CinemaCard from '../components/CinemaCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Cinemas',
    data(){
        return {
            items: [],
            cinema: "",
            city: "",
            street: ""
        }
    },
    components:{
        CinemaCard
    },
     computed: {
      ...mapState([
        'cinemas',
        
      ])
    },

     mounted() {
        this.fetchCinemas();
    },
     methods: {
      ...mapActions([
        'fetchCinemas'
      ]),
      filterCinemas(){
          let newData = [...this.cinemas];
          if(this.cinema != ''){
              newData = newData.filter(m => m.name.toLowerCase().indexOf(this.cinema.toLowerCase()) !== -1 ? m : null);
          }
          if(this.city != ''){
              newData = newData.filter(m => m.city.toLowerCase().indexOf(this.city.toLowerCase()) !== -1 ? m : null);
          }
          if(this.street != ''){
              newData = newData.filter(m => m.street.toLowerCase().indexOf(this.street.toLowerCase()) !== -1 ? m : null);
          }
          this.items = newData;
      },
      clear: function clearInputs(){
          this.cinema = "";
          this.city = "";
          this.street = "";
      }
     },
     watch: {
         cinemas(nVal){
             this.items = nVal;
         },
         cinema(){
             this.filterCinemas();
         },
         city(){
             this.filterCinemas();
         },
         street(){
             this.filterCinemas();
         }
     }
}
</script>

<style scoped>
   .primary-btn{
  color: white;
  background: black;
}

.primary-btn:hover{
  color: black;
  background: white;
}

 @media screen and (max-width: 768px) {
      .filter-container{
          flex-direction: column;
          gap: 5px;
      }
     
  }
</style>