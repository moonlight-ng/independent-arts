// Fade nav menu on scroll
var menu = document.getElementById('menu');
var isVisible = true;
var offset = 100;
window.addEventListener('scroll', function() {
  if (isVisible & (window.scrollY > offset)) {
    menu.style.opacity = 0;
    isVisible = false;
  } else if (window.scrollY < offset) {
    menu.style.opacity = 1;
    isVisible = true;
  }
});