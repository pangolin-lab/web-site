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
'use strict'; 

var fs = require('fs');
var shell = require('shelljs');
var zip = require('bestzip');
var path = require('path');
var log = require('./log.js');
const Log = log(true);

const DateFormat = require('fast-date-format');
//https://github.com/SerayaEryn/fast-date-format
const dfYMD = new DateFormat('YYYYMMDD');
const dfTS = new DateFormat('YYYY-MM-DD HH:mm:ss.SSS');

let remoteJson = require('../.config/.pri-remote.json');

let IEnv = {
  "TMP_DEST":"tmp/",
  "ZIP_DEST":"dest/",
  "LOG_DEST":"log/",
  "REBUILD":"npm run rebuild"
};
IEnv.dsPrefix = dfYMD.format(new Date());
IEnv.BASE_DIR = shell.pwd();
IEnv.SSH_HOME = process.env['HOME']||process.env['USERPROFILE'];
IEnv.SSH_HOME = IEnv.SSH_HOME +"/.ssh/";

//Valid RemoteJson
let validRemote = validRemoteConfig(remoteJson);
if(!validRemote){
  process.exit(1);
}
IEnv = mergeIEnv(remoteJson);

mkdirs();
initLogFile();

/**/
buildProject();



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
  read.dest = json.dest ?  json.dest : '/data/dest';
  return Object.assign(json,IEnv,read);
}

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

function getPrivateKeyPath(key){
  let p = {
  	root:IEnv.SSH_HOME,
  	base:key
  };
  return path.format(p);
}

function initLogFile(){
  if(!IEnv.dsPrefix)IEnv.dsPrefix = dfYMD.format(new Date());

  let logPath = {
  	root:IEnv.BASE_DIR + '/'+IEnv.LOG_DEST,
  	name:"publish-"+IEnv.dsPrefix,
  	ext:".log"
  };
  let lf = path.format(logPath);
  console.log(lf);
  // let timestamp = dfTS.format(new Date());
  // let command = 'echo -e ">>>"'+timestamp+' \n >'+lf+'';
  // shell.exec(command);
  return lf;
}

function mkdirs(){
  shell.mkdir(IEnv.TMP_DEST,IEnv.LOG_DEST,IEnv.ZIP_DEST);
}

function buildProject(){
  var child = shell.exec(IEnv.REBUILD).stdout;
  //console.log(child);

}