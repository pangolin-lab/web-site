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
      contractAddress:""
    }
    {
      name:"rinkeby",
      id:4,
      contractAddress:""
    }
  ],
  /**
   * id network number or string 
   */
  getNetwork:(id)=>{
  	let isID = (typeof id) == "number";
  	for(var i=0,len=PGCTX.networks.length;i<len;i++){
  	  if(id == PGCTX.networks[i].id 
  	  	|| PGCTX.networks[i].name.toLowerCase() == id.toLowerCase())
  	  	return PGCTX.networks[i];
  	}

  	return PGCTX.networks[i];
  }
};