const quote = document.querySelector('#weer')


let url = '"https://quotes15.p.rapidapi.com/quotes/random/"';
let options = {
    "headers": {
        "x-rapidapi-key": "8c8007cea7msh4496df1616791c3p175918jsndd45fa655d98",
        "x-rapidapi-host": "quotes15.p.rapidapi.com"
    }
};
// fetch url
fetch(url, options)
    .then(resp => {
        return resp.json();
    })
    .then(data => verwerkData(data))
    .catch(err => verwerkFout(err));
// verwerk fouten
function verwerkFout(err) {
    console.log('request mislukt: ', err);
}

function verwerkData(data) {
		console.log('gelukt', data);
		
}