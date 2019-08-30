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
const CFG = {
  lang : "en",
  selector : {
	selChinese : "chinese"
  },

  github : {
  	cssSelector:".GithubDownload",
  	pubBase:"https://github.com/BIGPango/pangolink/releases/download",
  	pubVersion:"v1.2",
  	pubFile:"pangolin-release.apk",
  	wxBrowser:"wx_dl_cn.html"
  },
  getGithubHref:function(type){
  	return type ? CFG.wxBrowser :  CFG.github.pubBase+'/' + CFG.github.pubVersion + "/" + CFG.github.pubFile;
  }
};

var DownloadMain = {
  isWxBrowser:false,
  isQQInstall:false,
  isQQBrowser:false,
  slogan_cn:'<h1>免费下载</h1>',
  slogan_en:'<h1>Download For Free</h1>',
  initBrowserType : function(){
  	//console.log("init DownloadMain >>>>>>");
	var ua = navigator.userAgent.toLowerCase();
	if(ua.indexOf(' qq')>-1 && ua.indexOf('mqqbrowser') <0 ){
		//inner QQ
		DownloadMain.isQQInstall = true;
		return;
	}

	if(ua.indexOf('mqqbrowser') >-1 && ua.indexOf(' qq')<0){
		DownloadMain.isQQBrowser = true;
		return;
	}

	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		DownloadMain.isWxBrowser = true;
		return;
	} 	
  },
  isWxBrowser:function(){
  	//console.log(">>>>>>");
  	return DownloadMain.isWxBrowser || DownloadMain.isQQInstall || DownloadMain.isQQBrowser;
  },
  i18nEvent:function(){
  	$('.chinese').on('click',function(){
      $(".chinese").removeClass('lang-active');
      let lg = $(this).data('sign');
      $(this).addClass('lang-active');
      DownloadMain.setLang(lg);
      $('header').addClass('masthead');
  	});

  	$('p.qrcode-wallet').on('click',function(){
  	  $('div.qrcode-wallet-img').hasClass('d-none') ? $('div.qrcode-wallet-img').removeClass('d-none') :$('div.qrcode-wallet-img').addClass('d-none');
  	});
  },
  setLang:function(lg){
  	$('.i18n').each((index,el)=>{
  	  let text = $(el).data(''+lg);

  	  if(text){
  	  	$(el).text(text);
  	  }
  	  if(el.id=="mastTitle"){
  	  	console.log(el.id);
  	  }
  	});

/*  	$('div.text-slogan').find('h1').remove();
  	$('div.text-slogan').html(lg == 'en' ? DownloadMain.slogan_en : DownloadMain.slogan_en);*/
  }
};


(function($,cfg,dlm){
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

  /**
   * lang 
   */
   dlm.initBrowserType();
   dlm.i18nEvent();

   let type = dlm.isWxBrowser();

})(jQuery,CFG,DownloadMain); 
