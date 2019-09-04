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
function Log(pretty){
  return {
  	isPretty:pretty||false,
  	logger:(obj,title){
  	  if(typeof title ==='string') console.log(title);
  	  if(typeof obj =='undefined')return;

  	  this.isPretty ? console.log(JSON.stringify(obj,null,'  ')) : console.log(JSON.stringify(obj));
  	}
  }
} 

module.exports = Log;

