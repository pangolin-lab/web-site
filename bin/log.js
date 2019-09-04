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
  	isPretty:(typeof pretty !='boolean')||false,
  	logger:(obj,title)=>{
  	  if(title!=null && typeof title ==='string') console.log(title);
  	  if(typeof obj =='undefined')return;
      if(typeof obj != 'object'){
        console.log(obj);
      }else{
        this.isPretty ? console.log(JSON.stringify(obj,null,'  ')) : console.log(JSON.stringify(obj)); 
      }
  	},
  	log:(json)=>{
  	  this.logger(json,null);
  	}
  }
} 

module.exports = Log;

