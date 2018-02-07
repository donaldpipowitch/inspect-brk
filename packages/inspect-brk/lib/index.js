const { join } = require('path');
const { execSync } = require('child_process');
const findUp = require('find-up');

function inspectBrk(cmd, bins) {
  const cwd = process.cwd();
  const pkgPath = join(cwd, 'package.json');
  const pkg = require(pkgPath);

  if (!pkg.scripts) {
    throw `Couldn't found "scripts" in ${pkgPath}.`;
  }

  const script = pkg.scripts[cmd];
  if (!script) {
    throw `Couldn't found "scripts.${cmd}" in ${pkgPath}.`;
  }

  if (!bins.length) {
    throw `You need to add at least one bin name which you want to inspect in "${script}".`;
  }

  let modifiedScript = script;
  bins.forEach((bin) => {
    const foundBin = findUp.sync(`node_modules/.bin/${bin}`);
    if (!foundBin) {
      throw `I couldn't found the bin called "${bin}".`;
    }
    modifiedScript = modifiedScript.replace(
      new RegExp(`(^${bin} )|( ${bin} )|( ${bin}$)`, 'g'),
      ` node --inspect-brk ${foundBin} `
    );
  });

  const options = { stdio: 'inherit' };
  execSync(modifiedScript, options);
}

exports.inspectBrk = inspectBrk;
