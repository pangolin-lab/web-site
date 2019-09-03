const Props = {
  "TOKEN_SOL_ID":"Pangolin",
  "MANAGER_SOL_ID":"PangolinManager"
};

var pangolinABI = require('./pangolin.json');
var pangolinManagerABI = require('./pangolinmanager.json');

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
  }
};

var BigPago = function(obj){
  //console.log(JSON.stringify(obj));
  Pago.setContract(Props.TOKEN_SOL_ID,pangolinABI);
  Pago.setContract(Props.MANAGER_SOL_ID,pangolinManagerABI);
  //console.log(JSON.stringify(Pago.Contracts));
  return Pago;
}

// BigPago.prototype.isArray = function(arg){
//   if(!Array.isArray){
//     Array.isArray = function(arg){
//       return Object.prototype.toString.call(arg) ==='[object Array]';
//     }
//   }

//   return Array.isArray(arr);
// }

// BigPago.Contracts = {};

// BigPago.prototype.validId = function(id){
//   return /^\w{3,20}$/.test(id);
// }

// BigPago.prototype.getContract = function(id){
//   if(BigPago.Contracts[id] && BigPago.Contracts[id].abi)return BigPago.Contracts[id];
//   if(Object.keys(BigPago.Contracts).length==0)return null;
//   for(let [key,value] of Object.entries(BigPago.Contracts)){
//     if(value.abi && (key==id || (value.address && value.address == id)))
//       return value;
//   }
//   return null;
// }

// BigPago.prototype.setContract = function(id,abi,address){
//   if(typeof id !=='string' || !this.isArray(abi)) return false;
//   if(!this.validId(id))return false;
//   let c = {};
//   c[id]= {"abi":abi};
//   if(typeof address === 'string' || address.length > 8)c[id]['address'] = address;
//   this.Contracts = Object.assign(this.Contracts,c);
// }



module.exports = BigPago;


