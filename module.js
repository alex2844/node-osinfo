var exec = require('child_process').exec,
	os = require('os'),
	fs = require('fs');

module.exports = function(callback) {
	return new Promise(function(resolve) {
		var res = {
			platform: process.platform,
			distro: 'unknown',
			release: 'unknown',
			kernel: os.release(),
			arch: os.arch(),
			hostname: os.hostname(),
			user: os.userInfo()
		};
		switch (process.platform) {
			case 'win32': {
				res.platform = 'Windows';
				try {
					var wmic = ((fs.existsSync(process.env.WINDIR+'\\system32\\wbem\\wmic.exe')) ? process.env.WINDIR+'\\system32\\wbem\\wmic.exe' : 'wmic');
					return exec(wmic+' os get Caption', {windowsHide: true}, function(error, stdout) {
						res.release = Number((res.distro = stdout.slice(stdout.indexOf('\n') + 1).trim()).replace(/[^\d;]/g, ''));
						return (callback || resolve)(res);
					});
				} catch(e) {
					return (callback || resolve)(res);
				}
			}
			case 'linux': {
				return exec('cat /etc/*-release', function(error, stdout) {
					var release = {};
					stdout.toString().split('\n').forEach(function(line) {
						if (line.indexOf('=') !== -1)
							release[line.split('=')[0].trim().toUpperCase()] = line.split('=')[1].trim();
					});
					res.distro = (release.DISTRIB_ID || release.NAME || release.CHROMEOS_RELEASE_NAME || 'unknown').replace(/"/g, '');
					res.release = (release.DISTRIB_RELEASE || release.VERSION_ID || release.CHROMEOS_RELEASE_VERSION || 'unknown').replace(/"/g, '');
					return (callback || resolve)(res);
				});
			}
			default: {
				throw new Error('unsupported platform');
			}
		}
	});
}
