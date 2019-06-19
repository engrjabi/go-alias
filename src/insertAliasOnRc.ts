import * as  fs from 'fs'
import { configToInsertOnRcFile } from './configInit'

export async function insertAliasOnRc(rcFilePath) {
  const rcFile: Buffer = await new Promise((resolve, reject) => {
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
