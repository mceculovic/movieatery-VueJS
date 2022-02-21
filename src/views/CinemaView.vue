<template>
    <div class="c-container">
        <b-container>
    <CinemaCard v-if="cinema != null" :cinema="cinema"/>
        </b-container>
        <b-container v-if="filteredItems.length > 0">
            <div align="center" style="padding: 1rem;">
                <label class="mr-sm-2" for="movie">Movie:</label>
         <b-form-input
          id="movie"
          v-model="movie"
          type="text"
          style="width: 12rem; display: inline;"
        ></b-form-input>
            </div>
            <b-pagination
        v-model="currentPage"
        :total-rows="filteredItems.length"
        :per-page="perPage"
        align = "center"
        ></b-pagination>
            <b-table @row-clicked="rowClicked" hover :items="items" :fields="fields">
            </b-table>
        </b-container>
    </div>
</template>
<script>
import CinemaCard from '../components/CinemaCard.vue';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'CinemaView',
    components: {
        CinemaCard
    },
     data() {
        return {
            cinema: null,
            fields: [{key:'Movie.title', label:'Movie'}, {key:'ticketPrice', sortable: true},{key:'startDate', sortable:true}, {key:'time', sortable:true}],
            items: [],
            filteredItems: [],
            currentPage: 1,
            perPage: 10,
            movie: ''
        }
    },
      async mounted() {
        const res = await this.fetchCinema(this.$route.params.id);
        if(res.msg){
            this.$router.push({name: 'NotFound'});
            return;
        }
        this.cinema = res;
        this.fetchShowtimes();
        
    },
     computed: {
        ...mapState([
        'showtimes',
      ])
    },
    watch: {
        showtimes(nVal){
            this.filteredItems = nVal;
        },
        filteredItems(nVal){
            this.items = [];
            this.currentPage = 1;
            let end = (this.perPage <= this.filteredItems.length)? this.perPage : this.filteredItems.length;
            for(let i = 0; i <  end; i++){
            this.items.push(nVal[i]);
            }     
        },
        currentPage(nVal) {
            this.items = [];
            let end = ((nVal-1)*this.perPage + this.perPage) <= this.filteredItems.length? ((nVal-1)*this.perPage + this.perPage) : this.filteredItems.length;
            for(let i = (nVal-1)*this.perPage; i < end ; i++){
            this.items.push(this.filteredItems[i]);
            }
        },
        movie(nVal){
            let newData = this.showtimes;
               if(nVal != ''){
              newData = newData.filter(m => m.Movie.title.toLowerCase()
          .indexOf(nVal.toLowerCase()) !== -1
          ? m
          : null);
          }
          this.filteredItems = newData;
        }
     
    },
     methods: {
          ...mapActions([
        'fetchCinema','fetchShowtimes'
      ]),
       rowClicked(record){
        this.$router.push({ name: 'Showtime', params: { id: record.id } });
      }
    }

}
</script>
<style scoped>
     .c-container{
        display: flex;
        margin-top: 5rem;
        flex-direction: row;
        padding: 1rem;
    }
    table >>> tbody tr :hover {
        cursor: pointer;
    }

     @media screen and (max-width: 768px) {
      .c-container{
          flex-direction: column;
      }
     
  }
</style>