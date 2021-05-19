const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const sites = require(`${__dirname}/../../config/config`).sites
function siteDelete() {
  let question = [
    {
      name: "siteKey",
      type: 'input',
      message: "请输入要删除的存储仓库地址类型键（key）",
      validate (val) {
        if (val === '') {
          return 'siteKey is required!'
        } else if (!sites[val]) {
          return 'siteKey does not exist!'
        } else if (val == 'github' || val == 'gitlab' || val == 'gitee') {
          return 'no permission!'
        }
        return true
      }
    },
  ]
  inquirer.prompt(question).then(answers => {
    let { siteKey } = answers;
    delete sites[siteKey]
    fs.writeFile(`${__dirname}/../../config/config.json`, JSON.stringify({sites}, null, 2), 'utf-8', err => {
      if (err) {
        console.log(chalk.red('Error\n'))
        console.log(err)
        return
      }
      console.log('\n')
      console.log(chalk.green('Deleted successfully!\n'))
      console.log(chalk.grey('The latest sites list is: \n'))
      Object.keys(sites).forEach(item => {
        console.log(chalk.green('   ' + item + ':  \n'));
        console.log('     仓库地址类型名:' + sites[item].name + ' \n');
        console.log('     仓库地址URL:' + sites[item].url + ' \n');
      })
      console.log('\n')
    })
  })
}
module.exports = siteDelete