var quote = document.querySelector('#citaat');
let link = 'https://api.chucknorris.io/jokes/random';

fetch(link)
.then(response => {return response.json();} )
.then(data => verwerkData(data))


function verwerkData(data)
{
quote.innerHTML =  data.value;
}
