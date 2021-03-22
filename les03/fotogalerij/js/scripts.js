const figBig = document.querySelector('#figBig');
const thumbs = document.querySelectorAll('.thumbs div');

let slideIndex = 0;

thumbs.forEach(thn => {
   thn.addEventListener('click', function () {
      // verwijder current class van vorige thumb
      document.querySelector('.current').classList.remove('current');
      // voeg current en visited class toe aan huidige thumb
      thn.classList.add('current');
      thn.classList.add('visited');
      // pas afbeelding en beschrijving aan
      figBig.querySelector('img').src = thn.getAttribute('data-photo');
      figBig.querySelector('figcaption').innerHTML = thn.querySelector('img').alt;
   });
});

function slideShow(slideIdx){
   figBig.querySelector('img').src = thumbs[slideIdx].getAttribute('data-photo');
   figBig.querySelector('figcaption').innerHTML = thumbs[slideIdx].querySelector('img').alt;

}
addEventListener('keydown',function(e){
   if(e.key.toLocaleLowerCase() == 'arrowleft' ){
      slideIndex--;
   slideShow(slideIndex);
   }

   if(e.key.toLocaleLowerCase() == 'arrowright' ){
      slideIndex++;
   slideShow(slideIndex);
}
})
