$(() => {
//function that shows the pokemon according to that generation.
  const showPokemonGen = (data) => {
    //loops over all the pokemon in the specified generation
  for (let i = 0; i < Object.keys(data.pokemon_species).length; i++) {

    //Pokemon div. Holds an image and read-more button.
    const $pokemon = $('<div>').addClass('pokemon').attr('id', i) .appendTo($('.poke_container'))

    //button to read-more about a certain pokemon
    const $newButton = $('<button>').val(data.pokemon_species[i].name).attr('id', data.pokemon_species[i].name).text(`${data.pokemon_species[i].name} `).addClass('read-more').appendTo($pokemon)

    //I could not figure out how to do this outside of the function I was getting undefined.
    //grabs the id from the read-more btn and puts this into the ajax call.
    let name =  $('.read-more').get(i).id ;

    //ajax call to get the pokemon's name onto the button.
    $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${name}?limit=200&offset=200`
     }).then(
         (data)=>{

          //appends the id number of the pokemon to the button. same as .text()
          $newButton.append(`id:${data.id}`)

          //prepends the image of the pokemon to the pokemon div
          let $mainImg = $('<img>').attr('src', data.sprites.other["official-artwork"].front_default).addClass('main_img').prependTo($pokemon)
        },
        ()=>{

          //If there is no image available it will give it a blank img.
          let $unavailableImg = $('<img>').attr('src', 'asdf').addClass('main_img')
          $unavailableImg.prependTo($pokemon)
          // console.log('bad request');
      }
    );
  }
  //Modal
  const $open =  $('.read-more')
  const $modal = $('#modal')
  const $close = $('#close')
  //close Modal
  const closeModal = () => {
    $modal.hide()
  }
  $close.on('click', closeModal);
  //open Modal
  $open.on('click', (event) => {
    const name = $(event.target).val()
    $('.more-info').remove()
    $('.img_container').remove()

    $modal.show()

    $.ajax({
          url:`https://pokeapi.co/api/v2/pokemon/${name}?limit=20&offset=20`
       }).then(
           (data)=>{

             let $pokeData = $('<div>').addClass('more-info').text(`${data.name} is a ${data.types[0].type.name} type.`)

             const $imgContainer = $('<div>').addClass('img_container').prependTo($('#modal-text'))

             let $pokeImg = $('<img>').attr('src', data.sprites.other["official-artwork"].front_default).addClass('poke_img').appendTo($imgContainer)

             $pokeData.appendTo($imgContainer)
             // $pokeData.appendTo($('#modal-text'))
       },
       ()=>{
         let $unavailableData = $('<div>').text(`Information Unavailable`).appendTo($('#modal-text'))

         console.log('bad request')
     })
   })
  }



  //Clicking on a generation button.
  const $btn1 = $('.gen').on('click', (event) => {
    event.preventDefault()

    $(window).scrollTop(0)

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

  //search button.
  $('form').on('submit', event => {
    event.preventDefault()
    //takes in the user input
    const userInput = $('#search-poke').val().toLowerCase()
    //clears the input after searched
    $('#search-poke').val('')
    //removes the searched stuff when another search is preformed
    $('.poke-search').remove()
    $('.pokemon').remove()
    $('.img_search_container').remove()

     $.ajax({
        url:`https://pokeapi.co/api/v2/pokemon/${userInput}?limit=200&offset=200`
     }).then(
         (data)=>{
           // console.log(data);

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
