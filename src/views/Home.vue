<template>
  <div class="home">
    <div class="row-container image-watch align-center">
      <div class="col-container m-width">
        <h1>Movieatery</h1>
        <h3>A place where you can book all the movies you want to watch in cinemas.</h3>
      </div>
    </div>
    <div class="row-container reverse">
      <img src="../assets/movies.jpg" class="image-movies"/>
      <div class="col-container cont-mob col-cont-black" >
      <div class="shape-container align-center shape-cont-red">
      <h2>All new and various movies</h2>
      <h3>Find your favorite movie among the latest blockbusters.</h3>
      <button @click="$router.push('movies')" class="primary-btn" >Go to Movies</button>
      </div>
      </div>
    </div>
    <div class="row-container ">
      <div class="col-container cont-mob col-cont-black">
        <div class="shape-container align-center shape-cont-red">
          <h2>The best equipped cinemas</h2>
          <h3>Find your favourite and nearest cinema</h3>
          <button @click="$router.push('cinemas')" class="primary-btn">Go to Cinemas</button>

        </div>
      </div>
        <img src="../assets/watchCinema.jpg" class="image-movies"/>

    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  
}
</script>

<style scoped>

h1{
  font-weight: bold;
  font-size: 4rem;
  font-family: 'Abril Fatface', cursive;

}

h3{
  font-size: 1.5rem;
  font-style: italic;
}

.home{
  display: flex;
  flex-direction: column;
  min-height: 100vh;

}

.align-center{
    align-items: center;
    justify-content: center;
}


.row-container{
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 500px;

}

.image-watch{
   background: url("../assets/cinema.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat; 
    height: 1000px;


}

.image-movies{
  width: 50%;
  height: 100%;
}



.col-container{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem;
  width: 50%;
  gap: 1rem;
}

.m-width{
  height: 60%;
  width: 90%;
}

.shape-container{
  display: flex;
  flex-direction: column;
  width: 70%;
  height: 70%;
  background: black;
  color: white;
  border-radius: 20px;
  box-shadow: 5px 5px 4px 5px black;
  gap: 1rem;
}

.col-cont-black{
  background: black;
}

.shape-cont-red{
  background: rgb(126, 2, 2);
  color: white
}

button{
  width: 12rem;
  height: 3rem;
  border: none;
  border-radius: 20px;
}



  @media screen and (max-width: 768px) {
      .row-container{
        display: flex;
        flex-direction: column;
      }
      .image-movies{
        width: 100%;
        overflow: hidden;
      }
      .col-container{
        width: 100%;
      }

      .cont-mob{
        width: 100%;
        height: 100%;
      }

      .shape-container{
        width: 100%;
        height: 100%;
        padding: 1rem;
      }

      .reverse{
        flex-direction: column-reverse;
      }


      h2{
        font-size: 20px;
      }
      h3{
        font-size: 15px;
      }

     
  }
  @media screen and (min-width: 769px) and (max-width: 1024px){
       h3{
         font-size: 15px;
       }
         .shape-container{
        
           width: 100%;
           height: 70%;
      }
      h2{
        font-size: 20px;
      }

      .primary-btn{
        font-size: 14px;
      }
      
  }
  @media screen and (min-width: 1025px){
      h3{
         font-size: 19px;
       }
  }


</style>


