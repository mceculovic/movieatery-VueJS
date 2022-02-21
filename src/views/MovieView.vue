<template>
        <div class="main-container">
        <b-container>
        <MovieCard v-if="this.movie != null" :movie="this.movie"/>
        </b-container>
        <div>
        <label class="mr-sm-2" for="cinemas">Cinema:</label>
        <b-form-select id="cinemas" v-model="cinemaSelected" :options="cinemaOptions" style="width: 10rem;"></b-form-select>
        </div>
        <b-container class="table-container">
             <b-table  @row-clicked="rowClicked" hover :items="items" :fields="fields">
            </b-table>
        </b-container>
        </div>
    
</template>
<script>
 import MovieCard from '../components/MovieCard.vue';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'MovieView',
    data() {
        return {
            movie: null,
            showtimesForMovie: [],
            items: [],
            fields: [{key: 'Theatre.name', label: 'Theatre'}, {key:'ticketPrice', sortable: true},{key:'startDate', sortable:true}, {key:'time', sortable:true}],
            cinemaSelected: null,
            cinemaOptions: [],
            filterItems: [],
        }
    },
    components: {
         MovieCard
    },
    computed: {
        ...mapState([
        'showtimes',
      ])
    },
     async mounted() {
        const res = await this.fetchMovie(this.$route.params.id);
        if(res.msg){
            this.$router.push({name: 'NotFound'});
            return;
        }
        this.movie = res;
        this.fetchShowtimes();
        
    },
    watch: {
       showtimes(nVal){
           this.showtimesForMovie = nVal.filter(s => s.movieId == this.movie.id);
       },
       showtimesForMovie(nVal){
           this.filterItems = nVal;
           this.cinemaOptions = [];
           this.cinemaOptions.push({value: null, text:"All"});
           for(let i of this.filterItems){
                if(!this.cinemaOptions.find(c => c.value == i.Theatre.id))
                    this.cinemaOptions.push({value: i.Theatre.id, text: i.Theatre.name});
           }
       },
       filterItems(nVal){
           this.items = nVal;
       },
       cinemaSelected(nVal){
           if(nVal == null){
               this.filterItems = this.showtimesForMovie;
               return;
           }
           let data = this.showtimesForMovie;
           data = data.filter(d => d.Theatre.id == nVal);
           this.filterItems = data;
       },
      
    },
    methods: {
          ...mapActions([
        'fetchMovie','fetchShowtimes'
      ]),
      rowClicked(record){
        this.$router.push({ name: 'Showtime', params: { id: record.id } });
      }
    },
}
</script>
<style scoped>

.main-container{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 5rem;
    flex-direction: column;
}

.table-container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1rem;
}

table >>> tbody tr :hover {
  cursor: pointer;
}

 @media screen and (max-width: 768px) {
      .table-container{
          font-size: 0.6rem;

      }
     
  }

</style>