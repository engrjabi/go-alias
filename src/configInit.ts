import * as  fs from 'fs'
import * as  jsonfile from 'jsonfile'
import { promisify } from 'util'
import { askAndWriteConfigFile } from './configQuestions'

const readJson = promisify(jsonfile.readFile)

export const rootProjectPath = `${process.env.HOME}/.go-alias`
export const locationForJsonAlias = `${rootProjectPath}/go.alias.json`
export const locationForMainAlias = `${rootProjectPath}/main.alias`
export const locationForMainConfig = `${rootProjectPath}/goconfig.json`

export const configToInsertOnRcFile = `
#ALIAS CONFIGS BY GO-ALIAS
source ${locationForMainAlias}
`
type Config = {
  rcFilePath?: string,
  projectPaths?: string[]
}

export async function initiateConfig() {
  let config: Config = {}

  if (!fs.existsSync(rootProjectPath)) {
    fs.mkdirSync(rootProjectPath)
  }

  if (fs.existsSync(locationForMainConfig)) {
    config = await readJson(locationForMainConfig)
  } else {
    config = await askAndWriteConfigFile()
  }

  return config
}
