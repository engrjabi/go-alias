"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var jsonfile = require("jsonfile");
var util_1 = require("util");
var configQuestions_1 = require("./configQuestions");
var readJson = util_1.promisify(jsonfile.readFile);
exports.rootProjectPath = process.env.HOME + "/.go-alias";
exports.locationForJsonAlias = exports.rootProjectPath + "/go.alias.json";
exports.locationForMainAlias = exports.rootProjectPath + "/main.alias";
exports.locationForMainConfig = exports.rootProjectPath + "/goconfig.json";
exports.configToInsertOnRcFile = "\n#ALIAS CONFIGS BY GO-ALIAS\nsource " + exports.locationForMainAlias + "\n";
function initiateConfig() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var config;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    config = {};
                    if (!fs.existsSync(exports.rootProjectPath)) {
                        fs.mkdirSync(exports.rootProjectPath);
                    }
                    if (!fs.existsSync(exports.locationForMainConfig)) return [3, 2];
                    return [4, readJson(exports.locationForMainConfig)];
                case 1:
                    config = _a.sent();
                    return [3, 4];
                case 2: return [4, configQuestions_1.askAndWriteConfigFile()];
                case 3:
                    config = _a.sent();
                    _a.label = 4;
                case 4: return [2, config];
            }
        });
    });
}
exports.initiateConfig = initiateConfig;
//# sourceMappingURL=configInit.js.map