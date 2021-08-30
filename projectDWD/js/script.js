const canvas = document.getElementById('canvas1');
const btnReveal = document.getElementById('#btnReveal');
var indices = document.querySelector('#indices');
var answer = document.querySelector('#answer');
var verse = document.querySelector('#bijbelvers');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;



const keys = [];

const player = 
{
    x: 0, 
    y:0,
    width:32,
    height:48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const corpse = 
{
    x: 400, 
    y:250,
    width:35,
    height:54,
    frameX: 0,
    frameY: 0,
    speed: 0,
    moving: false
};




const knife = 
{
    x:200,
    y:250,
    width:525,
    height: 400,
    frameX: 0,
    frameY:0,
    speed:0,
    moving: false

};
const kast = 
{
    x:150,
    y:0,
    width:118,
    height: 47,
    frameX: 0,
    frameY:0,
    speed:0,
    moving: false

};
const enveloppe = 
{
    x:700,
    y:50,
    width:880,
    height: 730,
    frameX: 0,
    frameY:0,
    speed:0,
    moving: false

};
const parchemin = 
{
    x:300,
    y:420,
    width:310,
    height: 186,
    frameX: 0,
    frameY:0,
    speed:0,
    moving: false

};

const raizo = 
{
    x: 300, 
    y:75,
    width:32,
    height:48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};
const keiko = 
{
    x: 600, 
    y:250,
    width:32,
    height:48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};
const sanada = 
{
    x: 720, 
    y:400,
    width:32,
    height:48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const sakurana = 
{
    x: 75, 
    y:400,
    width:32,
    height:48,
    frameX: 0,
    frameY: 0,
    speed: 9,
    moving: false
};

const background = new Image ();
background.src = "img/chess.png";

const playerSprite = new Image();
playerSprite.src = "img/detective.png";

const corpseSprite = new Image();
corpseSprite.src = "img/corpse.png";

const knifeSprite = new Image();
knifeSprite.src = "img/knife.png";

const kastSprite = new Image();
kastSprite.src = "img/kast.png";

const enveloppeSprite = new Image();
enveloppeSprite.src = "img/envelope.png";


const parcheminSprite = new Image();
parcheminSprite.src="img/parchemin.jpg";


const raizoSprite = new Image();
raizoSprite.src = "img/raizo.png";

const keikoSprite = new Image();
keikoSprite.src = "img/keiko.png";

const sanadaSprite = new Image();
sanadaSprite.src = "img/cook.png";


const sakuranaSprite = new Image();
sakuranaSprite.src = "img/sakurana.png";

/*
bronnen: 
Dynamic Web Development:
https://www.youtube.com/playlist?list=PLYfkd2Gq0ciH6E8ZFeFH7zvbgePz2FEl4
How to Make a Game with JavaScript and HTML Canvas | Keyboard Input & Sprite Animation [Vanilla JS]:
https://www.youtube.com/watch?v=EYf_JwzwTlQ
Sprite sheets:
http://untamed.wild-refuge.net/rmxpresources.php?characters
Collision detection 2D:
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*/

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){
    ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);  
    drawSprite(corpseSprite, 0,0, corpse.width, corpse.height, corpse.x, corpse.y, 60, 70);
    drawSprite(knifeSprite, 0,0, knife.width, knife.height, knife.x, knife.y, 65, 56);
    drawSprite(kastSprite, 0,0, kast.width, kast.height, kast.x, kast.y, 150, 60);
    drawSprite(parcheminSprite, 0,0, parchemin.width, parchemin.height, parchemin.x, parchemin.y, 60, 60);
    drawSprite(keikoSprite, 0,0, keiko.width, keiko.height, keiko.x, keiko.y, 50, 60);
    drawSprite(sanadaSprite, 0,0, sanada.width, sanada.height, sanada.x, sanada.y, 50, 60);
    drawSprite(sakuranaSprite, 0,0, sakurana.width, sakurana.height, sakurana.x, sakurana.y, 50, 60);
    drawSprite(enveloppeSprite, 0,0, enveloppe.width, enveloppe.height, enveloppe.x, enveloppe.y, 50, 50);
    drawSprite(raizoSprite, 0,0, raizo.width, raizo.height, raizo.x, raizo.y, 50, 50);
    drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, 50, 60);  
    requestAnimationFrame(animate);
    movePlayer();
    revealIndices();

}
animate();

window.addEventListener ("keydown", function (e){
    keys[e.keyCode] = true;
});
window.addEventListener ("keyup", function (e){
    delete keys[e.keyCode];
});

function movePlayer(){
    if(keys[38] && player.y > 0){
        player.y -= player.speed;
        player.frameY = 3;
    }
  
    if(keys[37] && player.x > 0){
        player.x -= player.speed;
        player.frameY = 1;
    }
    
    if(keys[40] && player.y < 500 - player.height){
        player.y += player.speed;
        player.frameY = 0;
    }
    if(keys[39] && player.x < 800 - player.width){
        player.x += player.speed;
        player.frameY = 2;
    }
}
function revealIndices(){
    if(player.x < corpse.x + player.width &&
    player.x + player.width > corpse.x &&
    player.y < corpse.y + corpse.height &&
    player.y + player.height > corpse.y) 
    {
        indices.innerHTML = "Saori was niet de allerliefste, maar dit verdiende ze niet. Als ik het lichaam analyseer, zie ik dat er bloed ligt rond het lijk, vooral aan de keel van het slachtoffer. Daar bevindt de snijwonde zich…maar ik zie dat de lippen van Saori ook wat paars zien. Hoe zou dat komen? ";
    }
    if(player.x < enveloppe.x + player.width &&
    player.x + player.width > enveloppe.x &&
    player.y < enveloppe.y + enveloppe.height &&
    player.y + player.height > enveloppe.y) 
    {
        indices.innerHTML = "Saori werd hier blijkbaar uitgenodigd, zo leest de brief als volgt: “Hey Lisa, al heel lang wil ik je vertellen wat op mijn hart ligt. Ik schrijf u deze brief omdat ik me niet meer kan inhouden. Ontmoet me vanaf om 8 uur in de living. Raïzo.”";
    }
    if(player.x < kast.x + player.width &&
    player.x + player.width > kast.x &&
    player.y < kast.y + kast.height &&
    player.y + player.height > kast.y) 
    {
        indices.innerHTML = "Er liggen hier allerlei chemische producten, slik iets verkeerd in en op een uur tijd verlaat je deze wereld. ";
    }
    
    
    if(player.x < knife.x + player.width &&
    player.x + player.width > knife.x &&
    player.y < knife.y + knife.height &&
    player.y + player.height > knife.y) 
    {
        indices.innerHTML = "De moordenaar heeft hoogstwaarschijnlijk deze mes gebruikt om de keel van het slachtoffer open te snijden. Ik ben vrij zeker dat deze mes van de keuken komt.";
    }

    if(player.x < parchemin.x + player.width &&
    player.x + player.width > parchemin.x &&
    player.y < parchemin.y + parchemin.height &&
    player.y + player.height > parchemin.y) 
    {
        indices.innerHTML = "De planning staat hierop. Blijkbaar eten we om 7 uur en is Sanada verantwoordelijk voor wat we zullen eten. Bovendien is hij ook degene die het eten serveerde.";
    }
    if(player.x < raizo.x + player.width &&
    player.x + player.width > raizo.x &&
    player.y < raizo.y + raizo.height &&
    player.y + player.height > raizo.y) 
    {
        indices.innerHTML = "Raïzo: “Ik heb ook een brief gekregen, maar die was van Saori. Ze vroeg me om naar hier te komen om 8 uur 30.” Dat maakt van hem de perfecte verdachte, maar ik ga mijn conclusie niet te snel trekken.";
    }
    if(player.x < keiko.x + player.width &&
    player.x + player.width > keiko.x &&
    player.y < keiko.y + keiko.height &&
    player.y + player.height > keiko.y) 
    {
        indices.innerHTML = "Keiko: “Ik heb de hele dag gespendeerd met Saori, alles ging goed en ze keek uit naar het avondmaal. Ze heeft goed gegeten alleen vond ze dat het water een vreemde smaak had. Ik vond persoonlijk van niet.”";
    }
    if(player.x < sanada.x + player.width &&
    player.x + player.width > sanada.x &&
    player.y < sanada.y + sanada.height &&
    player.y + player.height > sanada.y) 
    {
        indices.innerHTML = " Sanada: “Wat net gebeurd is, is heel erg. Ik ben een hele tijd in de keuken geweest, maar als ik kan helpen laat het me maar weten!”";
    }
                            
    if(player.x < sakurana.x + player.width &&
    player.x + player.width > sakurana.x &&
    player.y < sakurana.y + sakurana.height &&
    player.y + player.height > sakurana.y) 
    {
        indices.innerHTML = "Sakurana: “Ik heb gehoord dat Sanada al een tijdje verliefd is op Saori, maar dat ze hem had uitgelachen toen hij het aanvroeg. Ze had gelachen met zijn thuissituatie en het feit dat hij redelijk arm is.”";
    }
    
}
    
function reveal(){
    if(document.getElementById('sanada').checked && document.getElementById('vergif').checked){

        document.getElementById("answer").innerHTML = "Uw antwoorden zijn juist, dit is wat er gebeurd is: Het slachtoffer werd vergiftigd, maar de moord werd gemaskerd door de snijwonde en het mes. De moordenaar is de kook, Sanada. Hij heeft het proberen steken op iemand anders (Raïzo) door brieven te schrijven waarin hij een afspraak regelt tussen het slachtoffer, Saori, en iemand anders. De reden waarom, is omdat hij vroeger afgewezen werd door haar.Proficiat, het is u gelukt de moord op te lossen. Je bent een echte detective en Sherlock Holmes mag jaloers zijn!";
    }
    else{
        document.getElementById("answer").innerHTML = "U bent er bijna. Blijf zoeken en u zult de waarheid onthullen. Mijn verwachtingen zijn hoog, stel me niet teleur jonge detective.";
    }
}


/*API*/

// fetch settings
let url2 = 'https://ajith-holy-bible.p.rapidapi.com/GetVerses?VerseTo=8&VerseFrom=5&chapter=1&Book=Luke';
let options2 = {
    "method": "GET",
"headers": {
"x-rapidapi-key": "8c8007cea7msh4496df1616791c3p175918jsndd45fa655d98",
"x-rapidapi-host": "ajith-holy-bible.p.rapidapi.com"
}
};
// fetch url
fetch(url2, options2)
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
    verse.innerHTML =  data.Output;}