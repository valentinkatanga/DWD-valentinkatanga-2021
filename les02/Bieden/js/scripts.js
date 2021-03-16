let Hbieder;
let Hbod=0;
const formulier = document.querySelector('#formulier')
const bericht = document.querySelector('#message') 
const bieder = document.querySelector('#biedernaam')
const bod = document.querySelector('#aantal')

formulier.addEventListener('submit', function (e) 

{
e.preventDefault();


if (bod.value > Hbod)
{
Hbod = parseInt(bod.value);
Hbieder = bieder.value;
bericht.innerHTML = "Bravo, u hebt de hoogste bod. Als niemand meer biedt, zal deze Zeldavaas van u zijn!"
}


else 
{
bericht.innerHTML = `Sorry, ${Hbieder} heeft hogere bod. Verzamel wat meer geld en kom terug :) `
}
	
}
)
