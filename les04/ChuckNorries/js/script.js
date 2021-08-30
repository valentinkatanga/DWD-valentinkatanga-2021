var quote = document.querySelector('#citaat');
let link = 'https://api.chucknorris.io/jokes/random';

fetch(link)
.then(response => {return response.json();} )
.then(data => verwerkData(data))


function verwerkData(data)
{
console.log('succes', data);
console.log(data);
}


fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
quote.innerHTML =  data.value;
  });