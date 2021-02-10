var nuovo = new Vue({
  el:'#cont',
  data:{
    ricerca: '',
    arrayFilm: '',
    arraySerie: ''


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
        this.arrayFilm = result.data.results
        console.log(this.arrayFilm);
      })
      .catch((error) => alert('errori'))
      axios
      .get('https://api.themoviedb.org/3/search/tv', {
        params: {
          api_key:'7b637101d1d50dc2f48259a676913f3c',
          // è ciò che mi viene ricercato all'interno
          query: this.ricerca,
          language: 'it-IT'
        }
      })
      .then((result) =>{
        this.arrayFilm = result.data.results
        console.log(result.data.results);
      })
      .catch((error) => alert('errori'))
    }
  }
})
