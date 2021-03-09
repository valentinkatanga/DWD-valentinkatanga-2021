let Hbieder;
let Hbod;
Hbod = 0;
const pagina = document.querySelector('#pagina')
const formulier = document.querySelector('#formulier')
const bieder = document.querySelector('#bieder')
const message = document.querySelector('#message') 
const bod = document.querySelector('#bod')

formulier.addEventListener('submit', function (e) 

{
e.preventDefault();
message.innerHTML="Niemand heeft een gebod geplaatst"

if (bod.value> Hbod)
{
Hbod = bod.value;
Hbieder = bieder.value;
message.innerHTML = "bravo, u hebt de hoogste bod"
}


else 
{
message.innerHTML = `sorry, ${Hbieder} heeft hogere bod `
}
	
}
)
