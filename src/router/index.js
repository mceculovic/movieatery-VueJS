import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Movies from '../views/Movies.vue'
import Cinemas from '../views/Cinemas.vue'
import MovieView from '../views/MovieView.vue';
import NotFound from '../views/NotFound.vue';
import CinemaView from '../views/CinemaView.vue';
import Showtime from '../views/Showtime.vue';
import SignUp from '../views/SignUp.vue';
import Profile from '../views/Profile.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  
  },
  {
    path: '/movies',
    name: 'Movies',
    component: Movies
    
  },
  {
    path: '/cinemas',
    name: 'Cinemas',
    component: Cinemas
  },
  {
    path: '/movies/:id',
    name: 'MovieView',
    component: MovieView
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/cinemas/:id',
    name: 'CinemaView',
    component: CinemaView
  },
  {
    path: '/showtime/:id',
    name: 'Showtime',
    component: Showtime
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
