<template>
<div class="mov-container">
    <b-container class="filter-container">
            <label class="mr-sm-2" for="genres">Genre:</label>
        <b-form-select id="genres" v-model="genreSelected" :options="genreOptions" style="width: 10rem;"></b-form-select>
   <label class="mr-sm-2" for="releaseYear">Release Year:</label>
        <b-form-select id="releaseYear" v-model="yearSelected" :options="yearOptions" style="width: 10rem;"></b-form-select>
   <label class="mr-sm-2" for="title">Title:</label>
         <b-form-input
          id="title"
          v-model="title"
          type="text"
          style="width: 12rem; display: inline;"
        ></b-form-input>
    <b-button @click="clear" class="primary-btn">Clear</b-button>
    </b-container>
    <div class="div" v-if="items.length > 0">
    <b-container class="align-center">
        <b-pagination
        v-model="currentPage"
        :total-rows="filterItems.length"
        :per-page="perPage"
        ></b-pagination>
    </b-container>
    <b-container>
       <MovieCard v-for="mov in items" :key="mov.id" :movie="mov"/>
    </b-container>
    </div>
    <h3 class="align-center" v-else>No movies found.</h3>

</div>
</template>
<script>
import MovieCard from '../components/MovieCard.vue';
import { mapActions, mapState } from 'vuex';

export default {
    name: 'Movies',
    components: {
      MovieCard
    },

    data() {
      return {
        currentPage: 1,
        perPage: 5,
        items: [],
        genreSelected: null,
        genreOptions: [],
        yearSelected: null,
        yearOptions: [],
        title: "",
        filterItems: []
      }
    },

    computed: {
      ...mapState([
        'movies',
        'genres'
      ])
    },

     mounted() {
        this.fetchMovies();
        this.fetchGenres();
      
    },
     methods: {
      ...mapActions([
        'fetchMovies',
        'fetchGenres'
      ]),
      setFilterItems(){
          let newData = [...this.movies];
          if(this.genreSelected != null){
              newData = newData.filter(m => m.genre.id == this.genreSelected? m : null);
          }
          if(this.yearSelected != null){
              newData = newData.filter(m => m.releaseYear == this.yearSelected? m : null);
          }
          if(this.title != ''){
              newData = newData.filter(m => m.title.toLowerCase()
          .indexOf(this.title.toLowerCase()) !== -1
          ? m
          : null);
          }
          this.filterItems = newData;
      },
      clear: function clearInputs(){
          this.genreSelected = null;
          this.yearSelected = null;
          this.title = "";
      }
    },
      watch: {
      currentPage(nVal) {
        this.items = [];
        let end = ((nVal-1)*this.perPage + this.perPage) <= this.filterItems.length? ((nVal-1)*this.perPage + this.perPage) : this.filterItems.length;
        for(let i = (nVal-1)*this.perPage; i < end ; i++){
          this.items.push(this.filterItems[i]);
        }
      },
      filterItems(nVal){
        this.items = [];
        this.currentPage = 1;
        let end = (this.perPage <= this.filterItems.length)? this.perPage : this.filterItems.length;
        for(let i = 0; i <  end; i++){
          this.items.push(nVal[i]);
        }
      },
      movies(nVal){
          this.filterItems = nVal;
          this.yearOptions = [];
          this.yearOptions.push({value: null, text: 'All'});
          let yearSet = new Set();
          for(let movie of nVal){
              yearSet.add(movie.releaseYear);
          }
          for(let y of yearSet){
              this.yearOptions.push({value: y, text: y});
          }

      },
      genres(){
          this.genreOptions = [];
          this.genreOptions.push({value: null, text: 'All'});
          for(let genre of this.genres){
              this.genreOptions.push({value: genre.id, text: genre.name});
          }
      },
      genreSelected(){
          this.setFilterItems();
      },
      yearSelected(){
          this.setFilterItems();
      },
      title(){
          this.setFilterItems();
      }
    },
    
}
</script>
<style>

.align-center{
    display: flex;
    align-items: center;
    justify-content: center;
}

.filter-container{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
}

.primary-btn{
  color: white;
  background: black;
}

.primary-btn:hover{
  color: black;
  background: white;
}

    
</style>

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