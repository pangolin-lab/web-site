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
var infuraSDK = require('./modules/sdk/infura-sdk.js');
var bigpago = require('./modules/pagoabi/index.js');
var log = require('./modules/utils/log.js');
var Log = log(true);
//
const MPCNST = {
  infura:{
	network:"ropsten",
	projectId:"b6e1952f8a214a2cba9784b907aba833",
	secret:"23fdae0460e04c0fb528b327f2e22b08"
  },
  contracts:[
    {
      id:"pangolinManager",
  	  address:"0x6c275f0961cfd76208163c196276a001e98f367e"
  	}
  ]
};
var infura = infuraSDK(MPCNST.infura);
Log.logger(infura.getWeb3ProviderUrl());

var pago = bigpago(MPCNST.contracts);

//Log.logger(PangolinABI);
