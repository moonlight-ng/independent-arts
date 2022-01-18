// Inspired by https://codepen.io/falldowngoboone/pen/PwzPYv
var stage = document.getElementById('hero');
var dots = [];
var mouse = {
  x: 0,
  y: 0,
};
var Dot = function(x, y) {
  this.x = 0;
  this.y = 0;
  const node = document.createElement('div');
  node.style.width = '10px';
  node.style.height = '10px';
  node.style.background = 'black';
  node.style.position = 'absolute';
  this.node = node;
  stage.appendChild(node);
};
Dot.prototype.draw = function() {
  var x = Math.round(this.x / 10) * 10;
  var y = Math.round(this.y / 10) * 10;
  this.node.style.left = x + 'px';
  this.node.style.top = y + 'px';
};
for (var i = 0; i < 12; i++) {
  dots.push(new Dot());
}
function render() {
  var x = mouse.x;
  var y = mouse.y;
  dots.forEach(function(dot, index, dots) {
    dot.x = x;
    dot.y = y;
    dot.draw();
    var nextDot = dots[index + 1] || dots[0];
    x += (nextDot.x - dot.x) * .6;
    y += (nextDot.y - dot.y) * .6;
  });
}
var freeZones = ['BODY', 'HEADER', 'NAV', 'MAIN', 'SECTION', 'SUMMARY', 'DETAILS'];
function moveDots(event) {
  if (freeZones.includes(event.target.tagName)) {
    mouse.x = event.pageX;
    mouse.y = event.pageY;
  }
}
stage.addEventListener('mousemove', moveDots);
stage.addEventListener('touchmove', moveDots);
function animate() {
  render();
  requestAnimationFrame(animate);
}
animate();