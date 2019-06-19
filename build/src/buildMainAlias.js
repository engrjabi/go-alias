"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var formatter_1 = require("../utils/formatter");
exports.buildMainAlias = function (filePath, locationForMainAlias) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var readData, aliasJsonToObject, aliasCommandsCollection;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, new Promise(function (resolve, reject) {
                    fs.readFile(filePath, 'utf8', function (err, data) {
                        if (err) {
                            return reject(err);
                        }
                        return resolve(data);
                    });
                })];
            case 1:
                readData = _a.sent();
                aliasJsonToObject = JSON.parse(readData);
                aliasCommandsCollection = [];
                lodash_1.forEach(aliasJsonToObject, function (commandCollection, aliasName) {
                    var aliasCommandSequence = [];
                    var filteredCommandCollection = lodash_2.pickBy(commandCollection, function (value, key) {
                        return value !== '' && key !== 'alias';
                    });
                    lodash_1.forEach(filteredCommandCollection, function (commandArguments, commandName) {
                        aliasCommandSequence.push(commandName + " " + commandArguments);
                    });
                    var aliasedCommand = "alias " + aliasName + "=\"" + aliasCommandSequence.join(' && ') + "\"";
                    aliasCommandsCollection.push(aliasedCommand);
                    if (commandCollection.alias && commandCollection.alias !== '') {
                        var formattedAlias = formatter_1.formmatAlias(commandCollection.alias);
                        var aliasedCommandSecondaryCall = "alias " + formattedAlias + "=\"" + aliasCommandSequence.join(' && ') + "\"";
                        aliasCommandsCollection.push(aliasedCommandSecondaryCall);
                    }
                });
                return [4, new Promise(function (resolve) {
                        fs.writeFile(locationForMainAlias, aliasCommandsCollection.join('\n'), 'utf8', function (err) {
                            if (err) {
                                console.log(err);
                            }
                            console.log("Saved file to " + locationForMainAlias);
                            resolve(true);
                        });
                    })];
            case 2: return [2, _a.sent()];
        }
    });
}); };
//# sourceMappingURL=buildMainAlias.js.map