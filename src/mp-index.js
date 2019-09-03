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
 * Infura
 */
var InfuraSDK = require('./modules/infurasdk/index.js');
var bigpago = require('./modules/pagoabi/index.js');
//
InfuraSDK();

var PangolinABI = bigpago({id:"BIG"});
console.log(JSON.stringify(PangolinABI, null, "  "));