var infoServer = require('infoserver') 
var server = infoServer.server;
var rootDir = __dirname+'../..';
var port = 1337;
var prefix = 'xinfo';
server(port,rootDir,prefix,function(){console.log('server listening on '+port)})