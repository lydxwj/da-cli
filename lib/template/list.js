const chalk = require('chalk')
const codeBase = require(`${__dirname}/../../config/codebase`)
const sites = require(`${__dirname}/../../config/config`).sites
function tplList() {
  Object.keys(codeBase).forEach(item => {
    console.log(chalk.green('   ' + item + ':  \n'));
    console.log('     仓库地址类型:' + sites[codeBase[item].site].name + ' \n');
    console.log('     仓库所属:' + codeBase[item].tplOwner + ' \n');
    console.log('     仓库名:' + codeBase[item].tplName + ' \n');
  })
}
module.exports = tplList
