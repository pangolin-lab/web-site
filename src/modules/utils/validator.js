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

validator.validIPv4 = (ip)=>{
  if(typeof ip != 'string')return false;
	let regExpIPv4 = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
  return regExpIPv4.test(ip);	
}

module.exports = validator;