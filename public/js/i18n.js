/**
 * i18n
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *   \o/\ /---~\\ ~}}
 *    _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 *
 */

const CFG = {
  lang : "en",
  selector : {
	selChinese : "chinese"
  },
  slogan_cn:'<h1 class="mx-auto my-0 text-slogan pt-lg-5 pb-lg-3 i18n" id="slogan" data-en="Traffic usage form" data-cn="流量使用形式"> 流量使用形式 </h1>',
  slogan_en:'<h1 class="mx-auto my-0 text-slogan pt-lg-5 pb-lg-3 i18n" id="slogan" data-en="Traffic usage form" data-cn="流量使用形式"> Traffic usage form </h1>'
};

function InitializeI18n(){
  $("."+CFG.selector.selChinese+'[data-sign !="'+CFG.lang+'"]').removeClass('lang-active');
  $("."+CFG.selector.selChinese+'[data-sign ="'+CFG.lang+'"]').addClass('lang-active');

  $(".chinese").on('click',function(){
    $(".chinese").removeClass('lang-active');
    let lg = $(this).data('sign');
    $(this).addClass('lang-active');
    setLang(lg);
    $('header').addClass('masthead');
  });
  setLang(CFG.lang);
} 

function setLang(lg){
	$('.i18n').each((index,el)=>{

		var text = $(el).data(''+lg);
		
		if(text){
			if(el.id=="slogan"){
				let $parent = $(el).parent();			
				$(el).remove();
				lg=='en' ? $parent.prepend(CFG.slogan_en) : $parent.prepend(CFG.slogan_cn);
			}else{
				$(el).text(text);
			}
		}
		let url = $(el).data(lg+'url');
		if(url){
			$(el).attr('href',url);
		}

		let imgSrc = $(el).data(lg+'src');
		if(imgSrc){
			$(el).attr('src',imgSrc);
		}
	});

}

//  InitializeI18n();

	

