AOS.init();
var btnScroll = document.getElementById('btn-scroll');
window.onscroll = function () {
  if (window.pageYOffset >= 20) {
    btnScroll.style.display = 'block';
  } else {
    btnScroll.style.display = 'none';
  }

};
btnScroll.onclick = function () {
  window.scrollTo(0, 0);
};