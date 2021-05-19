const program = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs')
const codeBase = require(`${__dirname}/../../config/codebase`)
const sites = require(`${__dirname}/../../config/config`).sites

const promptList = [
  {
    type: 'input',
    message: '请输入项目简介',
    name: 'description',
    default: '项目简介'
  },
  {
    type: 'input',
    message: '请输入项目版本',
    name: 'version',
    default: '1.0.0'
  }
]

function setProjectDescription(projectName, options) {
  const packagePath = `${projectName}/package.json`
  const packageJson = fs.readFileSync(packagePath, 'utf-8')
  const packageResult = JSON.stringify(Object.assign({}, JSON.parse(packageJson), options), null, 2)
  fs.writeFileSync(packagePath, packageResult)
}
function tplInit(templateName, projectName) {
  if (!codeBase[templateName]) {
    console.log(chalk.red('\n Template name does not exit! \n '))
  }
  if (!projectName) {
    console.log(chalk.red('\n Project name should not be empty! \n '))
  }
  if (program.args.length < 2) return program.help()
  try {
    const stat = fs.statSync(path.resolve('./', projectName));
    if (stat.isDirectory()) {
      console.log(chalk.red('\n The folder already exists! Please change the project name! \n '))
      return;
    };
  } catch (err) {}
  const tplObj = codeBase[templateName];
  if (!sites[tplObj.site]) {
    console.log(chalk.red('\n Code base address type does not exist! \n '))
    return;
  }
  let url = sites[tplObj.site].url;
  url = url.replace('{tplOwner}', tplObj.tplOwner);
  url = url.replace('{tplName}', tplObj.tplName);
  const spinner = ora("Downloading...");
  inquirer.prompt(
    promptList
  ).then(answers => {
    console.log(chalk.white('\n Start generating... \n'))
    spinner.start()
    download(
      url,
      projectName,
      {
        clone: url.startsWith('direct:') ? true : false,
      },
      err => {
        if (err) {
          spinner.fail()
          console.log(chalk.red(`Generation failed. ${err}`))
          return
        }
        const { description, version } = answers
        setProjectDescription(projectName, { name: projectName, description, version })
        spinner.succeed()
        console.log(chalk.cyan('\n Generation completed!'))
        console.log(chalk.cyan('\n To get started'))
        console.log(chalk.cyan(`\n    cd ${projectName}`))
        console.log(chalk.cyan(`\n    npm install \n`))
      }
    )
  });
}
module.exports = tplInit
