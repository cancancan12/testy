const canvas = document.getElementById("stars");
    const ctx = canvas.getContext("2d");

    let stars = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Yıldız oluştur
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        dx: Math.random() * 0.2 - 0.1,
        dy: Math.random() * 0.2 - 0.05,
        opacity: Math.random()
      });
    }

    function drawStars() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        // Ekran dışına çıkarsa başa al
        if (star.x < 0 || star.x > canvas.width) star.x = Math.random() * canvas.width;
        if (star.y < 0 || star.y > canvas.height) star.y = Math.random() * canvas.height;
      });

      requestAnimationFrame(drawStars);
    }

    drawStars();

    const moonCanvas = document.getElementById("moonCanvas");
  const moonCtx = moonCanvas.getContext("2d");

  // Canvas boyutu ayarla
  moonCanvas.width = 100;
  moonCanvas.height = 100;

  function drawMoon() {
    moonCtx.clearRect(0, 0, 100, 100);

    // Arka plandaki büyük daire (tam ay)
    moonCtx.beginPath();
    moonCtx.arc(50, 50, 40, 0, Math.PI * 2); // büyük daire
    moonCtx.fillStyle = "#fff8dc"; // açık krem
    moonCtx.fill();

    // Önündeki kesici küçük daire (karanlık taraf)
    moonCtx.beginPath();
    moonCtx.arc(60, 50, 40, 0, Math.PI * 2); // biraz sağa kaymış
    moonCtx.fillStyle = "#0d0d0d"; // arka planla aynı renk
    moonCtx.fill();

    // Hafif bir parlama efekti
    moonCtx.shadowColor = "rgba(255,255,255,0.3)";
    moonCtx.shadowBlur = 10;
  }

  drawMoon();

  //

  const canvass = document.getElementById("towerCanvas");
  const ctxx = canvass.getContext("2d");

  canvass.width = 100;
  canvass.height = window.innerHeight;

  const maxBlocks = 7;
  const blocks = [];
  let lastBlockTime = 0;

  function randomStoneBlock(yPos) {
    const width = 40 + Math.random() * 30;  // 40 - 70 px
    const height = 20 + Math.random() * 15; // 20 - 35 px
    const x = 50 - width / 2 + (Math.random() * 10 - 5); // hafif yana kayık
    const y = yPos;
    const color = `hsl(30, 10%, ${40 + Math.random() * 30}%)`; // taş tonları (gri-kahve)

    return { x, y, width, height, color };
  }

  function drawBlock(block) {
    ctxx.fillStyle = block.color;
    ctxx.beginPath();
    ctxx.moveTo(block.x + Math.random() * 5, block.y); // üst kenar hafif girinti çıkıntı
    ctxx.lineTo(block.x + block.width, block.y + Math.random() * 5);
    ctxx.lineTo(block.x + block.width - Math.random() * 5, block.y + block.height);
    ctxx.lineTo(block.x, block.y + block.height - Math.random() * 5);
    ctxx.closePath();
    ctxx.fill();
  }

  function animate(timestamp) {
    ctxx.clearRect(0, 0, canvas.width, canvas.height);

    // her 500ms yeni taş ekle
    if (timestamp - lastBlockTime > 500) {
      if (blocks.length >= maxBlocks) {
        blocks.length = 0; // reset
      }
      const y = canvass.height - (blocks.length + 1) * 30;
      blocks.push(randomStoneBlock(y));
      lastBlockTime = timestamp;
    }

    // her taşı çiz
    for (let i = 0; i < blocks.length; i++) {
      drawBlock(blocks[i]);
    }

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  let slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  let slideInterval = setInterval(nextSlide, 4000); // 4 saniyede bir değiş

  function showSlide(index) {
    slides.forEach(slide => {
      slide.style.display = 'none';
      slide.style.opacity = 0;
    });
    slides[index].style.display = 'flex';
    setTimeout(() => {
      slides[index].style.opacity = 1;
    }, 10); // küçük bir gecikme, yoksa transition çalışmaz
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }

  document.getElementById('nextBtn').addEventListener('click', () => {
    clearInterval(slideInterval); // elle değiştirince otomatik kaymayı sıfırla
    nextSlide();
    slideInterval = setInterval(nextSlide, 4000);
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    clearInterval(slideInterval);
    prevSlide();
    slideInterval = setInterval(nextSlide, 4000);
  });

  // Başlangıçta ilk slide'ı göster
  showSlide(currentSlide);

  let hasScrolled = false;

  // Masaüstü scroll (mouse veya touchpad)
  window.addEventListener('wheel', (e) => {
    if (!hasScrolled && e.deltaY > 10) {
      scrollToNextSection();
    }
  }, { passive: true });

  // Mobil scroll (parmakla kaydırma)
  let touchStartY = 0;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    const touchEndY = e.touches[0].clientY;
    const deltaY = touchStartY - touchEndY;

    if (!hasScrolled && deltaY > 20) {
      scrollToNextSection();
    }
  }, { passive: true });

  function scrollToNextSection() {
    hasScrolled = true;
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  }

  window.addEventListener('scroll', () => {
    const footer = document.getElementById('footerSection');
    const footerTop = footer.getBoundingClientRect().top;

    if (footerTop < window.innerHeight) {
      document.getElementById('moonCanvas').style.opacity = 1;
      document.getElementById('towerCanvas').style.opacity = 1;
    }
  });