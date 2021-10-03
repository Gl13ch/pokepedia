$(() => {

const showPokemonGen = (data) => {
  for (let i = 0; i < Object.keys(data.pokemon_species).length; i++) {
    // console.log(Object.keys(data).length);
    const $pokemon = $('<div>').addClass('pokemon').attr('id', i) .appendTo($('.poke_container'))

    const $newButton = $('<button>').val(data.pokemon_species[i].name).attr('id', data.pokemon_species[i].name).text(data.pokemon_species[i].name).addClass('read-more').appendTo($pokemon)

    let name =  $('.read-more').get(i).id ;
    // console.log(test);

    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${name}?limit=200&offset=200`
     }).then(
         (data)=>{
           // console.log(data);
            let $mainImg = $('<img>').attr('src', data.sprites.other["official-artwork"].front_default).addClass('main_img').appendTo($pokemon)
        },
        ()=>{
          console.log('bad request');
      }
    );
  }

  $('.read-more').on('click', event => {
    const name = $(event.target).val()
    $('.more-info').remove()
    $('.img_container').remove()

     $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${name}?limit=20&offset=20`
     }).then(
         (data)=>{
           // console.log(data);
           let $pokeData = $('<div>').addClass('more-info').text(`${data.name} is a ${data.types[0].type.name} type.`)

           const $imgContainer = $('<div>').addClass('img_container')

           let $pokeImg = $('<img>').attr('src', data.sprites.other["official-artwork"].front_default).addClass('poke_img').appendTo($imgContainer)

           if( $pokeData ){
             $pokeData.appendTo($(event.currentTarget).parent())
             $imgContainer.prependTo($(event.currentTarget).parent())
             $pokeData = null
           }else{
             $pokeData = $('.more-info').detach()
             $imgContainer = $('.img_container').detach()
           }

         },
         ()=>{
           console.log('bad request');
       }
     )
   })
  }



  const $btn1 = $('.gen').on('click', (event) => {
    event.preventDefault()
      const generation = $(event.currentTarget).val()

      $('.pokemon').remove()
      $('.poke-search').remove()
      $('.poke_search_img').remove()

  $.ajax({
     url:`https://pokeapi.co/api/v2/generation/${generation}/?limit=5&offset=5`
  }).then(
      (data)=>{
         // console.log(data);
         showPokemonGen(data)
      },
      ()=>{
        console.log('bad request');
      }
    );
  })

 $('form').on('submit', event => {
    event.preventDefault()
    const userInput = $('#search-poke').val()

    $('.poke-search').remove()
    $('.pokemon').remove()
    $('.img_search_container').remove()

     $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${userInput}?limit=200&offset=200`
     }).then(
         (data)=>{

           console.log(data);

           const $search = $('<div>').addClass('poke-search').text(`${data.name} is a ${data.types[0].type.name} type.`).appendTo($('.poke_container'))

           const $imgSearchContainer = $('<div>').addClass('img_search_container').appendTo($('.poke_container'))

           let $pokeSearchImg = $('<img>').attr('src', data.sprites.other["official-artwork"].front_default).addClass('poke_search_img').prependTo($imgSearchContainer)
        },
        ()=>{
          console.log('bad request');
      }
    );
  })
})

// "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/132.png"
//
// data.sprites.other['official-artwork'].front_default
