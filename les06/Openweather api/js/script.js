const link = 'https://api.openweathermap.org/data/2.5/weather?q=Geraardsbergen&appid=20ecdd02560183071f84d2ae4512dfdb&lang=nl&units=metric'
const stad = document.querySelector('#stad')
const temp = document.querySelector('#temperatuur')
const weer = document.querySelector('#weer')


fetch(link)
.then(response => {return response.json();})
.then(data => verwerkData(data))
.catch(err => verwerkFout(err))
function verwerkData(data)
{
	stad.innerHTML =  data.name;
	temp.innerHTML =  data.main.temp;
	weer.innerHTML =  data.weather[0].description;
}
function verwerkFout(err)
{
	console.log('request mislukt', err);
}