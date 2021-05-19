const chalk = require('chalk')
const inquirer = require('inquirer')
const fs = require('fs')
const sites = require(`${__dirname}/../../config/config`).sites
function siteAdd() {
  let question = [
    {
      name: "siteName",
      type: 'input',
      message: "请输入仓库地址类型名",
      validate (val) {
        if (val === '') {
          return 'siteName is required!'
        } else {
          return true
        }
      }
    },
    {
      name: "siteKey",
      type: 'input',
      message: "请输入存储仓库地址类型的键（key）",
      validate (val) {
        if (val === '') return 'siteKey is required!'
        if (sites[val]) return 'siteKey has already existed!'
        if (!/^[a-zA-Z]+$/.test(val)) {
          return 'It can only contain English letters!'
        }
        return true
      }
    },
    {
      name: "siteUrl",
      type: 'input',
      message: "请输入仓库地址URL",
      suffix: '例如：https://my.sitecode.com',
      validate (val) {
        if (val === '') return 'The siteUrl is required!'
        if (!/(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(val)) return 'Please enter the correct URL!'
        return true
      }
    }
  ]
  inquirer.prompt(question).then(answers => {
    let { siteName, siteKey, siteUrl } = answers;
    const newSite = {
      name: siteName,
      value: siteKey,
      short: siteName,
      url: 'direct:' + siteUrl + '/{tplOwner}/{tplName}.git'
    }
    sites[siteKey] = newSite
    fs.writeFile(`${__dirname}/../../config/config.json`, JSON.stringify({sites}, null, 2), 'utf-8', err => {
      if (err) {
        console.log(chalk.red('Error\n'))
        console.log(err)
        return
      }
      console.log('\n')
      console.log(chalk.green('Added successfully!\n'))
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
module.exports = siteAdd