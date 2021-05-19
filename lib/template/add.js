const inquirer = require('inquirer')
const chalk = require('chalk')
const fs = require('fs')
const codeBase = require(`${__dirname}/../../config/codebase`)
const sites = require(`${__dirname}/../../config/config`).sites

const sitesChoices = [];
Object.keys(sites).forEach(item => {
  sitesChoices.push(sites[item]);
})
function add() {
  let question = [
    {
      name: "name",
      type: 'input',
      message: "请输入模板名称(英文字母)",
      validate (val) {
        if (val === '') {
          return 'Name is required!'
        } else if (!/^[a-zA-Z]+$/.test(val)) {
          return 'It can only contain English letters!'
        } else if (codeBase[val]) {
          return 'Template has already existed!'
        } else {
          return true
        }
      }
    },
    {
      type: 'list',
      message: '请选择模板仓库地址类型:',
      name: 'site',
      choices: sitesChoices,
    },
    {
      name: "tplOwner",
      type: 'input',
      message: "请输入仓库所属",
      validate (val) {
        if (val === '') return 'The tplOwner is required!'
        return true
      }
    },
    {
      name: "tplName",
      type: 'input',
      message: "请输入仓库名",
      validate (val) {
        if (val === '') return 'The tplName is required!'
        return true
      }
    }
  ]
  
  inquirer
    .prompt(question).then(answers => {
      let { name, tplOwner, tplName, site } = answers;
      codeBase[name] = {
        tplOwner,
        tplName,
        site
      };
      fs.writeFile(`${__dirname}/../../config/codebase.json`, JSON.stringify(codeBase, null, 2), 'utf-8', err => {
        if (err) {
          console.log(chalk.red('Error\n'))
          console.log(err)
          return
        }
        console.log('\n')
        console.log(chalk.green('Added successfully!\n'))
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
module.exports = add
