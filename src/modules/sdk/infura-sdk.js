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
const GlobalCnst = {
  requireSecret:false,
  network:"ropsten",
  projectId:"",
  secret:"",
  domain:"infura.io",
  networks:[
    {id:1,name:"Mainnet"},
    {id:3,name:"Ropsten"},
    {id:4,name:"Rinkeby"}
  ],
  supportProts:"https wss ipfs"
};
var CTX = {
  id:"infura",
  version:"v3",
  protocol:"https",
  getWeb3ProviderUrl:()=>{
  	if(CTX.protocol == 'wss'){
	  let url = 'wss://' +CTX.network + '.'+CTX.domain
	  	 +'/ws/'+ CTX.version+'/'+CTX.projectId+'/';
	  return url;
  	}else if(CTX.protocol == 'ipfs'){
 	  let url = 'https://' +CTX.network + '.'+CTX.domain
	  	 +'/ipfs/';
	  return url; 		
  	}else{
	  let url = 'https://' +CTX.network + '.'+CTX.domain
	  	 +'/'+ CTX.version+'/'+CTX.projectId+'/';
	  return url;
  	}
  },
  validNetwork:(network)=>{
  	for(var i=0, len = GlobalCnst.networks.length;i<len;i++){
  	  if(network.toLowerCase()== ((GlobalCnst.networks[i].name).toLowerCase()))
  	  	return network.toLowerCase();
  	}
  	return false;
  }
};

/**
 * opts string projectId be update
 * opts json {requireSecret}
 *
 *
 */
function sdk(opts){
  let _ctx = {};
  if(typeof opts === 'string')CTX.projectId = opts;
  if(typeof opts == 'object'){
  	if(opts.projectId)CTX.projectId = opts.projectId;
  	if(opts.secret)CTX.secret = opts.secret;
  	if(opts.network && CTX.validNetwork(opts.network))CTX.network = CTX.validNetwork(opts.network);
  	if(opts.protocol && 
  	  GlobalCnst.supportProts.indexOf(opts.protocol.toLowerCase())){
  		CTX.protocol = opts.protocol.toLowerCase();
  	}
  }
  CTX = Object.assign({},GlobalCnst,opts,CTX);
  
  return CTX;
}

module.exports = sdk;
