let slider = document.querySelector(".slider");
let slides = document.querySelectorAll(".slider__image");
let prevBtn = document.querySelector(".slider__prev");
let nextBtn = document.querySelector(".slider__next");
let currentIndex = 0;
let totalSlides = slides.length;
let autoPlayInterval = null;
let isSliding = false;

// Cập nhật hình ảnh dựa trên kích thước màn hình
function updateImageSource() {
  const isSmallScreen = window.matchMedia("(max-width: 700px)").matches;
  slides.forEach((image) => {
    const newSrc = isSmallScreen ? image.dataset.small : image.dataset.large;
    if (image.src !== newSrc) image.src = newSrc;
  });
}

// Cập nhật vị trí slider
function updateSlider() {
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Bắt đầu autoplay
function startAutoPlay() {
  if (!autoPlayInterval) {
    autoPlayInterval = setInterval(nextSlide, 3000);
  }
}

// Dừng autoplay
function stopAutoPlay() {
  clearInterval(autoPlayInterval);
  autoPlayInterval = null;
}

// Chuyển đến slide tiếp theo
function nextSlide() {
  if (isSliding) return;
  isSliding = true;
  stopAutoPlay();

  if (currentIndex === totalSlides - 1) {
    slider.style.transition = "none";
    currentIndex = 0;
  } else {
    slider.style.transition = "transform 0.5s ease";
    currentIndex++;
  }
  updateSlider();

  setTimeout(() => {
    isSliding = false;
  }, 500);

  startAutoPlay();
}

// Chuyển đến slide trước
function prevSlide() {
  if (isSliding) return;
  isSliding = true;
  stopAutoPlay();

  if (currentIndex === 0) {
    slider.style.transition = "none";
    currentIndex = totalSlides - 1;
  } else {
    slider.style.transition = "transform 0.5s ease";
    currentIndex--;
  }
  updateSlider();

  setTimeout(() => {
    isSliding = false;
  }, 500);

  startAutoPlay();
}

// Sự kiện chuột và cảm ứng (tổng hợp)
function handleSwipe(e) {
  const isTouch = e.type.startsWith('touch');
  const start = isTouch ? e.changedTouches[0].screenX : e.clientX;
  let end = start;

  function moveEnd(e) {
    end = isTouch ? e.changedTouches[0].screenX : e.clientX;
    const swipeDistance = start - end;

    if (swipeDistance > 50) {
      nextSlide();
    } else if (swipeDistance < -50) {
      prevSlide();
    }

    if (isTouch) {
      slider.removeEventListener("touchend", moveEnd);
    } else {
      slider.removeEventListener("mouseup", moveEnd);
    }
  }

  if (isTouch) {
    slider.addEventListener("touchend", moveEnd);
  } else {
    slider.addEventListener("mouseup", moveEnd);
  }
}

// Ngăn không cho kéo ảnh
slides.forEach((image) => {
  image.addEventListener("dragstart", (e) => e.preventDefault());
});

// Sự kiện click cho nút prev và next
prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Sự kiện chuột
slider.addEventListener("mousedown", handleSwipe);

// Sự kiện cảm ứng
slider.addEventListener("touchstart", handleSwipe);

// Cập nhật ảnh và bắt đầu autoplay khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", updateImageSource);

  updateImageSource();
  updateSlider();
  startAutoPlay();
});
