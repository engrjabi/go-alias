#!/usr/bin/env node
"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var commander = require("commander");
var buildGoAliasJson_1 = require("./buildGoAliasJson");
var buildMainAlias_1 = require("./buildMainAlias");
var configInit_1 = require("./configInit");
var insertAliasOnRc_1 = require("./insertAliasOnRc");
commander
    .action(function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var config;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, configInit_1.initiateConfig()];
            case 1:
                config = _a.sent();
                return [4, buildGoAliasJson_1.buildGoAliasJson(configInit_1.locationForJsonAlias, config.projectPaths)];
            case 2:
                _a.sent();
                return [4, buildMainAlias_1.buildMainAlias(configInit_1.locationForJsonAlias, configInit_1.locationForMainAlias)];
            case 3:
                _a.sent();
                return [4, insertAliasOnRc_1.insertAliasOnRc(config.rcFilePath)];
            case 4:
                _a.sent();
                return [2];
        }
    });
}); });
commander.parse(process.argv);
//# sourceMappingURL=main.js.map