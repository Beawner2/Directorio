const carousel = document.querySelector('.carousel-images');
    const images = document.querySelectorAll('.carousel-images img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dotsContainer = document.querySelector('.dots');
    let index = 0;

    // Crear dots dinámicos
    images.forEach((_, i) => {
      const dot = document.createElement('span');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => moveToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dots span');

    function updateCarousel() {
      carousel.style.transform = `translateX(${-index * 100}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }

    function moveToSlide(i) {
      index = i;
      updateCarousel();
    }

    prevBtn.addEventListener('click', () => {
      index = (index > 0) ? index - 1 : images.length - 1;
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      index = (index < images.length - 1) ? index + 1 : 0;
      updateCarousel();
    });

    // Soporte táctil (para celulares)
    let startX = 0;
    let endX = 0;

    carousel.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', e => {
      endX = e.changedTouches[0].clientX;
      if (startX > endX + 50) {
        // Swipe izquierda
        index = (index < images.length - 1) ? index + 1 : 0;
        updateCarousel();
      } else if (startX < endX - 50) {
        // Swipe derecha
        index = (index > 0) ? index - 1 : images.length - 1;
        updateCarousel();
      }
    });