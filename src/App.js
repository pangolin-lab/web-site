/** 
 * App
 *|  _ \ _ __ ___ | |_ ___  _ __   |  _ \ _ __ ___ | |_ ___   ___ ___ | | | |    __ _| |__  
 *| |_) | '__/ _ \| __/ _ \| '_ \  | |_) | '__/ _ \| __/ _ \ / __/ _ \| | | |   / _` | '_ \ 
 *|  __/| | | (_) | || (_) | | | | |  __/| | | (_) | || (_) | (_| (_) | | | |__| (_| | |_) |
 *|_|   |_|  \___/ \__\___/|_| |_| |_|   |_|  \___/ \__\___/ \___\___/|_| |_____\__,_|_.__/ 
 * 
 * App
 * Copyright (c) 2019 Proton-team,lanbery
 * E-mail : developer-team@tuta.io
 * https://github.com/lanbery/web-site
 * https://www.ppn.one
 *
 */

var dateUtil = require('./modules/utils/dateUtil.js');

var $ = require('jQuery');

$(function(){
	let d = new Date();
	let ds = dateUtil.format(d,"yyyyMMdd hh:mm");
	console.log(ds);
	$("p.date-container").text(ds);
});

