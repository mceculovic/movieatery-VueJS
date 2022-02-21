<template>
<div class="align-center">
  <b-card
    :title="cinema.name"
    :img-src="`https://movieatery.herokuapp.com/theatres/images/${this.cinema.imageFileName}`"
    img-alt="Cinema image"
    img-top
    tag="article"
    style="max-width: 40rem;"
    class="mb-2 cursor"
    @click="handleOnClick"
  >
     <b-card-text class="col-container">
            <span><b>Street:</b> {{this.cinema.street}} </span>
            <span><b>City:</b> {{this.cinema.city}} </span>
            <span><b>Phone:</b> {{this.cinema.phone}} </span>
            <span><b>Capacity:</b> {{this.cinema.capacity}} </span>
          </b-card-text>

  </b-card>
</div>
</template>
<script>
export default {
    name: 'CinemaCard',
    props: {
        cinema: Object
    },
    methods: {
      handleOnClick(){
            this.$router.push({ name: 'CinemaView', params: { id: this.cinema.id } });
      }
    },
}
</script>
<style scoped>

.col-container{
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.card{
  background: rgb(126, 2, 2);
    color: white;
}

    
</style>