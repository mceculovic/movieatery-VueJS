<template>
<div class="main-container">
    <b-container v-if="showtime != null">
    <MovieCard :movie="showtime.Movie"/>
</b-container>
<b-container>
<h3 align="center">Seats </h3>
<table align="center" class="table ctable" v-if="seatLayout.length > 0">
   <thead>
       <tr>
           <th> </th>
           <th scope="col" v-for="n in seatLayout[0].ids.length" :key="n">{{n}}</th>
       </tr>
   </thead>
  <tbody>
      <tr v-for="(item, index) in seatLayout" :key="item.row">
          <td scope="row"><b>{{item.row}}</b> </td>
         <td v-for="n in seatLayout[index].ids" :key="n.id" >
             <div @click="handleOnSelect(n)" v-bind:class="n.reserved? 'seat reserved' : n.selected? 'seat selected' : 'seat'" class="cursor"> </div>
          </td>
       </tr>
  </tbody>
</table>
<div class="info">
    <div class="info">
     <div class="seat"></div> Avaliable
    </div>
    <div class="info">
     <div class="seat reserved"></div> Unavaliable
    </div>
    <div class="info">
     <div class="seat selected"></div> Selected
    </div>
</div>
 <div class="col-container">
        <label>Price: {{price}}</label>
        <b-button @click="handleOnBook" class="primary-btn">Book</b-button>

    </div>
</b-container>
</div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import MovieCard from '../components/MovieCard.vue';
export default {
    name: 'Showtime',
    components:{
        MovieCard
    },
    data(){
        return {
            showtime: null,
            reservedSeats: [],
            seatLayout: [],
            price: 0
        };
    },
    async mounted(){
        let showtimeId = this.$route.params.id;
       const res = await this.fetchShowtime(showtimeId);
        if(res.msg){
            this.$router.push({name: 'NotFound'});
            return;
        }
        this.fetchReservedSeats(showtimeId);
        this.showtime = res;
    },
     computed: {
      ...mapState([
        'seatsReserved',
        'user'
      ])
    },
    watch:{
        seatsReserved(nVal){
            this.reservedSeats = nVal;
            for(let i in this.seatLayout){
                for(let j in this.seatLayout[i].ids){
                    if(nVal.includes(this.seatLayout[i].ids[j].id))
                        this.seatLayout[i].ids[j].reserved = true;
                }
            }
        },
        showtime(nVal){
            let seats = nVal.Theatre.seats;
            let data = [];
            for(let e of seats){
                
               let row = data.find(r => r.row == e.row? r : null);
               if(row != null){
                   if(this.seatsReserved.includes(e.id))
                        row.ids.push({id: e.id, reserved: true, selected: false});
                    else
                        row.ids.push({id: e.id, reserved: false, selected: false});

               }
               else{
                   if(this.seatsReserved.includes(e.id))
                        data.push({ row: e.row, ids: [{id: e.id, reserved: true, selected: false}]});
                    else
                        data.push({ row: e.row, ids: [{id: e.id, reserved: false, selected: false}]});

               }

            }
           this.seatLayout = data;
        }
    },
    methods: {
        ...mapActions([
        'fetchShowtime',
        'fetchReservedSeats',
        'bookReservation'
      ]),
        handleOnSelect(seat){
            if(seat.reserved)
                return;
            if(seat.selected){
                seat.selected = false;
                this.price -= this.showtime.ticketPrice;
            }else{
                seat.selected = true;
                this.price += this.showtime.ticketPrice;
            }
            
        },
        async handleOnBook(e){
            e.preventDefault();
            if(this.user == null){
                this.$router.push({name: 'SignUp'});
            }
            let selectedIds = [];
            for(let i of this.seatLayout){
                for(let j of i.ids){
                    if(j.selected){
                        selectedIds.push(j.id);
                    }
                }
            }
            const res = await this.bookReservation({userId: this.user.userId, showtimesId: this.showtime.id, seats: selectedIds});
            if(res.msg){
                this.$toast.error(res.msg);
                return;
            }

            for(let i in this.seatLayout){
                for(let j in this.seatLayout[i].ids){
                    if(selectedIds.includes(this.seatLayout[i].ids[j].id)){
                        this.seatLayout[i].ids[j].selected = false;
                    }
                }
            }
            this.$toast.success("Successfully booked");
        }
    },
}
    
</script>
<style scoped>
    .seat{
        width: 15px;
        height: 15px;
        background: white;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid black;
    }

    .main-container{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 5rem;
        margin-bottom: 5rem;
    }

    .col-container{
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .info{
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }

    .reserved{
        background: rgb(133, 0, 0);
    }

    .selected{
        background: rgb(245, 245, 141);
    }

    .table th, .table td{
        padding: 0.5rem;
    }
   
    .ctable{
        width: 100px;
        height: 100px;
    }
    .primary-btn{
        color: white;
        background: black;
        width: 12rem;
        height: 3rem;
        border: none;
        border-radius: 20px;
    } 

    .primary-btn:hover{
        color: white;
        background: green;
    }

     @media screen and (max-width: 768px) {
      .main-container{
          flex-direction: column;
      }

      .table{
          font-size: 0.5rem;
      }

      .seat{
          width: 0.5rem;
          height: 0.5rem;
      }

      .info{
          font-size: 0.7rem;
      }

      h3{
          font-size: 1.5rem;
      }
     
  }
  @media screen and (min-width: 769px) and (max-width: 1024px){
      .main-container{
          flex-direction: column;
      }
     
  }


</style>
