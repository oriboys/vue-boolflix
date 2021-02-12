var nuovo = new Vue({
  el:'#cont',
  data:{
    ricerca: '',
    arrayFilm: '',
    arrayTutto: '',
    immagine: 'none',
    descr: 'none',
    indice: '',
    type: 'all',
    types: ['all']


  },
  mounted(){
    axios
    .get('https://api.themoviedb.org/3/genre/movie/list?api_key=7b637101d1d50dc2f48259a676913f3c&language=en-US')
    .then((result)=> {
      // console.log(result.data.genres);
      result.data.genres.forEach((item, i) => {

        if(this.types.includes(item.name) == false){
          this.types.push(item.name)
        }
      })
      // console.log(this.types);
    })
    axios
    .get('https://api.themoviedb.org/3/search/movie?api_key=7b637101d1d50dc2f48259a676913f3c&language=en-US&query=matrix')
    .then((result) => {
        this.arrayTutto = result.data.results
        // console.log(this.arrayTutto);
        this.arrayTutto.forEach((item, i) => {
          var elemento = item;

          axios
          .get('https://api.themoviedb.org/3/genre/movie/list?api_key=7b637101d1d50dc2f48259a676913f3c&language=en-US')
          .then((result)=> {
            // console.log(result.data.genres);
            result.data.genres.forEach((item, i) => {

              if(elemento.genre_ids.includes(item.id) == true){
                elemento.genre_ids.push(item.name)
              }
            })
            item.attori = []
            axios
            .get('https://api.themoviedb.org/3/movie/' + elemento.id + '/credits?language=en-US&api_key=7b637101d1d50dc2f48259a676913f3c')
            .then((result) => {
                // result.data.cast.forEach((item) =>{
                //   attori.push(item.name)
                // })
                for (var i = 0; i < 5; i++){
                  item.attori.push(result.data.cast[i].name)
                }

            })
            // console.log(elemento.genre_ids);
            // console.log(this.types);
          })
          // console.log(item.genre_ids);
          item.stelle = [];
          // immagine
          // item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          if (item.poster_path == null){
            item.poster_path = 'https://media.istockphoto.com/vectors/coming-soon-vector-template-design-vector-id984996502?k=6&m=984996502&s=612x612&w=0&h=wbMAxPZZRht9DPspDS1NvM4TLlBCCajXnJfSmcckqZ8='
          } else{
            item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          }
          // bandiera
          if (item.original_language == 'es'){
            item.original_language = 'https://www.resolfin.com/wp-content/uploads/2018/02/spagna-100x150.png'
          } else if (item.original_language == 'fr'){
            item.original_language = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/280px-Flag_of_France.svg.png'
          } else{
            item.original_language = 'https://theitaliancommunity.co.uk/blog/wp-content/uploads/bandiera-inghilterra.png'
          }
          // stelle
          item.vote_average = Math.ceil(item.vote_average / 2);
          if (item.vote_average < 1){
            item.vote_average = 1
          }
          for (var i = 0; i < item.vote_average; i++){
            item.stelle.push('stella')
          }

        });
    })

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
        // console.log(this.arrayFilm);
        // this.arrayFilm.forEach((item, i) => {
        //   item.stelle = [];
        //   // immagine
        //   // item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
        //   if (item.poster_path == null){
        //     item.poster_path = 'https://media.istockphoto.com/vectors/coming-soon-vector-template-design-vector-id984996502?k=6&m=984996502&s=612x612&w=0&h=wbMAxPZZRht9DPspDS1NvM4TLlBCCajXnJfSmcckqZ8='
        //   } else{
        //     item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
        //   }
        //   // bandiera
        //   if (item.original_language == 'es'){
        //     item.original_language = 'https://www.resolfin.com/wp-content/uploads/2018/02/spagna-100x150.png'
        //   } else if (item.original_language == 'fr'){
        //     item.original_language = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/280px-Flag_of_France.svg.png'
        //   } else{
        //     item.original_language = 'https://theitaliancommunity.co.uk/blog/wp-content/uploads/bandiera-inghilterra.png'
        //   }
        //   // stelle
        //   item.vote_average = Math.ceil(item.vote_average / 2);
        //   if (item.vote_average < 1){
        //     item.vote_average = 1
        //   }
        //   for (var i = 0; i < item.vote_average; i++){
        //     item.stelle.push('stella')
        //   }
        //
        // });
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
        this.arrayTutto = [...this.arrayFilm,...result.data.results]
        // console.log(this.arrayTutto);
        this.arrayTutto.forEach((item, i) => {
          var elemento = item;
          // aggiungere nome categoria film
          axios
          .get('https://api.themoviedb.org/3/genre/movie/list?api_key=7b637101d1d50dc2f48259a676913f3c&language=en-US')
          .then((result)=> {
            // console.log(result.data.genres);
            result.data.genres.forEach((item, i) => {

              if(elemento.genre_ids.includes(item.id) == true){
                elemento.genre_ids.push(item.name)
              }
            })
            // console.log(this.types);
          })
          console.log(elemento.cast);
          // aggiunta attori
          item.attori = []
          axios
          .get('https://api.themoviedb.org/3/movie/' + elemento.id + '/credits?language=en-US&api_key=7b637101d1d50dc2f48259a676913f3c')
          .then((result) => {
              // result.data.cast.forEach((item) =>{
              //   attori.push(item.name)
              // })
              for (var i = 0; i < 5; i++){
                item.attori.push(result.data.cast[i].name)
              }

          })
          console.log(item.attori);

          // immagini
          // console.log(item);
          // item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          if (item.poster_path == null){
            item.poster_path = 'https://media.istockphoto.com/vectors/coming-soon-vector-template-design-vector-id984996502?k=6&m=984996502&s=612x612&w=0&h=wbMAxPZZRht9DPspDS1NvM4TLlBCCajXnJfSmcckqZ8='
          } else{
            item.poster_path = 'http://image.tmdb.org/t/p/w500/'+ item.poster_path;
          }
          // bandiere
          if (item.original_language == 'es'){
            item.original_language = 'https://www.resolfin.com/wp-content/uploads/2018/02/spagna-100x150.png'
          } else if (item.original_language == 'fr'){
            item.original_language = 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/280px-Flag_of_France.svg.png'
          } else if (item.original_language == 'en'){
            item.original_language = 'https://theitaliancommunity.co.uk/blog/wp-content/uploads/bandiera-inghilterra.png'
          } else {
            item.original_language ='https://images-na.ssl-images-amazon.com/images/I/61z5tXoJWXL._AC_SY450_.jpg'
          }
          // stelle
          item.stelle = [];
          item.vote_average = Math.ceil(item.vote_average / 2);
          if (item.vote_average < 1){
            item.vote_average = 1
          }
          for (var i = 0; i < item.vote_average; i++){
            item.stelle.push('stella')
          }
        });

      })
      .catch((error) => alert('errori'))
    },
    descrizioneOn(index){
      this.indice = index
      this.descr = 'show'
      this.immagine = 'none'
    },
    descrizioneOff(index){
      this.indice = index
      this.descr = 'none'
      this.immagine = 'show'
    },
    seleziona(){
      this.type = document.getElementById('opzione').value;


    }

  }
})
