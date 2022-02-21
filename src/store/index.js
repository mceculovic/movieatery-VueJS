import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const jwt = require('jsonwebtoken');

export default new Vuex.Store({
  state: {
    movies: [],
    genres: [],
    cinemas: [],
    showtimes: [],
    seatsReserved: [],
    token: '',
    user: null,
  },
  mutations: {
    addMovies(state, movies) {
      state.movies = movies;
    },
    addGenres(state, genres){
      state.genres = genres;
    },
    addCinemas(state, cinemas){
      state.cinemas = cinemas;
    },
    addMovie(state, movie){
      state.movies.push(movie);
    },
    addCinema(state, cinema){
      state.cinemas.push(cinema);
    },
    addShowtimes(state, showtimes){
      state.showtimes = showtimes;
    },
    addShowtime(state, showtime){
      state.showtimes.push(showtime);
    },
    addSeatsReserved(state, seats){
      state.seatsReserved = seats;
    },
    addNewSeats(state, data){
      for(let i of data){
        state.seatsReserved.push(i);
      }
    },
    setToken(state, token) {
      state.token = token;
      localStorage.token = token;
      state.user = jwt.decode(token);
    },
    removeToken(state) {
      state.token = '';
      localStorage.token = '';
      state.user = null;
    },
    setUser(state){
      let token =  localStorage.token;
      state.token = token;
      state.user = jwt.decode(token);
    }
  
  },
  actions: {
      fetchMovies({ commit }) {
      fetch('https://movieatery-api.herokuapp.com/api/movies')
        .then( obj => obj.json() )
          .then( res => {
            commit('addMovies', res);
          });
    },
    fetchGenres({ commit }) {
      fetch('https://movieatery-api.herokuapp.com/api/genres')
        .then( obj => obj.json() )
          .then( res => {
            commit('addGenres', res);
          });
    },
    fetchCinemas({ commit }) {
      fetch('https://movieatery-api.herokuapp.com/api/theatres')
        .then( obj => obj.json() )
          .then( res => {
            commit('addCinemas', res);
          });
    },
    fetchShowtimes({ commit }) {
      fetch('https://movieatery-api.herokuapp.com/api/showtimes')
        .then( obj => obj.json() )
          .then( res => {
            commit('addShowtimes', res);
          });
    },
    
    fetchMovie({state, commit},movieId){
      return new Promise((resolve) => {
          let movie = state.movies.find(m => m.id == movieId);
          if(movie)
            resolve(movie)
          else{
            fetch('https://movieatery-api.herokuapp.com/api/movies/' + movieId)
            .then( obj => obj.json() )
              .then( res => {
                  commit('addMovie', res);
                  resolve(res);
                  
              });
          }
      });
    },
    fetchCinema({state, commit},cinemaId){
      return new Promise((resolve) => {
          let cinema = state.cinemas.find(m => m.id == cinemaId);
          if(cinema)
            resolve(cinema)
          else{
            fetch('https://movieatery-api.herokuapp.com/api/theatres/' + cinemaId)
            .then( obj => obj.json() )
              .then( res => {
                  commit('addMovie', res);
                  resolve(res);
                  
              });
          }
      });
    },
    fetchShowtime({state, commit},showtimeId){
      return new Promise((resolve) => {
          let showtime = state.showtimes.find(s => s.id == showtimeId);
          if(showtime)
            resolve(showtime)
          else{
            fetch('https://movieatery-api.herokuapp.com/api/showtimes/' + showtimeId)
            .then( obj => obj.json() )
              .then( res => {
                  commit('addShowtime', res);
                  resolve(res);
                  
              });
          }
      });
    },
    fetchReservedSeats({commit},showtimeId){
          fetch('https://movieatery-api.herokuapp.com/api/seatshowtime/' + showtimeId)
            .then(res => res.json())
              .then( res =>{
                  commit('addSeatsReserved', res);
              });
    },
    
    bookReservation({ state }, obj) {
      return new Promise((resolve) => {
        fetch('https://movieatery-api.herokuapp.com/api/reservations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`},
          body: JSON.stringify(obj)
        }).then( res => res.json() )
          .then( data => {
            resolve(data);
          });
      });
    },

    getUserData({state}){
      return new Promise((resolve) => {
        fetch('https://movieatery-api.herokuapp.com/api/users/' + state.user.userId, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`}
        }).then( res => res.json() )
          .then( data => {
            resolve(data);
          });
      });
    },

    updateUser({state, commit}, user){
      return new Promise((resolve) => {
        fetch('https://movieatery-api.herokuapp.com/api/profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${state.token}`},
          body: JSON.stringify(user)
        }).then( res => res.json() )
          .then( data => {
            if(!data.msg && data.id){
               commit('setToken', data.token);
            }
            resolve(data);
          });
      });
    },

    register({ commit }, obj) {
      return new Promise((resolve) => {
        fetch('https://movieatory-auth.herokuapp.com/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
        }).then( res => res.json() )
          .then( tkn => {
            if(tkn.msg){
              resolve(tkn);
              return;
            }
            commit('setToken', tkn.token);
            resolve(tkn);
          });
      });
    },

     login({ commit }, obj) {
       return new Promise((resolve) =>{
        fetch('https://movieatory-auth.herokuapp.com/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(obj)
      }).then( res => res.json() )
        .then( tkn => {
          if (tkn.msg){
            resolve(tkn);
            return;
          }
            commit('setToken', tkn.token);
            resolve(tkn);
        });
       });
    
    },
    signOut({ commit }){
      commit('removeToken');
    },
    getUser({commit}){
        commit('setUser');
    },
    socket_reservation({ commit }, data) {
      const seats = JSON.parse(data);
      commit('addNewSeats', seats);
    }
  },
  modules: {
  }
})
