const sliderValue = document.querySelector('#sliderValue');
const sliderResults = document.querySelector('#sliderResults');
const stijlen = document.querySelector('#stijlen');
const kleur = document.querySelector('#color');
const knoppen = document.getElementById('knoppen');
const textbox = document.querySelector('#textbox');

sliderResults.innerHTML = sliderValue.value + "px";

sliderValue.addEventListener('input', newSize);

function newSize() {
    sliderResults.innerHTML = sliderValue.value + "px";
    textbox.style.fontSize = this.value + "px";
}

kleur.addEventListener('input', newKleur);

function newKleur() {
    textbox.style.color = this.value;
}

stijlen.addEventListener('click', function (e) {
    if (e.target.value == "bold") {
        textbox.classList.toggle("vet");
    } else if (e.target.value == "italic") {
        textbox.classList.toggle("schuin");
    } else if (e.target.value == "uppercase") {
        textbox.classList.toggle("hoofdletters");
    }
});

knoppen.addEventListener('click', function (f) {
    f.preventDefault();
    if (f.target.value == "shadow") {
        f.target.classList.toggle("deButtons");
        textbox.classList.toggle("stijlShadowSelec");
    } else if (f.target.value == "multiColor") {
        f.target.classList.toggle("deButtons");
        textbox.classList.toggle("stijlMultiColor");
    } else if (f.target.value == "reverse") {
        f.target.classList.toggle("deButtons");
        textbox.classList.toggle("stijlReverse");
    }
});