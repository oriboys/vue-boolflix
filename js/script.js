var nuovo = new Vue({
  el:'#cont',
  data:{
    ricerca: ''


  },
  methods:{
    trova(){
      axios
      .get('https://api.themoviedb.org/3/search/movie', {
        params: {
          api_key:'7b637101d1d50dc2f48259a676913f3c',
          // devo mettere il nome della queri
          query: this.ricerca,
          language: 'it-IT'
        }
      })
      .then((result) =>{
        console.log(result.data);
      })
      .catch((error) => alert('errori'))
      axios
      .get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key:'7b637101d1d50dc2f48259a676913f3c',
          // devo mettere il nome della queri
          query: this.ricerca,
          language: 'it-IT'
        }
      })
      .then((result) =>{
        console.log(result.data);
      })
      .catch((error) => alert('errori'))
    }
  }
})
