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
 *
 */
'use strict'; 
const Settings = {
  enableSCP:true,
  enableZip:true,
  projectName:"pangolin"
}
const enableSCP = true;
const enableZip = true;
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

if(enableSCP){
  let scpcCMD = getScpCMD();
}


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
  IEnv.ZIP_FILE =IEnv.BASE_DIR + '/' + IEnv.ZIP_DEST + '/' 
    + Settings.projectName + '-' + IEnv.dsPrefix + '.zip';
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

  if(enableZip){
    zipDest();
  }else{
    shell.cp('-R',IEnv.TMP_DEST,IEnv.PUB_DIR);
  }

}

function zipDest(){
  shell.cd(IEnv.TMP_DEST);
  let opt = {
    source:'./*',
    destination: IEnv.ZIP_FILE
  };

  zip(opt).then(function(){
    Log.logger('zip done.');
  }).catch((err)=>{
    Log.logger(err.stack);
    process.exit(1);
  });

  shell.cd(IEnv.BASE_DIR);
}



function getScpCMD(){
  let cmd = 'SCP';
  if(IEnv.privateKey){
    cmd += ' -i '+ getPrivateKeyPath(IEnv.privateKey);
  }else{
    cmd += ' -p"'+IEnv.pw+'"';
  }

  if(IEnv.port)cmd += ' -P'+IEnv.port;

  if(enableZip){
    cmd += ' ' + IEnv.ZIP_FILE;
  }else{
    cmd += ' -r';
    cmd += ' ' + IEnv.PUB_DIR;
  }

  cmd += ' '+IEnv.user+'@'+IEnv.host+':';
  cmd += IEnv.dest;

  Log.logger(cmd);

  return cmd;
}