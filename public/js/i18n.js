/**
 * i18n
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

//  InitializeI18n();

	

