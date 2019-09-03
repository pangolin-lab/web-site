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
let GlobalCtx = require('./global.js');



/**
 * 
 */
function Test(){
	var globalCtxN = GlobalCtx();
    console.log(JSON.stringify(globalCtxN));
	var globalCtxS = GlobalCtx('sdfsqweqsdsdfwweressdsffsdf');
	console.log(JSON.stringify(globalCtxS));
	var globalCtx = GlobalCtx({"requireSecret":true});
	console.log(JSON.stringify(globalCtx));
}

module.exports = Test;

