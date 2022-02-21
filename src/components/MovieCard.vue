<template>
    <div>
           <b-card @click="handleOnClick" :img-src="`https://movieatery.herokuapp.com/movies/images/${this.movie.imageFileName}`" img-alt="Movie image" img-left class="mb-3 cursor">
       <b-card-text class="col-container">
           <h3>{{this.movie.title}}</h3>
            <span><b>Release Year:</b> {{this.movie.releaseYear}} </span>
            <span><b>Genre:</b> {{this.movie.genre.name}} </span>
            <span><b>Rating:</b> {{this.movie.rating}} </span>
            <span><b>Movie length:</b> {{this.movie.movieLength}} </span>
            <span><b>Actors:</b> {{this.getActors()}}</span>
            <span><b>Directors:</b> {{this.getDirectors()}}</span>
            <p><b>Description:</b> {{this.movie.description}} </p>
          </b-card-text>
    </b-card>
</div>
</template>
<script>
export default {
    name: 'MovieCard',
    props: {
        movie: Object
    },
    methods: {
        getActors(){
             let actors = "";
             this.movie.Actors.forEach(a => {
                actors += a.firstName + ' ' + a.lastName + ',';
             });
             actors = actors.slice(0, -1);  
             return actors;
        },
        getDirectors(){
            let directors = "";
            this.movie.Directors.forEach(d => {
                directors += d.firstName + ' ' + d.lastName + ',';
            });
            directors = directors.slice(0, -1);  
            return directors
        },
        handleOnClick(){
            this.$router.push({ name: 'MovieView', params: { id: this.movie.id } });
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

.card-img-left {
    width:  200px;
    object-fit: cover;
    float: left;
    max-height: fit-content;
}

   @media screen and (max-width: 768px) {
         .card{
            font-size: 0.3rem;
        }

        .card-img-left{
            max-width: 12rem;
            max-height: 12rem;
            object-fit: scale-down;
        }
        h3{
            font-size: 10px;
        }

        
   }

    
</style>