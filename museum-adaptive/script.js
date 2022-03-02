//welcome-slider
const prevWelcome=document.getElementById('prev-arrow');
const nextWelcome=document.getElementById('next-arrow');
const slidesWelcome=document.querySelectorAll('.welcome-slide');
const paginationSqs=document.querySelectorAll('.pagination-sq');

let activeIndex=0;

const activeSlide = n =>{
    for(slide of slidesWelcome){
        slide.classList.remove('active');
    }
    slidesWelcome[n].classList.add('active')
}
const activeSq = n =>{
    for(sq of paginationSqs){
       sq.classList.remove('active');
    }
    paginationSqs[n].classList.add('active')
}
const currentSlide=(index)=>{
    activeSlide(index);
    activeSq(index)
}
const nextSlide=()=>{
    if(activeIndex==slidesWelcome.length-1){
        activeIndex=0;
        currentSlide(activeIndex);
    }
    else {
        activeIndex++;
        currentSlide(activeIndex);
    }
}
nextWelcome.addEventListener('click', nextSlide)

const prevSlide=()=>{
    if(activeIndex==0){
        activeIndex=slidesWelcome.length-1;
        currentSlide(activeIndex);
    }
    else {
        activeIndex--;
        currentSlide(activeIndex);
    }
}
prevWelcome.addEventListener('click', prevSlide)

paginationSqs.forEach((item, indexSq)=>{
    item.addEventListener('click', ()=>{
        activeIndex=indexSq;
        currentSlide(activeIndex);
    })
})

//video ranges
const ranges=document.querySelectorAll('.video-range');
  
ranges.forEach(range=>range.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
 })
)

//gallery

const pictureInnerContainer = document.querySelector('.picture-inner-container');
const img = document.createElement('img');
const arrImg=[
    'assets/img/gallery/galery1.jpg',
    'assets/img/gallery/galery2.jpg',
    'assets/img/gallery/galery3.jpg',
    'assets/img/gallery/galery4.jpg',
    'assets/img/gallery/galery5.jpg',
    'assets/img/gallery/galery6.jpg',
    'assets/img/gallery/galery7.jpg',
    'assets/img/gallery/galery8.jpg',
    'assets/img/gallery/galery9.jpg',
    'assets/img/gallery/galery10.jpg',
    'assets/img/gallery/galery11.jpg',
    'assets/img/gallery/galery12.jpg',
    'assets/img/gallery/galery13.jpg',
    'assets/img/gallery/galery14.jpg',
    'assets/img/gallery/galery15.jpg'
]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]];
    }

  }

shuffle(arrImg);

for(let i=0; i<arrImg.length;i++){
    const img = document.createElement('img');
    img.src=arrImg[i];
    img.alt = `galery ${i+1}`;
    img.classList.add('gallery-img');
    pictureInnerContainer.append(img);
}


/*
for(let i=0; i<arrImg.length;i++){
  const div=document.createElement('div');
  div.classList.add('gallery-img');
  const img = document.createElement('img');
    img.src=arrImg[i];
    img.alt = `galery ${i+1}`;
    
  div.appendChild(img);
  pictureInnerContainer.appendChild(div)
  
} 
*/

//ripple-effect
const button = document.querySelector('.submit-btn');
button.addEventListener('click', function (e) {
        const x = e.clientX-this.getBoundingClientRect().left;
        const y = e.clientY-this.getBoundingClientRect().top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.top = `${y}px`;
        ripple.style.left = `${x}px`;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 500);
    })

   //popup
   const popup=document.querySelector('.popup');
   const closeBtn=document.getElementById('close-btn');
   const openBtn=document.getElementById('buy-now');
   const popupContent=document.querySelector('.popup-content');

   function openPopup(){
       popup.classList.add('show')
   }
   function closePopup(){
        popup.classList.remove('show')
   }
   
   openBtn.addEventListener('click',openPopup );
   closeBtn.addEventListener('click', closePopup)
   popup.addEventListener('click', function(e){
    if(!e.target.closest('.popup-content')){
      closePopup();
    }
});

  //burder-menu
const navIcon=document.querySelector('.nav-icon');
const headerMenu=document.querySelector('.header-menu');
const burgerHeaderMenu=document.querySelector('.burger-header-menu');
const burger768=document.querySelector('.burger-768');
const menuLinks=document.querySelectorAll('.menu-link');
const welcomeText=document.querySelector('.welcome-text');
const welcomeSlider=document.querySelector('.welcome-slider');


navIcon.addEventListener('click',function(e){
  navIcon.classList.toggle('active');
  burgerHeaderMenu.classList.toggle('active');
  burger768.classList.toggle('active');
  welcomeText.classList.toggle('hidden');
  welcomeSlider.classList.toggle('hidden');
})

function clickOnMenu(e){
  if(navIcon.classList.contains('active')){
      navIcon.classList.remove('active');
      burgerHeaderMenu.classList.remove('active');
      burger768.classList.remove('active');
      welcomeText.classList.remove('hidden');
      welcomeSlider.classList.remove('hidden');
  }
}
if (menuLinks.length>0){
  menuLinks.forEach(menuLink=>{
      menuLink.addEventListener('click', clickOnMenu)
  })
}


//mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYmFjaGljYWRhIiwiYSI6ImNrdTZwMmY3dDBqdXYycXBhMjN1emx5bW8ifQ.lwSuy7bN343Hrhz9VwSfiQ';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/bachicada/cku6wc54b3jqf17pob9ddgm58', // style URL
center: [2.33794, 48.8613], // starting position [lng, lat]
zoom: 16 // starting zoom
});
map.addControl(new mapboxgl.NavigationControl());