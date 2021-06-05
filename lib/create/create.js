const program = require('commander')
const chalk = require('chalk')
const inquirer = require('inquirer')
const figlet = require('figlet')
const ora = require('ora')
const download = require('download-git-repo')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')
const frames = require(`${__dirname}/../../config/config`).frames

const framesChoices = [];
Object.keys(frames).forEach(item => {
  framesChoices.push(item);
})

const questions = [
  {
    type: 'list',
    message: '请选择框架:',
    name: 'frame',
    choices: framesChoices,
  },
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

function renderFiles(targetPath, globalData) {
  const fileList = [
    `${targetPath}/package.json`,
    `${targetPath}/README.md`,
  ]
  return new Promise(async (resolve, reject) => {
    for (let i = 0; i < fileList.length; i++) {
      try {
        const fileContent = await fs.readFileSync(fileList[i], 'utf8')
        const fileRendered = await handlebars.compile(fileContent)(globalData)
        await fs.writeFileSync(fileList[i], fileRendered)
        resolve()
      } catch (err) {
        chalk.red('\n craete project failed. \n')
        chalk.red(`\n ${err} \n`)
        reject(err)
      }
    }

  })
}

function createPro(projectName) {
  if (!projectName) {
    console.log(chalk.red('\n Project name should not be empty! \n '))
    return program.help()
  }
  if (program.args.length < 1) return program.help()
  try {
    const stat = fs.statSync(path.resolve('./', projectName));
    if (stat.isDirectory()) {
      console.log(chalk.red('\n The folder already exists! Please change the project name! \n '))
      return;
    };
  } catch (err) {}
  const text = figlet.textSync('da cli', {
    font: 'isometric1',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  })
  console.log(chalk.green(text));
  const spinner = ora("Generating...");
  inquirer.prompt(questions).then(answers => {
    console.log(chalk.white('\n Start generating... \n'))
    spinner.start()
    let { frame, description, version } = answers;
    const url = frames[frame].url;

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
        renderFiles(projectName, { projectName, description, version }).then(() => {
          spinner.succeed()
          console.log(chalk.cyan('\n Generation completed!'))
          console.log(chalk.cyan('\n To get started'))
          console.log(chalk.cyan(`\n    cd ${projectName}`))
          console.log(chalk.cyan(`\n    npm install \n`))
        }).catch(() => {
          process.exit()
        })
      }
    )
  })
}
module.exports = createPro