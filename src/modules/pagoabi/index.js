const Props = {
  "TOKEN_SOL_ID":"Pangolin",
  "MANAGER_SOL_ID":"PangolinManager"
};

var pangolinABI = require('./pangolin.json');
var pangolinManagerABI = require('./pangolinmanager.json');
var validator = require('../utils/validator.js');

/**
 * Contracts
 *  id : {
 *    abi:
 *    address:
 *  }
 */
var Pago = {
  Contracts:{

  },
  getContract:(id)=>{
  	if(Pago[id] && Pago[id].abi)return Pago[id];
  	if(Object.keys(Pago.Contracts).length==0)return null;
  	for(let [key,value] of Object.entries(Pago.Contracts)){
  	  if(value.abi && (key==id || (value.address && value.address == id)))
  	  	return value;
  	}
  	return null;
  },
  setContract:(id,abi,address)=>{
    if(typeof id !=='string' || !Pago.isArray(abi)) return false;
    if(!Pago.validId(id))return false;
    let c = {};
    c[id]= {"abi":abi};
    if(typeof address === 'string' && address.length > 8)c[id]['address'] = address;
    //console.log(JSON.stringify(c));
    Pago.Contracts = Object.assign(Pago.Contracts,c);
  },
  isArray:(arr)=>{
    if(!Array.isArray){
      Array.isArray = function(arg){
        return Object.prototype.toString.call(arg) ==='[object Array]';
      }
    }   
  	return Array.isArray(arr);
  },
  validId:(id)=>{
  	return /^\w{3,60}$/.test(id);
  },
  setContractAddress:(id,address)=>{
    if(Pago[id] && typeof address ==='string'){
      Pago[id]['address']=address;
    }
  },
  updateContract:(contract)=>{
    if( typeof contract !='object' || 
      !contract.id || !contract.address || 
      !validator.validContractAddress(contract.address)
      ){
      return false;
    }

    let _id = contract.id;
    if(!Pago.validId(_id))return false;
    if(Pago.Contracts[_id]){
      Pago.Contracts[_id]['address'] = contract.address;
     if(validator.isArray(contract.abi))Pago.Contracts[_id]['abi']=contract.abi;
     return true;
    }else{
      if(validator.isArray(contract.abi)){
        Pago.Contracts[_id] = {
          "address":contract.address,
          "abi":contract.abi
        };
        return true;
      }
    }
    return false;
  }
};

var BigPago = function(contracts){
  //init abi 
  Pago.setContract(Props.TOKEN_SOL_ID,pangolinABI);
  Pago.setContract(Props.MANAGER_SOL_ID,pangolinManagerABI);

  if(typeof contracts =='object' && validator.isArray(contracts)){
    for(var i=0,len=contracts.length;i<len;i++){
      let s = Pago.updateContract(contracts[i]);
      console.log("updateContract>>>"+s);
    }
  }

  Pago = Object.assign({},Pago,Props);
  return Pago;
}


module.exports = BigPago;


