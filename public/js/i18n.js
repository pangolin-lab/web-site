/**
 * MetaMask Support
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *  \o/\ /---~\\ ~}}
 *    _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 *
 */
$(function($){

  const CFG = {
	lang : "en",
	selector : {
		selChinese : "chinese"
	}
  };

  function InitializeI18n(){
    $("."+CFG.selector.selChinese+'[data-sign !="'+CFG.lang+'"]').removeClass('lang-active');
    $("."+CFG.selector.selChinese+'[data-sign ="'+CFG.lang+'"]').addClass('lang-active');

    $(".chinese").on('click',function(){
      $(".chinese").removeClass('lang-active');
      let lg = $(this).data('sign');
      $(this).addClass('lang-active');
      setLang(lg);
    });
    setLang(CFG.lang);
  } 

  function setLang(lg){
  	$('.i18n').each((index,el)=>{
  		var text = $(el).data(''+lg);
  		if(text){
  			$(el).text(text);
  		}
  		let url = $(el).data(lg+'url');
  		if(url){
  			$(el).attr('href',url);
  		}
  	});

  }

  InitializeI18n();

  /*$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {

    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      $('a.js-scroll-trigger[href*="#"]:not([href="#"])').removeClass('active');
      $(this).addClass('active');
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

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    //$('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  // $('body').scrollspy({
  //   target: '#mainNav',
  //   offset: 100
  // });

  // Collapse Navbar
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
  $(window).scroll(navbarCollapse);  	*/

})(jQuery);
