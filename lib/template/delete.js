const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const codeBase = require(`${__dirname}/../../config/codebase`)
const sites = require(`${__dirname}/../../config/config`).sites
function tplDelete() {
  let question = [{
    name: "name",
    message: "请输入要删除的模板名称",
    validate(val) {
      if (val === '') {
        return 'Name is required!'
      } else if (!codeBase[val]) {
        return 'Template does not exist!'
      } else {
        return true
      }
    }
  }]
  
  inquirer
    .prompt(question).then(answers => {
      let {
        name
      } = answers;
      delete codeBase[name]
      fs.writeFile(`${__dirname}/../config/codebase.json`, JSON.stringify(codeBase, null, 2), 'utf-8', err => {
        if (err) {
          console.log(chalk.red('Error\n'))
          console.log(err)
          return
        }
        console.log('\n')
        console.log(chalk.green('Deleted successfully!\n'))
        console.log(chalk.grey('The latest template list is: \n'))
        Object.keys(codeBase).forEach(item => {
          console.log(chalk.green('   ' + item + ':  \n'));
          console.log('     仓库地址类型:' + sites[codeBase[item].site].name + ' \n');
          console.log('     仓库所属:' + codeBase[item].tplOwner + ' \n');
          console.log('     仓库名:' + codeBase[item].tplName + ' \n');
        })
        console.log('\n')
      })
    })
}

module.exports = tplDelete
