/**
 * ____            _                ____            _                  _   _          _     
 *|  _ \ _ __ ___ | |_ ___  _ __   |  _ \ _ __ ___ | |_ ___   ___ ___ | | | |    __ _| |__  
 *| |_) | '__/ _ \| __/ _ \| '_ \  | |_) | '__/ _ \| __/ _ \ / __/ _ \| | | |   / _` | '_ \ 
 *|  __/| | | (_) | || (_) | | | | |  __/| | | (_) | || (_) | (_| (_) | | | |__| (_| | |_) |
 *|_|   |_|  \___/ \__\___/|_| |_| |_|   |_|  \___/ \__\___/ \___\___/|_| |_____\__,_|_.__/ 
 * 
 * Copyright (c) 2019 PPL,proton-team
 * E-mail : developer-team@proton.one
 * https://github.com/proton-lab/web-site
 *
 */

const CFG = {
	lang : "cn",
	selector : {
		selChinese : "chinese"
	}
};

function InitializeIndex(){
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
	});
}