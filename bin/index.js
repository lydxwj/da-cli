#!/usr/bin/env node

const program = require('commander')

const updateVer = require('../lib/update/update')
const tplAdd = require('../lib/template/add')
const tplDelete = require('../lib/template/delete')
const tplList = require('../lib/template/list')
const tplInit = require('../lib/template/init')
const createPro = require('../lib/create/create')
const siteList = require('../lib/site/list')
const siteAdd = require('../lib/site/add')
const siteDelete = require('../lib/site/delete')

// version
program.name('da').version(require('../package').version, '-v -version', 'output the current version').usage('<command> [options]')

// update
program
	.command('update')
  .alias('u')
	.description('update version')
	.action(() => {
		updateVer()
	})


// add a new template
program
  .command('add')
  .description('add a new template')
  .alias('a')
  .action(() => {
    tplAdd()
  })

// delete a template
program
  .command('delete')
  .description('delete a template')
  .alias('d')
  .action(() => {
    tplDelete()
  })

// list all the templates
program
  .command('list')
  .description('list all the templates')
  .alias('l')
  .action(() => {
    tplList()
  })

// generate a new project from a template
program
  .command('init')
  .arguments('<templateName> <projectName>')
  .description('generate a new project from a template', {
    templateName: 'existing template name',
    projectName: 'folder that does not exist'
  })
  .alias('i')
  .action((templateName, projectName) => {
    tplInit(templateName, projectName)
  })

// generate an official project
program
  .command('create')
  .arguments('<projectName>')
  .description('generate an official project', {
    projectName: 'folder that does not exist'
  })
  .alias('c')
  .action((projectName) => {
    createPro(projectName)
  })

// configure site
function makeSiteCommand() {
  const site = new program.Command('site');

  // list all the sites
  site
    .alias('s')
    .usage('<command>')
    .command('list')
    .alias('l')
    .description('list all the sites')
    .action(() => {
      siteList()
    });

  // add a new site
  site
    .command('add')
    .alias('a')
    .description('add a new site')
    .action(() => {
      siteAdd()
    });

  // delete a site
  site
    .command('delete')
    .alias('d')
    .description('delete a site')
    .action(() => {
      siteDelete()
    });
  return site;
}
program.addCommand(makeSiteCommand())

// error help
program.addHelpText('after', `

Example call:
  $ da --help
  $ da -version
  $ da update
  $ da add
  $ da delete
  $ da list
  $ da create
  $ da site add
  $ da site delete
  $ da site list`);

// parse
program.parse(process.argv)