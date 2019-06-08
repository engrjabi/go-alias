const commander = require('commander')
const fs = require('fs')
import { buildGoAliasJson } from './buildGoAliasJson'
import { buildMainAlias } from './buildMainAlias'
import { projectPaths, rcFilePath } from '../goconfig.json'

const rootProjectPath = `${process.env.HOME}/.go-alias`
const locationForJsonAlias = `${rootProjectPath}/go.alias.json`
const locationForMainAlias = `${rootProjectPath}/main.alias`

const configToInsertOnRcFile = `
#ALIAS CONFIGS BY GO-ALIAS
source ${locationForMainAlias}
`

if (!fs.existsSync(rootProjectPath)) {
  fs.mkdirSync(rootProjectPath)
}

// PROGRAM START
commander
  .action(async () => {
      // Read configuration
      // Build Json File
      await buildGoAliasJson(locationForJsonAlias, projectPaths)
      // Build Main Alias
      await buildMainAlias(locationForJsonAlias, locationForMainAlias)
      // TODO: Edit bash rc or zshrc to include main.alias
      const rcFile: string = await new Promise((resolve, reject) => {
        fs.readFile(rcFilePath, function (err, data) {
          if (err) {
            reject(err)
          }
          return resolve(data)
        })
      })

      if (rcFile.includes(configToInsertOnRcFile)) {
        return
      }

      await new Promise((resolve, reject) => {
        fs.appendFile(rcFilePath, configToInsertOnRcFile, function (err) {
          if (err) {
            reject(err)
          }
          console.log('Saved!')
          resolve(true)
        })
      })
    }
  )

commander.parse(process.argv)
