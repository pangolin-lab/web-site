/**
 * MetaMask Support
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *	 \o/\ /---~\\ ~}}
 *     _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 *
 */
BootstrapTable.prototype.initToolbar = function () {
  //#定义按钮，这个位置决定前端显示按钮的顺序
  if (this.options.showSearchButton) {
    // html.push(sprintf('<button class="btn btn-default" type="button" name="refresh" id="search" aria-label="refresh" title="搜索">',
    // this.options.formatRefresh()),
    // sprintf('搜索'),'</button>');
  }

  //#触发上传数据到服务端，并重载列表
  if (this.options.showSearchButton) {
    this.$toolbar.find('input[name="search_text"]')
    .off('keypress').on('keypress', function(e){
    	console.log(e.keyCode);
    	if(e.keyCode == 13){

    	  return $.proxy(this.refresh, this);
    	}
    	
    });
  }
}

let MPTBOpts={
  pagination:true,
  search: true,
  pageSize:2,
  cardView:true,
  dataCache:false,
  showSearchButton: true,
  queryParams:miningPoolAddressSearch,
  columns:[
	{field:'id',title:'Addresss'},
	{field:'nodeName',title:'名称'},
	{field:'mortgageToken',title:'抵押数量'},
	{field:'remark',title:'简介'}
  ]
};

/**
 * OK
 *
 */
function miningPoolAddressSearch(params){
  //js
  let param = {
    csrfmiddlewaretoken :$("input[name='csrfmiddlewaretoken']").val(),
    pageNumber: params.pageNumber,
    pageSize: params.pageSize,
    search:$("input[ name='search_text' ] ").val(), //定义传输的搜索参数
    order:params.sortOrder,
    sort:params.sortName
  };

  return param;
}

MPTBOpts.url='minigpool-list.json';
var miningPoolTable = $('#miningPoolTable').bootstrapTable(MPTBOpts);

const CFG = {
  "NAV_ID":"mainNav",
  "NAV_A_CSS_NAME":"js-scroll-trigger"
};

var I18N = {
  getLang:()=>{
  	let reg = new RegExp("(^|&)lang=([^&]*)(&|$)", "i");
  	let r = window.location.search.substr(1).match(reg);
  	if(r==null)return "en";
  	return unescape(r[2]) != "cn" ? "en" : "cn"; 
  },
  i18nEvent : ()=>{
  	$('.chinese').on('click',function(){
      $(".chinese").removeClass('lang-active');
      let lg = $(this).data('sign');
      $(this).addClass('lang-active');
      I18N.i18nHandle(lg);
      $('header').addClass('masthead');
  	});  	
  },
  i18nHandle:(lg)=>{
  	$('.i18n').each((idx,el)=>{
  	  let text = $(el).data(''+lg);
      if(text)$(el).text(text);

      let href = $(el).data(lg+'url');
      if(href)$(el).attr('href',href);

      let imgSrc = $(el).data(lg+'src');
      if(imgSrc)$(el).attr('src',imgSrc);
  	});
  },
  initLang:(lg)=>{
  	$('a[data-sign='+lg+']').trigger('click',''+lg);
  }

};

(function($,i18n,cfg){
  "use strict";
  $('a.'+cfg.NAV_A_CSS_NAME+'[href*="#"]:not([href="#"])').click(function() {
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

  $('.'+cfg.NAV_A_CSS_NAME).click(function() {
    $('.navbar-collapse').collapse('hide');
  });  

  $('body').scrollspy({
    target: '#'+cfg.NAV_ID,
    offset: 100
  });


  var navbarCollapse = function() {
    if ($("#"+cfg.NAV_ID).offset().top > 100) {
      $("#"+cfg.NAV_ID).addClass("navbar-shrink");
    } else {
      $("#"+cfg.NAV_ID).removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);  

  let lg = i18n.getLang();
  i18n.i18nEvent();
  i18n.initLang(lg);

})(jQuery,I18N,CFG);


