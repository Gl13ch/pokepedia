console.log($);
console.log('hello world');

//pokemon api
$(() => {
  $.ajax({
     url:'https://pokeapi.co/api/v2/generation/1'
  }).then(
      (data)=>{
         console.log(data);
      },
      ()=>{
        console.log('bad request');
    }
  );
})
