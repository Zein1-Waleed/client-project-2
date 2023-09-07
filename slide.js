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
      intervalId = setInterval(autoSlide, 5000);
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
