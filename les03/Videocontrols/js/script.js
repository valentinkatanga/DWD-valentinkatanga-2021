var amv = document.getElementById("amv"); 
var sliderrange = document.getElementById("sliderrange");
var slider = document.getElementById("slider");
var verrassing = document.getElementById("verrassing");
var checkBx = document.getElementById("checkBx")

function playVid() { 
 amv.play(); 
} 

function pauseVid() { 
  amv.pause(); 
}
function rewindVid() { 
	document.getElementById("amv").load() 
}


sliderrange.oninput = function()
{
sliderrange.innerHTML = this.nodeValue;
amv.volume = this.value/100;
}  

