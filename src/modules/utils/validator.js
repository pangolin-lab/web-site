function validator(){}

validator.validContractAddress = function(address){
   if(typeof address !== 'string')return false;
}

validator.isArray = (arr)=>{
  if(typeof arr !=='object')return false;
  if(!Array.isArray){
	Array.isArray = function(arg){
	  return Object.prototype.toString.call(arg) ==='[object Array]';
	}
  }   
  return Array.isArray(arr);
}

module.exports = validator;