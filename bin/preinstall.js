var fs = require('fs');
var resolve = require('path').resolve;
var join = require('path').join;
var childproc = require('child_process');

// get library path
var lib = resolve(__dirname, '../lib/');

fs.readdirSync(lib).forEach(function (mod) {
	var modPath = join(lib, mod);

	// ensure path has package.json
	if (!fs.existsSync(join(modPath, 'package.json'))) {
		return;
	}

	// remove existing node_modules folder
	modModulesPath = resolve(modPath, './node_modules/');
	console.log("removing node_modules folder at: ", modModulesPath);
	deleteFolderRecursive(modModulesPath);

	// install folder
	childproc.spawn('npm', ['i'], { env: process.env, cwd: modPath, stdio: 'inherit' });
});

function deleteFolderRecursive(path) {
	if (fs.existsSync(path)) {
		fs.readdirSync(path).forEach(function(file, index) {
			var curPath = path + "/" + file;
			if (fs.lstatSync(curPath).isDirectory()) { // recurse
				deleteFolderRecursive(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
};
