//MINIMUM REQUIREMENTS

//HTML, CSS, JavaScript, jQuery
//Hosted
//Commit, Commit, Commit
//A README.md

//Use ajax
//responsive design - must be compatible on pc and mobile
//Have at least one:
//Carousel, modal, sticky nav, tooltips, etc.


const showPokemon = (data) => {
  for (let i = 0; i < 20; i++) {

    const $pokemon = $('<div>').addClass('pokemon').attr('id', i).text(data.pokemon_species[i].name).appendTo($('.poke_container'))

    const $newButton = $('<button>').text('Read More').addClass('more-info').appendTo($pokemon)
  }
  // const $btn = $('.more-info').on('click', event => {
  //
  //   const $id = $(event.target).parent().attr('id')
  //
  //   let $pokedata = $('<div>').text(data.pokemon_species[$id].name).addClass('more-info')
    // $('.more-info').remove()

    // if( $newDiv ){
    //   $newDiv.appendTo($(event.currentTarget).parent())
    //   $newDiv = null
    // }else{
    //   $newDiv = $('.more-info').detach()
    // }
  // })
}
//pokemon api
$(() => {
  $('button').on('click', (event) => {
    event.preventDefault()
      const generation = $(event.currentTarget).val()
      $('.pokemon').remove()
  $.ajax({
     url:`https://pokeapi.co/api/v2/generation/${generation}/?limit=20&offset=20`
  }).then(
      (data)=>{
         console.log(data);
         showPokemon(data)
      },
      ()=>{
        console.log('bad request');
    }
  );
})
})
