//welcome-slider
const prevWelcome=document.getElementById('prev-arrow');
const nextWelcome=document.getElementById('next-arrow');
const slidesWelcome=document.querySelectorAll('.welcome-slide');
const paginationSqs=document.querySelectorAll('.pagination-sq');
const activeSlideNumber=document.querySelector('.slide-number');

let activeSlide=0;
let activeIndex=0;
let isEnabled=true;

const activeSq = n =>{
  for(sq of paginationSqs){
     sq.classList.remove('active');
  }
  paginationSqs[n].classList.add('active')
}

const changeSlideNumber=(n)=>{
  activeSlideNumber.innerHTML = '0'+ (parseInt(n)+1);
}

const changeSlide = n =>{
  activeSlide=(n+slidesWelcome.length)% slidesWelcome.length;
  activeSq(activeSlide);
  changeSlideNumber(activeSlide);
}

const hideSlide=(direction)=>{
  isEnabled=false;
  slidesWelcome[activeSlide].classList.add(direction);
  slidesWelcome[activeSlide].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  })
}

const showSlide=(direction)=>{
  slidesWelcome[activeSlide].classList.add('next', direction);
  slidesWelcome[activeSlide].addEventListener('animationend', function(){
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled=true;
  })
} 

const nextSlide=(n)=>{
  hideSlide('to-right');
  changeSlide(n+1);
  showSlide('from-left');        
}

nextWelcome.addEventListener('click', function(){
if (isEnabled){
nextSlide(activeSlide);
}
});

const prevSlide=(n)=>{
  hideSlide('to-left');
  changeSlide(n-1);
  showSlide('from-right');
}
prevWelcome.addEventListener('click', function(){
  if (isEnabled){
    prevSlide(activeSlide);
  }
});

const activeSlideBullet = n =>{
  for(slide of slidesWelcome){
      slide.classList.remove('active');
  }
  slidesWelcome[n].classList.add('active')
}
const currentSlide=(index)=>{
  activeSlideBullet(index);
  activeSq(index);
}

const showSlideBullet=(direction)=>{
  slidesWelcome[activeIndex].classList.add('next', direction);
  slidesWelcome[activeIndex].addEventListener('animationend', function(){
    this.classList.remove('next', direction);
    this.classList.add('active');
    isEnabled=true;
  })
} 
const hideSlideBullet=(direction)=>{
  isEnabled=false;
  slidesWelcome[activeIndex].classList.add(direction);
  slidesWelcome[activeIndex].addEventListener('animationend', function(){
    this.classList.remove('active', direction);
  })
}
const nextSlideBullet=(n)=>{
  hideSlide('to-right');
  changeSlide(n);
  showSlide('from-left');        
}

paginationSqs.forEach((item, indexSq)=>{
  item.addEventListener('click', ()=>{
      activeIndex=indexSq;
      currentSlide(activeIndex);
      changeSlideNumber(activeIndex);
      nextSlideBullet(activeIndex);
  })
})

const swipeDetect =(el)=>{
let surface = el;
let startX =0;
let startY=0;
let distX=0;
let distY=0;
let startTime=0;
let elapsedTime=0;

let swipeDistance = 150;
let swipeHeight=100;
let allowedTime=300;

surface.addEventListener('mousedown', (e) => {
    startX = e.pageX;
    startY = e.pageY;
    startTime = new Date().getTime();
    e.preventDefault();
  }, false)

surface.addEventListener('mouseup', function(e){
  distX=e.pageX-startX;
  distY=e.pageY-startY;
  elapsedTime=new Date().getTime() - startTime;
  if(elapsedTime <=allowedTime){
    if(Math.abs(distX) >= swipeDistance && Math.abs(distY) <= swipeHeight){
      if(distX >0){
        if (isEnabled){
          nextSlide(activeSlide)
        }
      }
      else{
        if(isEnabled){
          prevSlide(activeSlide);
        }
      }
    }
  }
  e.preventDefault();
}, false);
}
var welcomeSlider= document.querySelector('.welcome-slider');
swipeDetect(welcomeSlider);

//explore-slider
function initComparisons() {
  var x, i;
  /*find all elements with an "overlay" class:*/
 const after = document.getElementsByClassName('after');
  for (i = 0; i < after.length; i++) {
    compareImages(after[i]);
  }

  function compareImages(img) {
    var scroller, img, clicked = 0, w, h;
    /*get the width and height of the img element*/
    w = img.offsetWidth;
    h = img.offsetHeight;
    /*set the width of the img element to 50%:*/
    img.style.width = (w / 2) + "px";
    /*create slider:*/
    scroller = document.querySelector('.scroller');
    scroller.style.top = (h / 2) - (scroller.offsetHeight / 2) + "px";
    scroller.style.left = (w / 2) - (scroller.offsetWidth / 2) + "px";
    
    scroller.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    /*or touched (for touch screens:*/
    scroller.addEventListener("touchstart", slideReady);
    /*and released (for touch screens:*/
    window.addEventListener("touchstop", slideFinish);

    function slideReady(e) {
      /*prevent any other actions that may occur when moving over the image:*/
      e.preventDefault();
      /*the slider is now clicked and ready to move:*/
      clicked = 1;
      /*execute a function when the slider is moved:*/
      window.addEventListener("mousemove", slideMove);
      window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
      /*the slider is no longer clicked:*/
      clicked = 0;
    }
    function slideMove(e) {
      var pos;
      /*if the slider is no longer clicked, exit this function:*/
      if (clicked == 0) return false;
      /*get the cursor's x position:*/
      pos = getCursorPos(e)
      /*prevent the slider from being positioned outside the image:*/
      if (pos < 0) pos = 0;
      if (pos > w) pos = w;
      /*execute a function that will resize the overlay image according to the cursor:*/
      slide(pos);
    }
    function getCursorPos(e) {
      var a, x = 0;
      e = e || window.event;
      /*get the x positions of the image:*/
      a = img.getBoundingClientRect();
      /*calculate the cursor's x coordinate, relative to the image:*/
      x = e.pageX - a.left;
      /*consider any page scrolling:*/
      x = x - window.pageXOffset;
      return x;
    }
    function slide(x) {
      /*resize the image:*/
      img.style.width = x + "px";
      /*position the slider:*/
      scroller.style.left = img.offsetWidth - (scroller.offsetWidth / 2) + "px";
    }
  }
}
initComparisons();

//video-player
const videoPlayer = document.getElementById('video-player');
const video = videoPlayer.querySelector('.video-container');
const toggle = videoPlayer.querySelector('.toggle-play');
const playBB = document.getElementById('play-button');
const ranges=document.querySelectorAll('.video-range');
const volumeRange = document.getElementById('volume-bar');
const videoRange=document.getElementById('video-bar');
const fullscreenButton = document.getElementById('full-screen')
const btnVolume=videoPlayer.querySelector('.volume-btn');

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
const icon = this.paused ? toggle.style.backgroundImage="url('assets/svg/video/play.svg')" : toggle.style.backgroundImage="url('assets/svg/video/pause.svg')";
toggle.style.backgroundImage = icon;
const index = this.paused ? playBB.style.zIndex = "5" : playBB.style.zIndex = "1";
playBB.style.zIndex = index;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
playBB.addEventListener('click', togglePlay);
video.addEventListener('ended', function () {
      video.currentTime = 0;
  updateButton;
  });

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

function upDateTime(){
  let percent=((100/video.duration) * video.currentTime);
  videoRange.value=percent;
  videoRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${percent}%, #C4C4C4 ${percent}%, #C4C4C4 100%)`;
}

function upDateVideo(){
video.currentTime=(video.duration * this.value)/100;
}

video.addEventListener('timeupdate', upDateTime);
videoRange.addEventListener('input', upDateVideo);

function toggleMute() {
  video.muted = !video.muted;
  if (video.muted) {
    volume.setAttribute('data-volume', volume.value);
    volume.value = 0;
    btnVolume.style.backgroundImage="url('assets/svg/video/mute.svg')";
  } else {
    volume.value = volume.dataset.volume;
    btnVolume.style.backgroundImage="url('assets/svg/video/volume.svg')";
  }
}

function updateVolButton() {
  const icon = !video.muted ? btnVolume.style.backgroundImage="url('assets/svg/video/volume.svg')" : btnVolume.style.backgroundImage="url('assets/svg/video/mute.svg')";
  btnVolume.style.backgroundImage = icon;
}
 
btnVolume.addEventListener('click', toggleMute);
btnVolume.addEventListener('click', updateVolButton);

function volUpdate(){
  video.volume=this.value;
  const value = this.value*100;
  volumeRange.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
  if(value>0){btnVolume.style.backgroundImage="url('assets/svg/video/volume.svg')";
  }else{
    btnVolume.style.backgroundImage="url('assets/svg/video/mute.svg')";
  }
}
function releaseMute(){
  if((video.muted)&&(this.value>0)){
    video.volume=this.value;
    video.muted = false;
  }
}
volumeRange.addEventListener('input', volUpdate);
volumeRange.addEventListener('input', releaseMute);
volumeRange.addEventListener('change', volUpdate);

function toggleFullScreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    videoPlayer.requestFullscreen();
  }
}

function updateFullScreen() {
  const icon = document.getElementById('video-player').requestFullscreen ? fullscreenButton.style.backgroundImage="url('assets/svg/video/fullscreen_exit.svg')" : toggle.style.backgroundImage="url('assets/svg/video/full-frame.svg')";
  fullscreenButton.style.backgroundImage = icon;
  }

fullscreenButton.addEventListener('click', toggleFullScreen);
fullscreenButton.addEventListener('click', updateFullScreen);
  
function keyboardShortcuts(event) {
  const {code} = event;
  event.preventDefault();
  switch(code) {
    case 'Space':
      togglePlay();
      break;
    case 'KeyM':
      toggleMute();
      break;
    case 'KeyF':
      toggleFullScreen();
      break;
  }
}

document.onkeydown=keyboardShortcuts;

function slowDown() {
  video.play();
  video.playbackRate = 0.5;
}

function speedUp() {
  video.play(); 
  video.playbackRate = 1,5;
}
function runOnKeys(func, ...codes) {
  let pressed = new Set();

  document.addEventListener('keydown', function(event) {
    pressed.add(event.code);
    for (let code of codes) { 
      if (!pressed.has(code)) {
        return;
      }
    }
    pressed.clear();
    func();
  });

  document.addEventListener('keyup', function(event) {
    pressed.delete(event.code);
  });
}

runOnKeys(
  () => speedUp(),
  'ShiftRight',
  'Comma')

  runOnKeys(
    () => slowDown(),
    'ShiftRight',
    'Period')

//video-slider
const videoSlides=document.querySelectorAll('.video-container');
const videoPgs=document.querySelectorAll('.video-pag-circ');
const prevAr=document.querySelector('.video-prev-pag');
const nextAr=document.querySelector('.video-next-pag');

    
//youTube slider
const videoList=document.querySelector('.video-list');
const iframes=document.querySelectorAll('.small-video');

var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads
			var array1=[];
      function onYouTubeIframeAPIReady() {
				
        array1[0] = new YT.Player('first-yt', {
          videoId:'aWmJ5DgyWPI',
          events: {
            'onStateChange': onPlayerStateChange
          }
				});
				array1[1] = new YT.Player('second-yt', {
          videoId:'Vi5D6FKhRmo',
          events: {
            'onStateChange': onPlayerStateChange
          }
				});
        array1[2] = new YT.Player('third-yt', {
          videoId:'NOhDysLnTvY',
          events: {
            'onStateChange': onPlayerStateChange
          }
				});
			}

      function onPlayerStateChange(event) {
        if (event.data == 1) {
					for (let i = 0; i < array1.length; i++) {
						if (array1[i]!=event.target) {
							//} else {
							array1[i].pauseVideo();
						}
					}
				}
      }

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
    img.classList.add('anim-no-hide');
    pictureInnerContainer.append(img);
}

const animImages = document.querySelectorAll('.gallery-img');

if(animImages.length>0){
window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params){
    for (let i=0; i<animImages.length; i++){
      const animImg=animImages[i];
      const animImgHeight=animImg.offsetHeight;
      const animImgOffset=offset(animImg).top; 
      const animStart=5;
      const scrollTopCont=window.pageYOffset || window.scrollTop;

      let animImgPoint=window.innerHeight - animImgHeight/animStart;
     
      if(animImgHeight > window.innerHeight){
        animImgPoint = window.innerHeight - window.innerHeight/animStart;
      }
      if((window.pageYOffset >= scrollTopCont) && (window.pageYOffset >= scrollTopCont)){
      if ((window.pageYOffset > (animImgOffset - animImgPoint))&& (window.pageYOffset < (animImgOffset + animImgHeight))){
        animImg.classList.add('active');
      } else{
        if(!animImg.classList.contains('anim-no-hide')){
        animImg.classList.remove('active');
        }
      }
    }
      
    }
  }
  function offset(el){
    const rect=el.getBoundingClientRect(),
    scrollLeft=window.pageXOffset || document.documentElement.scrollLeft,
    scrollLTop=window.pageYOffset || document.documentElement.scrollTop;
  return {top: rect.top + scrollLTop, left: rect.left +scrollLeft}
  }
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
//ticket Amount
const radioBtn=document.getElementsByName('radio')
const totAmount=document.getElementById('total-amount');
const countBtn=document.querySelectorAll('.count-button');
const basAmount=document.getElementById('basic-amount');
const senAmount=document.getElementById('senior-amount');
const ticketType=document.querySelectorAll('input[name="radio"]');
const inputTickets=document.querySelector('.ticket-type')
const inputs=inputTickets.getElementsByTagName('input');

function calculate(){
  let ticketPrice;
   for (type of ticketType){
     if (type.checked){
       ticketPrice=type.value;
       sessionStorage.setItem('ticket-type',type.checked)
       
     } 
   }
   totAmount.innerHTML=(ticketPrice*basAmount.value)+(ticketPrice/2*senAmount.value);
   sessionStorage.setItem('basic-amount',basAmount.value)
   sessionStorage.setItem('senior-amount',senAmount.value)
   sessionStorage.setItem('total-amount',totAmount.innerHTML)
  }
    calculate();
for (const input of inputs) {
	input.addEventListener('input', function () {
		calculate();
	});
}
for (const button of countBtn) {
	button.addEventListener('click', function () {
		calculate();
	});
}




/*
const countBtn=document.querySelectorAll('.count-button.basic');
var userValue;
countBtn.forEach(btn=>btn.addEventListener('click', function getCurrentValue(){
  var x = document.getElementById('basic-amount');
  var defaultVal = x.defaultValue;
  var currentVal = x.value;
 
  if (defaultVal == currentVal) {
    userValue=x.defaultValue;
  } else {
    userValue=currentVal;
    sessionStorage.setItem('basicAmount', userValue);
  }
}));

let sum=10*parseInt(sessionStorage.getItem('basicAmount'));
console.log(sum)
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