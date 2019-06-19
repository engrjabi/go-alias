"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var configInit_1 = require("./configInit");
function insertAliasOnRc(rcFilePath) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var rcFile;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, new Promise(function (resolve, reject) {
                        fs.readFile(rcFilePath, function (err, data) {
                            if (err) {
                                reject(err);
                            }
                            return resolve(data);
                        });
                    })];
                case 1:
                    rcFile = _a.sent();
                    if (rcFile.includes(configInit_1.configToInsertOnRcFile)) {
                        return [2];
                    }
                    return [4, new Promise(function (resolve, reject) {
                            fs.appendFile(rcFilePath, configInit_1.configToInsertOnRcFile, function (err) {
                                if (err) {
                                    reject(err);
                                }
                                console.log('Saved!');
                                resolve(true);
                            });
                        })];
                case 2:
                    _a.sent();
                    return [2];
            }
        });
    });
}
exports.insertAliasOnRc = insertAliasOnRc;
//# sourceMappingURL=insertAliasOnRc.js.map