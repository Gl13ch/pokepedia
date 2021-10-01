$(() => {

const showPokemonGen = (data) => {
  for (let i = 0; i < 5; i++) {
    const $pokemon = $('<div>').addClass('pokemon').attr('id', i).text(data.pokemon_species[i].name).appendTo($('.poke_container'))

    const $newButton = $('<button>').val(data.pokemon_species[i].name).text('Read More').addClass('read-more').appendTo($pokemon)
  }

  $('.read-more').on('click', event => {
    const name = $(event.target).val()
    $('.more-info').remove()

     $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${name}?limit=20&offset=20`
     }).then(
         (data)=>{
           // console.log(data);
           let $pokeData = $('<div>').addClass('more-info').text(`${data.name} is a ${data.types[0].type.name} type.`)

           if( $pokeData ){
             $pokeData.appendTo($(event.currentTarget).parent())
             $pokeData = null
           }else{
             $pokeData = $('.more-info').detach()
           }

         },
         ()=>{
           console.log('bad request');
       }
     )
   })
  }

//pokemon api

  const $btn1 = $('.gen').on('click', (event) => {
    event.preventDefault()
      const generation = $(event.currentTarget).val()
      $('.pokemon').remove()
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

     $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${userInput}?limit=20&offset=20`
     }).then(
         (data)=>{

           console.log(data);

           const $search = $('<div>').addClass('poke-search').text(`${data.name} is a ${data.types[0].type.name} type.`).appendTo($('.poke_container'))
        },
        ()=>{
          console.log('bad request');
      }
    );
  })
})
