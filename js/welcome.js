// Şifre kontrolü
const form = document.getElementById("loginForm");
const correctPassword = "30122022";

form.addEventListener("submit", function(e) {
  e.preventDefault();
  const enteredPassword = document.getElementById("password").value;
  if (enteredPassword === correctPassword || enteredPassword === "301222") {
    window.location.href = "index.html";
  } else {
    alert("Yanlış şifre!");
  }
});

//

// Arka plan resimlerinin hareketi
const images = document.querySelectorAll('.bg-image');
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

const imageData = Array.from(images).map(img => {
  return {
    el: img,
    x: Math.random() * screenWidth,
    y: Math.random() * screenHeight,
    dx: (Math.random() - 0.5) * 1.5,
    dy: (Math.random() - 0.5) * 1.5,
    rotation: 0,
    dRotation: (Math.random() - 0.5) * 1.5
  };
});

function animate() {
  imageData.forEach(data => {
    data.x += data.dx;
    data.y += data.dy;
    data.rotation += data.dRotation;

    if (data.x <= 0 || data.x + 60 >= screenWidth) data.dx *= -1;
    if (data.y <= 0 || data.y + 60 >= screenHeight) data.dy *= -1;

    data.el.style.left = data.x + "px";
    data.el.style.top = data.y + "px";
    data.el.style.transform = `rotate(${data.rotation}deg)`;
  });

  requestAnimationFrame(animate);
}

animate();

// Kalp oluşturma

function createHeart(x, y) {
const count = Math.floor(Math.random() * 3) + 3; // 3–5 kalp
for (let i = 0; i < count; i++) {
  const heart = document.createElement("div");
  heart.className = "heart";

  const offsetX = (Math.random() - 0.5) * 100; // -50px ile +50px arası
  const offsetY = (Math.random() - 0.5) * 100;

  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;
  heart.style.setProperty('--x', `${offsetX}px`);
  heart.style.setProperty('--y', `${offsetY}px`);
  heart.style.animation = `floatHeart 0.8s ease-out forwards`;

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 800);
}
}

// Mouse için
document.addEventListener("click", (e) => {
createHeart(e.clientX, e.clientY);
});

// Dokunmatik için
document.addEventListener("touchstart", (e) => {
for (let touch of e.touches) {
  createHeart(touch.clientX, touch.clientY);
}
});