var $slider = $('.slideshow .slider'),
  maxItems = $('.item', $slider).length,
  dragging = false,
  tracking,
  rightTracking,
  scrolling = false; // Add a variable to track scrolling

$sliderRight = $('.slideshow').clone().addClass('slideshow-right').appendTo($('.split-slideshow'));

rightItems = $('.item', $sliderRight).toArray();
reverseItems = rightItems.reverse();
$('.slider', $sliderRight).html('');
for (i = 0; i < maxItems; i++) {
  $(reverseItems[i]).appendTo($('.slider', $sliderRight));
}

$slider.addClass('slideshow-left');

// Add a variable to check if slider initialization is allowed
var sliderInitialized = false;

// Function to initialize the slider
function initSlider() {
  if (!sliderInitialized) {
    // Initialize the slider only once
    slideshowLeft = $('.slideshow-left').slick({
      vertical: true,
      verticalSwiping: true,
      arrows: false,
      infinite: true,
      dots: true,
      speed: 1000,
      cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
    }).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      if (!scrolling) { // Only execute if not scrolling
        if (currentSlide > nextSlide && nextSlide == 0 && currentSlide == maxItems - 1) {
          $('.slideshow-right .slider').slick('slickGoTo', -1);
          $('.slideshow-text').slick('slickGoTo', maxItems);
        } else if (currentSlide < nextSlide && currentSlide == 0 && nextSlide == maxItems - 1) {
          $('.slideshow-right .slider').slick('slickGoTo', maxItems);
          $('.slideshow-text').slick('slickGoTo', -1);
        } else {
          $('.slideshow-right .slider').slick('slickGoTo', maxItems - 1 - nextSlide);
          $('.slideshow-text').slick('slickGoTo', nextSlide);
        }
      }
    });

    // Set an interval to call autoSlide() every 5 seconds (5000 milliseconds)
    var intervalId = setInterval(autoSlide, 5000);

    // To stop the automatic sliding when the user interacts with the slider
    $slider.on('mousedown', function () {
      clearInterval(intervalId);
    });

    $slider.on('mouseup', function () {
      // Start the automatic sliding again after the user interaction
      intervalId = setInterval(autoSlide, 2000);
    });

    sliderInitialized = true; // Mark the slider as initialized
  }
}

// Function to automatically advance the slide every 5 seconds
function autoSlide() {
  if (!scrolling) { // Only execute if not scrolling
    slideshowLeft.slick('slickNext');
  }
}

// Detect touchstart event to disable the slider while scrolling
$slider.on('touchstart', function () {
  scrolling = true;
  // Initialize the slider when touchstart is detected
  initSlider();
});

// Detect touchend event to re-enable the slider after scrolling
$slider.on('touchend', function () {
  scrolling = false;
});

// Initialize the slider when the page loads
initSlider();

$('.slideshow-right .slider').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 950,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)',
  initialSlide: maxItems - 1
});
$('.slideshow-text').slick({
  swipe: false,
  vertical: true,
  arrows: false,
  infinite: true,
  speed: 900,
  cssEase: 'cubic-bezier(0.7, 0, 0.3, 1)'
});



let menu = document.getElementById("menu")
let navlist = document.getElementById("nav-list")
let navHolder = navlist.getElementsByClassName("nav-holder")[0];
let header = document.getElementsByTagName("header")[0]
function showNav(){

    navlist.classList.add("active")
}

menu.onclick = ()=>{
    showNav()
}

document.body.onclick = (e)=>{

    navlist.classList.remove("active")
    if(e.target.parentElement == menu || e.target == menu){
        showNav()
    }
}




let productsrRow = document.getElementById("products-row")

fetch("./data.json").then((e)=>e.json()).then(data =>{
  for (let i = 0; i <Object.keys(data).length;i++){
      let x = `
            <div class="name">
                <span>${data[i].name}</span>
            </div>
            <div class="image-holder">
                <div class = "image"></div>
            </div>
           <div class = "price">
           
            <span>AED:</span><span class = "price">${data[i].price}</span>
           </div>
          
      `
      let col = document.createElement('div')

      col.className = "col"
      col.innerHTML = x
      col.querySelectorAll(".image-holder .image")[0].style.backgroundImage = `url(${data[i].image})`
      productsrRow.append(col)
  }
})
setInterval(()=>{
    if (window.scrollY >= 200){
        header.classList.add("active")
    }else{
        
        header.classList.remove("active")
    }
},200)








let dots = document.getElementsByClassName("slick-dots")[0]

for (let i = 0; i < dots.children.length; i++){
    setInterval(()=>{
        dots.removeAttribute("role")
        dots.children[i].removeAttribute("role")
        dots.children[i].removeAttribute('aria-hidden')
        dots.children[i].getElementsByTagName("button")[0].removeAttribute("role")
    dots.children[i].removeAttribute('aria-selected')
    dots.children[i].removeAttribute('aria-controls')
    dots.children[i].setAttribute('aria-label',"dot")
    dots.children[i].getElementsByTagName("button")[0].setAttribute('aria-label',"dot")

},0)
}







let track = document.querySelectorAll(".slick-track")

track[0].setAttribute("aria-label","slide")
track[1].setAttribute("aria-label","slide")
track[2].setAttribute("aria-label","slide")