let PGCTX = {
  mode:"main",
  networks:[
    {
      name:"main",
      id:1,
      contractAddress:""
    },
    {
      name:"ropsten",
      id:3,
      contractAddress:"0x6C275F0961cFD76208163c196276A001E98F367E"
    },
    {
      name:"rinkeby",
      id:4,
      contractAddress:""
    }
  ],
  /**
   * id network number or string 
   */
  getNetwork:()=>{
  	for(var i=0,len=PGCTX.networks.length;i<len;i++){
  	  if( PGCTX.networks[i].name.toLowerCase() == PGCTX.mode.toLowerCase())
  	  	return PGCTX.networks[i];
  	}
  	return PGCTX.networks[0];
  }
};

/**
 * Options string : contract address default main
 * Options object {
 *   mode:"",
 *   contractAddress:""
 * }
 *
 */
function pagoConf(opts){
  let ctx = {};
  if(typeof opts == 'undefined') 
    throw new Error('options valid error.');
  if(typeof opts == 'string'){
    return Object.assign(ctx,PGCTX.getNetwork(),{contractAddress:opts});
  }else if(typeof opts == 'object' && opts.contractAddress && opts.contractAddress.length >0){
    return Object.assign(ctx,PGCTX.getNetwork(),opts);
  }
  throw new Error('options valid error.');
}

module.exports=pagoConf;