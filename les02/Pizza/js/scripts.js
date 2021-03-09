const keuze = document.querySelector('#keuze')
const smaken = document.querySelectorAll('#smaken ')

smaken.forEach(radio => {
	radio.addEventListener('click', function(e)
	{
	keuze.innerHTML = `${e.target.radio} is uw keuze ` ;
	});

});