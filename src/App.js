/**
 * MetaMask Support
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *   \o/\ /---~\\ ~}}
 *     _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 *
 */

var dateUtil = require('./modules/utils/dateUtil.js');

var $ = require('jQuery');



$(function(){
	let d = new Date();
	let ds = dateUtil.format(d,"yyyyMMdd hh:mm");
	console.log(ds);
	//$("p.date-container").text(ds);
	InitializeIndex();
});

