const character = document.querySelector('#img');
const btnPlay = document.querySelector('#btnplay');
const btnReady = document.querySelector('#btnlogin');
const txtSound = document.querySelector('#lblpercentage');
const sldSize = document.querySelector('#sldsize');
const btnFullScreen = document.querySelector('#btnfullscreen');
const btnMuteSound = document.querySelector('#btnmute');
const btnUnmuteSound = document.querySelector('#btnunmute');
const btnDarkMode = document.querySelector('#btndark');
const canvas = document.querySelector('.canvas1');
const ctx = canvas.getContext('2d');
const countdown = document.querySelector('#countdown');
const buttons = document.querySelectorAll('.options button');
const login = document.querySelector('.loginstart');
const inpAvatar = document.querySelector('#inpavatar');
const rdbCharacter1 = document.querySelector('#character1');
const rdbCharacter2 = document.querySelector('#character2');
const inpChooseCharacter1 = document.querySelector('#character1');
const inpChooseCharacter2 = document.querySelector('#character2');
const playerName = document.querySelector('#name');
const inpUsername = document.querySelector('#inpUsername');
const btnLocal = document.querySelector('#btnlogin');
const figBig = document.querySelector('#figBig');
const thumbs = document.querySelectorAll('.thumbs div');
const btnLeft = document.querySelector('#btnleft');
const btnRight = document.querySelector('#btnright');
const currentCharacter = document.querySelector('#character');
const btnGenerateRandom = document.querySelector('.btngenerate');
const avatarImg = document.querySelector('#avatarimg');
const status = document.querySelector('.gamecontainer');
const playerLife = document.querySelector('#playerhealth');
const monsterLife = document.querySelector('#monsterhealth');

window.addEventListener("load", function (event) {
    btnPlay.disabled = true;
});

window.addEventListener("keydown", function (e) {
    if (e.key.toLocaleLowerCase() == 'arrowdown' || e.key.toLocaleLowerCase() == 'arrowup') {
        e.preventDefault();
    }
});

//Geleerd op basis van: https://rogiervdl.github.io/JS-course/06_games.html#/localstorage
let inputUsername = document.getElementById("inpusername");
inputUsername.addEventListener("change", function(){
    localStorage.setItem("username", this.value);
});

if (localStorage.getItem("username")) {
    inputUsername.value = localStorage.getItem("username");
}

let sndOptions = new Audio();
sndOptions.volume = 0.1;
sndOptions.src = "snd/options.mp3"

let sndDeath = new Audio();
sndDeath.volume = 0.1;
sndDeath.src = "snd/dead.mp3";

let sndStart = new Audio();
sndStart.volume = 0.1;
sndStart.src = "snd/play.mp3";

//Options + sound foreach button
buttons.forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelector('.current').classList.remove('current');
        btn.classList.add('current');
        sndOptions.play();
    });
});

btnMuteSound.addEventListener('click', function () {
    sndStart.muted = true;
});

btnUnmuteSound.addEventListener('click', function () {
    sndStart.muted = false;
});

/*API
Generate random Username and Avatar
Button generate random values
 fetch settings*/
let url = 'https://random-user.p.rapidapi.com/getuser';
let options = {
    "headers": {
        "x-rapidapi-key": "994b50b238msh6dfad1c74f6c0b7p15229cjsn2d0a9730bd67",
        "x-rapidapi-host": "random-user.p.rapidapi.com"
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
// verwerk data
function verwerkData(data) {
    btnGenerateRandom.addEventListener('click', function () {
        inpAvatar.value = data.results[0].picture.medium;
        avatarImg.src = inpAvatar.value;
    });
}

/*Pick a player by changing image*/
let currentImg = 0;

thumbs.forEach(thn => {
    thn.addEventListener('click', function () {
        document.querySelector('.current').classList.remove('current');
        figBig.querySelector('img').src = thn.getAttribute('data-photo');
    });
});

btnLeft.addEventListener('click', function (e) {
    currentImg -= 1;
    if (currentImg == -1) {
        currentImg = 1;
    }
    afbeeldingen(currentImg);
});

btnRight.addEventListener('click', function (e) {
    currentImg -= 1;
    if (currentImg == -1) {
        currentImg = 1;
    }
    afbeeldingen(currentImg);
});

function afbeeldingen(currImg) {
    figBig.querySelector('img').src = thumbs[currImg].getAttribute('data-photo');
}


btnReady.addEventListener('click', function (e) {
    btnPlay.disabled = false;
    btnPlay.classList.remove('btnstart');
    btnPlay.classList.add('btnplay');
});

//Enemy image
const enemySprite = new Image();
enemySprite.src = "img/spriteryuk.png";

//bullet image
const bulletSprite = new Image();
bulletSprite.src = "img/bullet.png";

//Start game
btnPlay.addEventListener('click', function (e) {

    //Choose character
    const playerSprite = new Image();
    if (currentImg == 0) {
        playerSprite.src = "img/sprite.png";
        console.log(currentImg);
    } else {
        playerSprite.src = "img/sprite2.png";
        console.log(currentImg);
    }

    monsterLife.src = "gui/full-life.png";
    playerLife.src = "gui/full-life.png"; { //character parameters
        const player = {
            x: 400,
            y: 220,
            width: 32,
            height: 48,
            frameX: 0,
            frameY: 0,
            speed: 1,
            moving: false,
            alive: false,
        };

        const enemy = {
            x: 110,
            y: 300,
            width: 48,
            height: 64,
            frameX: 0,
            frameY: 0,
            speed: 0.65,
            moving: false,
            alive: false,
        }

        const bullet = {
            x: 0,
            y: 0,
            width: 32,
            height: 48,
            frameX: 0,
            frameY: 0,
            speed: 2,
            moving: false,
        };

        player.alive = true;
        enemy.alive = true;
        sndDeath.pause();
        sndDeath.currentTime = 0;
        sndStart.play();
        canvas.classList.remove('win');
        canvas.classList.remove('lose');
        btnPlay.innerHTML = 'Play game';

        //Canvas
        canvas.width = 800;
        canvas.height = 500;
        canvas.classList.add('gamestart');
        canvas.classList.remove('canvas1');
        login.classList.add('login');
        login.classList.remove('loginstart');
        inputUsername.innerHTML = '.';
        inpAvatar.innerHTML = '.';
        btnFullScreen.addEventListener('click', function () {
            canvas.requestFullscreen();
        });
        //Timer
        let time;
        let i = 300;
        let minuten;
        let seconden;

        function timer() {
            i--;
            countdown.innerHTML = Math.floor(i / 60) + ' : ' + Math.floor(i % 60);
            if (countdown.innerHTML == '0 : 0') {
                btnPlay.innerHTML = "restart game";
                canvas.classList.add('gameover');
                clearInterval(time);
                sndStart.pause();
                sndDeath.play();
            } else {
                canvas.classList.remove('gameover');
                btnPlay.innerHTML = "play game";
            }
        }
        time = setInterval(timer, 1000);

        //Character movement geleerd op bron: https://www.youtube.com/watch?v=EYf_JwzwTlQ&t=923s
        const keys = [];



        function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
            ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
        }

        //Character animation
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (bullet.moving) {
                drawSprite(bulletSprite, bullet.width * bullet.frameX, bullet.height * bullet.frameY, bullet.width, bullet.height, bullet.x, bullet.y, bullet.width, bullet.height);
                moveBullet();
            }
            if (player.alive) {
                drawSprite(playerSprite, player.width * player.frameX, player.height * player.frameY, player.width, player.height, player.x, player.y, player.width, player.height);
            }
            if (enemy.alive) {
                drawSprite(enemySprite, enemy.width * enemy.frameX, enemy.height * enemy.frameY, enemy.width, enemy.height, enemy.x, enemy.y, enemy.width, enemy.height);
            }
            movePlayer();
            moveEnnemy();
            gameOver();
            playerShoot();
            requestAnimationFrame(animate);
            handlePlayerFrame();
        }
        animate();

        //Animation On/Off wanneer ik op een toets druk of niet.
        function handlePlayerFrame() {
            if (player.frameX < 3 && player.moving) {
                player.frameX++;
            } else player.frameX = 0;

        }

        window.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
            player.moving = true;
        });

        window.addEventListener("keyup", function (e) {
            delete keys[e.keyCode];
            player.moving = false;
        });

        //character movement
        function movePlayer(e) {
            if (keys[38] && player.y > 0) {
                player.y -= player.speed;
                player.frameY = 3;
            }

            if (keys[37] && player.x > 20) {
                player.x -= player.speed;
                player.frameY = 1;
            }

            if (keys[40] && player.y < canvas.height - 80) {
                player.y += player.speed;
                player.frameY = 0;
            }

            if (keys[39] && player.x < canvas.width - 52) {
                player.x += player.speed;
                player.frameY = 2;
            }
        }
        //Hier bereken ik het afstand tussen onze enemy en speler en laat ik onze monster naar ons speler lopen. 
        function moveEnnemy() {
            let differencex = enemy.x - player.x;
            let differencey = enemy.y - player.y;

            if (differencey > 0) {
                enemy.frameY = 3;
                enemy.y -= enemy.speed;
            } else {
                enemy.frameY = 0;
                enemy.y += enemy.speed;
            }
            if (differencex > 0) {
                enemy.frameY = 1;
                enemy.x -= enemy.speed;
            } else {
                enemy.frameY = 2;
                enemy.x += enemy.speed;
            }
        }

        function moveBullet() {
            if (bullet.frameY == 3) {
                bullet.y -= bullet.speed;
            }
            if (bullet.frameY == 1) {
                bullet.x -= bullet.speed;
            }
            if (bullet.frameY == 0) {
                bullet.y += bullet.speed;
            }
            if (bullet.frameY == 2) {
                bullet.x += bullet.speed;
            }
            if (bullet.x > 830 || bullet.y > 563 || bullet.x < 0 ||  bullet.y < 0) {
                bullet.moving = false;
            }
        }

        function playerShoot() {
            if (keys[89] && bullet.moving == false) {
                bullet.moving = true;
                bullet.frameY = player.frameY;
                bullet.y = player.y;
                bullet.x = player.x;
            }
        }

        let PlayerHealthTimer = 200
        let Playerhealth = 3
        let MonsterHealthTimer = 200
        let Monsterhealth = 3
        /*
        Collision detection geleerd op:
        https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
        */
        function gameOver() {

            if (player.x < enemy.x + player.width &&
                player.x + player.width > enemy.x &&
                player.y < enemy.y + enemy.height &&
                player.y + player.height > enemy.y) {
                PlayerHealthTimer--;
                if (PlayerHealthTimer == 0) {
                    Playerhealth--;
                }
                if (PlayerHealthTimer == -200) {
                    Playerhealth--;
                }
                if (PlayerHealthTimer == -400) {
                    Playerhealth--;
                }
                if (PlayerHealthTimer == -600) {
                    Playerhealth--;
                }
                if (Playerhealth == 3) {
                    playerLife.src = "gui/full-life.png";
                    playerLife.style.width = "280px";
                    playerLife.style.height = "72px";
                } else if (Playerhealth == 2) {
                    playerLife.src = "gui/mid-life.png";
                    playerLife.style.width = "280px";
                    playerLife.style.height = "72px";
                } else if (Playerhealth == 1) {
                    playerLife.src = "gui/low-life.png";
                    playerLife.style.width = "280px";
                    playerLife.style.height = "72px";
                }
                if (Playerhealth == 0) {
                    btnPlay.innerHTML = "restart game";
                    playerSprite.style.display = "none";
                    enemySprite.style.display = "none";
                    canvas.classList.add('lose');
                    clearInterval(time);
                    player.alive = false;
                    monster.alive = false;
                    sndStart.pause();
                    sndDeath.play();
                }
            }
            if (bullet.x < enemy.x + bullet.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y) {
                bullet.moving = false;
                MonsterHealthTimer--;
                if (MonsterHealthTimer == 0 || MonsterHealthTimer == -200 || MonsterHealthTimer == -400) {
                    Monsterhealth--;
                    console.log(MonsterHealthTimer);
                    console.log(Monsterhealth);
                }
                if (Monsterhealth == 3) {
                    monsterLife.src = "gui/full-life.png";
                    monsterLife.style.width = "280px";
                    monsterLife.style.height = "72px";
                } else if (Monsterhealth == 2) {
                    monsterLife.src = "gui/mid-life.png";
                    monsterLife.style.width = "280px";
                    monsterLife.style.height = "72px";
                } else if (Monsterhealth == 1) {
                    monsterLife.src = "gui/low-life.png";
                    monsterLife.style.width = "280px";
                    monsterLife.style.height = "72px";
                }
                if (Monsterhealth == 0) {
                    btnPlay.innerHTML = "restart game";
                    canvas.classList.add('win');
                    clearInterval(time);
                    player.alive = false;
                    monster.alive = false;
                    sndStart.pause();
                    sndDeath.play();
                }
            }
        }
        sldSize.addEventListener('click', function () {
            txtSound.innerHTML = sldSize.value + '%';
            let sound = sldSize.value / 100;
            sndStart.volume = sound;
        });
    }
});