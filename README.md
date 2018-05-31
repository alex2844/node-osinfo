# node-osinfo

[![Version](https://img.shields.io/npm/v/node-osinfo.svg)](https://www.npmjs.org/package/node-osinfo)

Get the OS/Distribution name of the environment you are working on

Available in Linux and Windows.

``` javascript
var osinfo = require('node-osinfo');
osinfo(function(res) {
	console.log(res);
});
```
``` javascript
var osinfo = require('node-osinfo');
osinfo().then(function(res) {
	console.log(res);
});
```
``` log
{ platform: 'Windows', distro: 'Microsoft Windows 7 Professional', release: 7, kernel: '6.1.7601', arch: 'ia32', hostname: 'localhost', user: { uid: -1, gid: -1, username: 'alex', homedir: 'C:\\users\\alex', shell: null } }
{ platform: 'linux', distro: 'Ubuntu', release: '16.04', kernel: '3.8.11', arch: 'x64', hostname: 'localhost', user: { uid: 1000, gid: 1000, username: 'alex', homedir: '/home/alex', shell: '/bin/bash' } }
{ platform: 'linux', distro: 'Chrome OS', release: '65', kernel: '3.8.11', arch: 'x64', hostname: 'localhost', user: { uid: 1000, gid: 1000, username: 'chronos', homedir: '/home/chronos/user', shell: '/bin/bash' } }
```

## Installation
```
npm install -g node-osinfo
```
