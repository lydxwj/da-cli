const chalk = require('chalk')
const sites = require(`${__dirname}/../../config/config`).sites
function siteList() {
  Object.keys(sites).forEach(item => {
    console.log(chalk.green('   ' + item + ':  \n'));
    console.log('     仓库地址类型名:' + sites[item].name + ' \n');
    console.log('     仓库地址URL:' + sites[item].url + ' \n');
  })
  console.log('\n')
}
module.exports = siteList
