$(document).ready(function () {
  if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.topnav .navbar-header').removeClass('animated fadeInDown');
    $('.navbar-collapse').removeClass('animated fadeInDown');
    $('.whatsapp').attr('href', 'tel:+447437001008');
  } else {
    $('.whatsapp').attr('href', '/messaging.html');
  }
})
