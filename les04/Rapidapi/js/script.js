var citaat = document.querySelector('#quote');

// fetch settings
let url = 'https://mineable-coins.p.rapidapi.com/coins';
let options = {
	"method": "GET",
"headers": {
"x-rapidapi-key": "8c8007cea7msh4496df1616791c3p175918jsndd45fa655d98",
"x-rapidapi-host": "mineable-coins.p.rapidapi.com"
}
};
// fetch url
fetch(url, options)
.then(resp => { return resp.json(); })
.then(data => verwerkData(data))
.catch(err => verwerkFout(err));
// verwerk fouten
function verwerkFout(err) {
console.log('request mislukt: ', err);
}
// verwerk data
function verwerkData(data) {
	console.log('succes', data);
	citaat.innerHTML =  data[0].name + " " + data[0].coin + " " + data[0].price;}



