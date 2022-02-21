<template>
    <div class="footer-container">
        <h1>Movieatery</h1>
        <div class="footer-content">
        <ul>
            <li class="head-content">Explore</li>
            <li>
            <router-link to="/">Home</router-link>
            </li>
            <li>
            <router-link to="/movies">Movies</router-link>
            </li>
            <li>
            <router-link to="/cinemas">Cinemas</router-link>
            </li>
        </ul>
        <ul>
            <li class="head-content">Adress</li>
            <li>Adress 1</li>
            <li>Adress 2</li>
            <li>Adress 3</li>
        </ul>
         <ul>
            <li class="head-content">Follow</li>
            <li>
                <b-icon icon="instagram"></b-icon>
                Instagram
            </li>
            <li>
                <b-icon icon="facebook"></b-icon>
                Facebook
            </li>
        </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: "Footer"
}
</script>
<style scoped>
 a{
      color: white;
      text-decoration: none;
 }

 a:hover{
     color: white;
     text-decoration: none;
 }

 h1{
  font-weight: bold;
  font-size: 2rem;
  font-family: 'Abril Fatface', cursive;

}

.footer-container{
    color: white;
    width: 100%;
    height: 20rem;
    padding: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgb(0, 0, 0);
    gap: 1rem;
    position: relative;
    bottom: 0;
    
}

.footer-content{
    display: flex;
}

.head-content{
    font-weight: bold;
}

li:not(:first-child) {
    cursor: pointer;
}

ul{
    list-style: none;
}

 @media screen and (max-width: 768px) {
      .footer-container{
          font-size: 0.6rem;
      }
     
  }
    
</style>