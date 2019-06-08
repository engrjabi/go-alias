import * as fs from 'fs'
import { merge as _merge } from 'lodash'
import { pickBy as _pickBy } from 'lodash'
import { getDirectories } from '../utils/fileOperations'
import { formmatAlias } from '../utils/formatter'

export const buildGoAliasJson = (filePath, projectDirectories) => {
  let projectDirCollection = []
  let aliasFileStructureInJson = {}
  let originalFile = null
  let originalFileObject = {}

  try {
    originalFile = fs.readFileSync(filePath)
    originalFileObject = JSON.parse(originalFile)
  } catch (e) {
    originalFile = null
    originalFileObject = {}
  }

  projectDirectories.map(currentDirCollection => {
    const allProjectsInDirectory = getDirectories(currentDirCollection)
    projectDirCollection = projectDirCollection.concat(allProjectsInDirectory)
  })

  projectDirCollection.map(currentProject => {
    const splitDir = currentProject.split('/')
    const lastElementIndex = splitDir.length - 1
    const lastElement = splitDir[lastElementIndex]
    const secondToLastElement = splitDir[lastElementIndex - 1]
    const alias = formmatAlias(`go ${lastElement} ${secondToLastElement}`)
    aliasFileStructureInJson[alias] = {
      cd: `'${currentProject}'`,
      nvm: '',
      source: '',
      alias: ''
    }
  })

  const mergedAliasesUnFiltered = _merge({ ...aliasFileStructureInJson }, originalFileObject)
  const mergedAliases = _pickBy(mergedAliasesUnFiltered, (v, k) => {
    return aliasFileStructureInJson[k]
  })

  return new Promise(resolve => {
    // Save the file
    // Handle error if directory does not exists
    fs.writeFile(filePath, JSON.stringify(mergedAliases, null, 2), 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
      console.log(`Saved file to ${filePath}`)
      resolve(true)
    })
  })
}
