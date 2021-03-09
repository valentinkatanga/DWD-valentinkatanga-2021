let pw = true;
	
	if (pw.Length < 9) return false;
	if (pw.Contains("@")) return false;
	if (pw == "password") return false;
	return true;


let passwoorden = [];
passwoorden = 'klepketoe', 'test' , 'Azerty123', 'rogier@work', 'paswoord', 'Misternasty', 'pwnz0red';

console.log('Alle paswoorden: ')
for(let i = 0; i < passwoorden.Length; i++)
{
	console.log(` ${i} + ${1}. ${passwoorden[i]}`)
}
console.log()

let WelOk;
let nietOk;

for(let pw in passwoorden)
{
if(pw = true)
{
WelOk.push(pw)
}
else
{
WelOk.push(pw)
}
}
console.log(`Ok: " + ${welOk.join(', ')}`);
console.log(`Niet ok: " + ${nietOk.join(', ')}`);