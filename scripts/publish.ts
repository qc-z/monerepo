import inquirer from 'inquirer'
import fs from 'fs'
const exec = require('child_process').exec
import chalk from 'chalk'

inquirer
  .prompt([
    {
      type: 'checkbox',
      name: 'builds',
      message: '请选择一个或者多个包进行构建',
      choices: getPacksName()
    },
    {
      type: 'checkbox',
      name: 'docs',
      message: '请选择一个或者多个包进行构建文档',
      choices: getPacksName()
    }
  ])
  .then(({ builds, docs }: { builds: string[]; docs: string[] }) => {
    if (builds.length) {
      console.log('有builds', exec)
      exec(`pnpm build --filter ${builds[0]}`, (err: any) => {
        if (err) {
          console.log(chalk.red('npm run gen 命令执行失败'))
        } else {
          console.log(chalk.green(builds[0] + '已创建'))
        }
      })
    }
    if (docs.length) {
      console.log('有docs', docs)
    }
  })
  .catch((error: { isTtyError: any }) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  })
function getPacksName() {
  const packNames = fs.readdirSync('packages')
  return packNames.filter((path) => {
    return fs.statSync(`packages/${path}`).isDirectory()
  })
}
