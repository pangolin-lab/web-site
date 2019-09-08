/**
 * publisher
 *  |\_/|,,_____,~~`
 *  (.".)~~     )`~}}
 *	 \o/\ /---~\\ ~}}
 *     _//    _// ~}
 * 
 * Copyright (c) 2019 PPL,pangolin-team
 * E-mail : developer-team@pangolink.org
 * https://github.com/pangolin-lab/web-site
 * Remote need install unzip
 */
'use strict'; 
const Settings = {
  enableSCP:true,
  enableZip:true,
  unzipRemote:false,
  projectName:"pangolin"
}

var fs = require('fs');
var shell = require('shelljs');
var zip = require('bestzip');
var path = require('path');
//let basedir = process.cwd();
//console.log(basedir);

var log = require('./log.js');
const Log = log(true);

const DateFormat = require('fast-date-format');
//https://github.com/SerayaEryn/fast-date-format
const dfYMD = new DateFormat('YYYYMMDD');
const dfTS = new DateFormat('YYYY-MM-DD HH:mm:ss.SSS');

let remoteJson = require('../.config/.pri-remote.json');
//Need ssh git
if(!shell.which('ssh') || !shell.which('npm') || !shell.which('git')){
  shell.echo('Sorry,this script requires SSH and npm.');
  shell.exit(1);
}

let IEnv = {
  "TMP_DEST":"tmp",
  "ZIP_DEST":"dest",
  "LOG_DEST":"log",
  "DEF_REMOTE_DEST":"/data/www",
  "REBUILD":"npm run rebuild"
};
IEnv.dsPrefix = dfYMD.format(new Date());
IEnv.BASE_DIR = process.cwd();
IEnv.SSH_HOME = process.env['HOME']||process.env['USERPROFILE'];
IEnv.SSH_HOME = IEnv.SSH_HOME +"/.ssh/";

//Valid RemoteJson
let validRemote = validRemoteConfig(remoteJson);
if(!validRemote){
  process.exit(1);
}


prepareIEnv();
/**/
buildProject();




/**
 *
 */
function mergeIEnv(json){
  let read = {};
  read.host = json.host;
  read.port = json.port ? json.port : 22;
  read.user = json.user ? json.user : "root";
  if(json.privateKey){
  	read.privateKey = json.privateKey;
  }else{
  	read.pw = json.pw;
  }
  read.dest = json.dest ?  json.dest : IEnv.DEF_REMOTE_DEST;
  return Object.assign(json,IEnv,read);
}

/**
 *
 */
function validRemoteConfig(json){
  if(!json || typeof json !== 'object') return false;
  if(!json.host){
  	console.log("remote must contains host and privateKey or pw.");
  	return false;
  }
  if(!json.privateKey && !json.pw){
  	console.log("remote must contains host and privateKey or pw.");
  	return false;  	
  }
  if(json.privateKey){
  	let keyPath = getPrivateKeyPath(json.privateKey);
  	if(shell.find(keyPath).length == 0){
	  console.log("ssh key pair ["+json.privateKey+"] not exists.");
  	  return false;
  	}
  }
  return json;
}

/**
 *
 */
function getPrivateKeyPath(key){
  let p = {
  	root:IEnv.SSH_HOME,
  	base:key
  };
  return path.format(p);
}

/**
 *
 */
function initLogFile(){
  if(!IEnv.dsPrefix)IEnv.dsPrefix = dfYMD.format(new Date());

  let logPath = {
  	root:IEnv.BASE_DIR + '/'+IEnv.LOG_DEST+'/',
  	name:"publish-"+IEnv.dsPrefix,
  	ext:".log"
  };
  let lf = path.format(logPath);
  return lf;
}

/**
 *
 *
 */
function mkdirs(){
  shell.mkdir(IEnv.TMP_DEST,IEnv.LOG_DEST,IEnv.ZIP_DEST);
}

/**
 * 1.merge IEnv remote Host config
 * 2.dir file 
 */
function prepareIEnv(){
  IEnv = mergeIEnv(remoteJson);
  IEnv.ZIP_FILE_NAME = Settings.projectName + '-' + IEnv.dsPrefix + '.zip';
  IEnv.ZIP_FILE =IEnv.BASE_DIR + '/' + IEnv.ZIP_DEST + '/' 
    + IEnv.ZIP_FILE_NAME;
  IEnv.PUB_DIR =IEnv.BASE_DIR + '/' + IEnv.ZIP_DEST + '/' 
    + Settings.projectName + '-' + IEnv.dsPrefix;

  shell.rm('-f',IEnv.ZIP_FILE,IEnv.PUB_DIR);
  shell.rm('-rf','build');
  shell.rm('-rf','tmp');

  shell.mkdir(IEnv.TMP_DEST,IEnv.LOG_DEST,IEnv.ZIP_DEST);
  Log.logger(IEnv);
}

function buildProject(){
  var child = shell.exec(IEnv.REBUILD).stdout;
  shell.cp('-Rf','public/*','build/*','tmp/');

  if(Settings.enableZip){
    zipDest();
  }else{
    shell.cp('-R',IEnv.TMP_DEST,IEnv.PUB_DIR);
    if(Settings.enableSCP){
      let scpcCMD = getScpCMD();
      Log.logger("upload >>> folder.");
      Log.logger(scpcCMD);
      shell.exec(scpcCMD);
    }
  }

}

function zipDest(){
  shell.cd(IEnv.TMP_DEST);
  let opt = {
    source:'*',
    destination: IEnv.ZIP_FILE
  };

  zip(opt).then(function(){
    Log.logger('zip done.');
    if(Settings.enableSCP){
      let scpcCMD = getScpCMD();
      Log.logger("upload >>> Zip.");
      Log.logger("begin upload remote");
      let child = shell.exec(scpcCMD,{silent:true,async:false});
      console.log("upload remote completed.");
      let execCMD = getUnzipCMD(IEnv.ZIP_FILE_NAME);
      Log.logger(execCMD);
      if(execCMD && Settings.unzipRemote){
        Log.logger("zip published.Remote Dest:"+IEnv.ZIP_FILE_NAME);
        shell.exec(execCMD,{silent:true,async:false});
        Log.logger("unzip completed.");        
      }
    }    
  }).catch((err)=>{
    Log.logger(err.stack);
    process.exit(1);
  });
  
  shell.cd(IEnv.BASE_DIR);
}

/**
 * privateKey only
 */
function getUnzipCMD(zipName){
  if(!IEnv.wwwName || !IEnv.privateKey)return false;

  let ssh_cmd = 'ssh';
  if(IEnv.privateKey){
    ssh_cmd += ' -i ' + getPrivateKeyPath(IEnv.privateKey);
  }
  if(IEnv.port)ssh_cmd += ' -p'+IEnv.port;
  ssh_cmd += ' '+IEnv.user+'@'+IEnv.host;

  let execCMD = 'unzip -o -d ' + 
    IEnv.wwwDest + '/'+IEnv.wwwName +
    ' '+IEnv.dest + '/'+zipName;
  ssh_cmd += ' "' +execCMD +';"';

  return ssh_cmd;
}

function getScpCMD(){
  let cmd = 'SCP';
  if(IEnv.privateKey){
    cmd += ' -i '+ getPrivateKeyPath(IEnv.privateKey);
  }else{
    cmd += ' -p"'+IEnv.pw+'"';
  }

  if(IEnv.port)cmd += ' -P'+IEnv.port;

  if(Settings.enableZip){
    cmd += ' ' + IEnv.ZIP_FILE;
  }else{
    cmd += ' -r';
    cmd += ' ' + IEnv.PUB_DIR;
  }

  cmd += ' '+IEnv.user+'@'+IEnv.host+':';
  cmd += IEnv.dest;
  return cmd;
}