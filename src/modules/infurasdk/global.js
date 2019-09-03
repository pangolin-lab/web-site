
//ropsten.infura.io/v3/b6e1952f8a214a2cba9784b907aba833
//https://ropsten.infura.io/v3/b6e1952f8a214a2cba9784b907aba833
const CTX = {
  rpcCaller:"infura",
  version:"v3",
  requireSecret:false,
  protocol:"https",
  network:"ropsten",
  projectId:"b6e1952f8a214a2cba9784b907aba833",
  secret:"23fdae0460e04c0fb528b327f2e22b08",
  domain:"infura.io"
};

function GetInfuraGlobal(opts){
  // if(typeof opts != 'string' && typeof opts != 'object')
  // 	throw new Error({message:"Infura paramters invalid."});
  if(typeof opts === 'string'){
  	return buildInfuraUrlStr(opts);
  }else if(typeof opts == 'object'){
  	return buildInfuraUrlObject(opts);
  }else{
  	return buildInfuraUrl();
  }
}

function buildInfuraUrl(){
  let proURL = CTX.protocol + "://"+CTX.network
    + '.'+CTX.domain +'/';
  let infuraURL = proURL + CTX.version + '/'+CTX.projectId;
  let g = {};
  return Object.assign({},CTX,{"providerUrl":proURL,"infuraUrl":infuraURL});
}

function buildInfuraUrlStr(projectID){
  let proURL = CTX.protocol + "://"+CTX.network
    + '.'+CTX.domain +'/';
  let infuraURL = proURL + CTX.version + '/'+projectID;
  let g = {};

  return Object.assign(g,CTX,{"providerUrl":proURL,"infuraUrl":infuraURL,"projectId":projectID});
}

function buildInfuraUrlObject(opts){
  if(opts.protocol&&opts.protocol!='https' && opts.protocol != "wss")opts.protocol='https';
  let _ctx = Object.assign({},CTX,opts);
  let providerURL = _ctx.protocol+'://'+ _ctx.network +'.'
    + CTX.domain+'/';
  let infuraURL = providerURL + CTX.version +'/'+_ctx.projectId;

  return Object.assign({},_ctx,{"providerUrl":providerURL,"infuraUrl":infuraURL});
}

module.exports = GetInfuraGlobal;