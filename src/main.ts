#!/usr/bin/env node

import * as commander from 'commander'
import { buildGoAliasJson } from './buildGoAliasJson'
import { buildMainAlias } from './buildMainAlias'
import { initiateConfig, locationForJsonAlias, locationForMainAlias } from './configInit'
import { insertAliasOnRc } from './insertAliasOnRc'

// PROGRAM START
commander
  .action(async () => {
      const config = await initiateConfig()
      await buildGoAliasJson(locationForJsonAlias, config.projectPaths)
      await buildMainAlias(locationForJsonAlias, locationForMainAlias)
      await insertAliasOnRc(config.rcFilePath)
    }
  )

commander.parse(process.argv)
