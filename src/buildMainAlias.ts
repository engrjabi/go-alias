import * as fs from 'fs'
import { forEach as _forEach } from 'lodash'
import { pickBy as _pickBy } from 'lodash'
import { formmatAlias } from '../utils/formatter'

export const buildMainAlias = async (filePath, locationForMainAlias) => {

  const readData: string = await new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      return resolve(data)
    })
  })

  const aliasJsonToObject = JSON.parse(readData)
  // Will contain all aliases
  let aliasCommandsCollection = []

  // Iterate over alias json object
  _forEach(aliasJsonToObject, (commandCollection, aliasName) => {
    let aliasCommandSequence = []

    // Remove alias keys and also empty values
    const filteredCommandCollection = _pickBy(commandCollection, (value, key) => {
      return value !== '' && key !== 'alias'
    })

    // Combine arguments with commands
    _forEach(filteredCommandCollection, (commandArguments, commandName) => {
      aliasCommandSequence.push(`${commandName} ${commandArguments}`)
    })

    // Convert to alias string
    const aliasedCommand = `alias ${aliasName}="${aliasCommandSequence.join(' && ')}"`
    aliasCommandsCollection.push(aliasedCommand)

    // Generate secondary alias if alias key exists
    if (commandCollection.alias && commandCollection.alias !== '') {
      const formattedAlias = formmatAlias(commandCollection.alias)
      const aliasedCommandSecondaryCall = `alias ${formattedAlias}="${aliasCommandSequence.join(' && ')}"`
      aliasCommandsCollection.push(aliasedCommandSecondaryCall)
    }

  })

  // Save the file to home
  return await new Promise(resolve => {
    fs.writeFile(locationForMainAlias, aliasCommandsCollection.join('\n'), 'utf8', (err) => {
      if (err) {
        console.log(err)
      }
      console.log(`Saved file to ${locationForMainAlias}`)
      resolve(true)
    })
  })
}
