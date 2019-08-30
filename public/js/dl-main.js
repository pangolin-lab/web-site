/** 
 * dl-main
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *   \o/\ /---~\\ ~}}
 *    _//    _// ~}
 *
 * dl-main
 * Copyright (c) 2019 Proton-team,BIGPago
 * E-mail : developer-team@tuta.io
 * https://github.com/lanbery/Bigpango
 * https://www.ppn.one
 *
 */
(function($){
  "use strict";
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 70)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });  

  $('body').scrollspy({
    target: '#mainNav',
    offset: 100
  });


  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);


})(jQuery); 
