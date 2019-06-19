import * as  inquirer from 'inquirer'
import { promisify } from "util"
import { locationForMainConfig } from './configInit'
import * as  jsonfile from 'jsonfile'

const writeJson = promisify(jsonfile.writeFile)

const shellQuestion = [
  {
    type: 'list',
    name: 'shell',
    message: 'What shell do you use?',
    choices: ['Bash', 'Zsh'],
    filter: function (val) {
      return val.toLowerCase()
    }
  }
]

const directoryQuestion = [
  {
    type: 'input',
    name: 'dir',
    message: 'Enter full path directory to include, type "n" if done'
  }
]

export async function askUserForConfig() {
  let projectList = []
  let directoryAnswer = ''
  const { shell } = await inquirer.prompt(shellQuestion)

  while (directoryAnswer !== 'n') {
    const { dir } = await inquirer.prompt(directoryQuestion)
    directoryAnswer = dir.trim().replace(/['"]/gi, '')
    if (directoryAnswer !== 'n') {
      projectList.push(directoryAnswer)
    }
  }

  return {
    shell: `${process.env.HOME}/.${shell}rc`,
    projectList
  }
}

export async function askAndWriteConfigFile() {
  const { shell, projectList } = await askUserForConfig()
  const config = {
    'rcFilePath': shell,
    'projectPaths': projectList
  }
  await writeJson(locationForMainConfig, config)
  console.log(`Saved config on ${locationForMainConfig}`)
  return config
}
