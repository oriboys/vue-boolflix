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
        this.arrayFilm.forEach((item, i) => {
          // item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          if (item.poster_path == null){
            item.poster_path = 'https://media.istockphoto.com/vectors/coming-soon-vector-template-design-vector-id984996502?k=6&m=984996502&s=612x612&w=0&h=wbMAxPZZRht9DPspDS1NvM4TLlBCCajXnJfSmcckqZ8='
          } else{
            item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          }
          if (item.original_language == 'es'){
            item.original_language = 'https://www.resolfin.com/wp-content/uploads/2018/02/spagna-100x150.png'
          } else if (item.original_language == 'fr'){
            item.original_language = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/280px-Flag_of_France.svg.png'
          } else{
            item.original_language = 'https://theitaliancommunity.co.uk/blog/wp-content/uploads/bandiera-inghilterra.png'
          }
        });
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
        this.arraySerie = result.data.results
        console.log(result.data.results);
        this.arraySerie.forEach((item, i) => {
          // item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          if (item.poster_path == null){
            item.poster_path = 'https://media.istockphoto.com/vectors/coming-soon-vector-template-design-vector-id984996502?k=6&m=984996502&s=612x612&w=0&h=wbMAxPZZRht9DPspDS1NvM4TLlBCCajXnJfSmcckqZ8='
          } else{
            item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          }
          if (item.original_language == 'es'){
            item.original_language = 'https://www.resolfin.com/wp-content/uploads/2018/02/spagna-100x150.png'
          } else if (item.original_language == 'fr'){
            item.original_language = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/280px-Flag_of_France.svg.png'
          } else{
            item.original_language = 'https://theitaliancommunity.co.uk/blog/wp-content/uploads/bandiera-inghilterra.png'
          }
        });

      })
      .catch((error) => alert('errori'))
    }
  }
})
