const formulier = document.querySelector('#formulier')
const bericht = document.querySelector('#keuze') 
const beeld = document.querySelector('#afbeeldingen')


formulier.addEventListener('click', function (e) 
{
if (e.target.nodeName != 'INPUT'){
	return;
}
		if(e.target.value == "Hawaii"){
			beeld.src = "afbeeldingen/hawai.png";
		}
		else 
		if(e.target.value == "4 seizoenen"){
			beeld.src = "afbeeldingen/seizoenen.png";
		}
		else
		if(e.target.value == "Hot & Spicy"){
			beeld.src = "afbeeldingen/spicy.png";
		}
		bericht.innerHTML= `U kiest: ${e.target.value}`;
})
