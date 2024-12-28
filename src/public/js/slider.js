let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slider__image");
let prevBtn = document.querySelector(".slider__prev");
let nextBtn = document.querySelector(".slider__next");
let startX = 0;
let endX = 0;
let currentIndex = 0;
let totalSlides = slides.length;
let autoPlayInterval = null;
let isSliding = false;

function updateImageSource() {
  const isSmallScreen = window.innerWidth <= 700;
  slides.forEach((image) => {
    const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
    if (image.src !== newSrc) image.src = newSrc;
  });
}

// Update slider position
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Update transition effect
function updateTransition() {
  slider.style.transition = "transform 0.5s ease";
}

// Start auto play
function startAutoPlay() {
  if (!autoPlayInterval) {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }
}

// Go to the previous slide
function prevSlide() {
  if (isSliding) return; // Chặn khi đang chạy
  isSliding = true;

  stopAutoPlay();
  if (currentIndex === 0) {
    slider.style.transition = "none";
    currentIndex = totalSlides - 1;
  } else {
    updateTransition();
    currentIndex--;
  }
  updateSlider();

  setTimeout(() => {
    isSliding = false; // Hoàn tất
  }, 500);

  startAutoPlay();
}

// Go to the next slide
function nextSlide() {
  if (isSliding) return;
  isSliding = true;

  stopAutoPlay();
  if (currentIndex === totalSlides - 1) {
    slider.style.transition = "none";
    currentIndex = 0;
  } else {
    updateTransition();
    currentIndex++;
  }
  updateSlider();

  setTimeout(() => {
    isSliding = false;
  }, 500);

  startAutoPlay();
}

// Stop autoplay
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
}

// Prevent dragging images
slides.forEach((image) => {
  image.addEventListener("dragstart", (e) => e.preventDefault());
});

// Handle touch start
function handleTouchStart(e) {
  startX = e.changedTouches[0].screenX;
}

// Handle touch end
function handleTouchEnd(e) {
  endX = e.changedTouches[0].screenX;
  const swipeDistance = startX - endX;

  if (swipeDistance > 50) {
    stopAutoPlay();
    nextSlide();
  } else if (swipeDistance < -50) {
    stopAutoPlay();
    prevSlide();
  }
}

let isMouseDown = false;
let mouseStartX = 0;

// Handle mouse down
function handleMouseDown(e) {
  isMouseDown = true;
  mouseStartX = e.clientX;
  stopAutoPlay();
}

// Handle mouse up
function handleMouseUp(e) {
  if (isMouseDown) {
    const mouseEndX = e.clientX;
    if (mouseStartX > mouseEndX + 50) {
      stopAutoPlay();
      nextSlide();
    } else if (mouseStartX < mouseEndX - 50) {
      stopAutoPlay();
      prevSlide();
    }
    isMouseDown = false;
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", updateImageSource);

  prevBtn.removeEventListener("click", prevSlide);
  nextBtn.removeEventListener("click", nextSlide);

  prevBtn.addEventListener("click", () => {
    console.log("Prev Clicked", currentIndex);
    prevSlide();
  });

  nextBtn.addEventListener("click", () => {
    console.log("Next Clicked", currentIndex);
    nextSlide();
  });

  slider.addEventListener("mousedown", handleMouseDown);
  slider.addEventListener("mouseup", handleMouseUp);
  slider.addEventListener("touchstart", handleTouchStart);
  slider.addEventListener("touchend", handleTouchEnd);
  
  updateImageSource();
  updateSlider();
  startAutoPlay();
  
});
