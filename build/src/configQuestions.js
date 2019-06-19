"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var inquirer = require("inquirer");
var util_1 = require("util");
var configInit_1 = require("./configInit");
var jsonfile = require("jsonfile");
var writeJson = util_1.promisify(jsonfile.writeFile);
var shellQuestion = [
    {
        type: 'list',
        name: 'shell',
        message: 'What shell do you use?',
        choices: ['Bash', 'Zsh'],
        filter: function (val) {
            return val.toLowerCase();
        }
    }
];
var directoryQuestion = [
    {
        type: 'input',
        name: 'dir',
        message: 'Enter full path directory to include, type "n" if done'
    }
];
function askUserForConfig() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var projectList, directoryAnswer, shell, dir;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    projectList = [];
                    directoryAnswer = '';
                    return [4, inquirer.prompt(shellQuestion)];
                case 1:
                    shell = (_a.sent()).shell;
                    _a.label = 2;
                case 2:
                    if (!(directoryAnswer !== 'n')) return [3, 4];
                    return [4, inquirer.prompt(directoryQuestion)];
                case 3:
                    dir = (_a.sent()).dir;
                    directoryAnswer = dir.trim().replace(/['"]/gi, '');
                    if (directoryAnswer !== 'n') {
                        projectList.push(directoryAnswer);
                    }
                    return [3, 2];
                case 4: return [2, {
                        shell: process.env.HOME + "/." + shell + "rc",
                        projectList: projectList
                    }];
            }
        });
    });
}
exports.askUserForConfig = askUserForConfig;
function askAndWriteConfigFile() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var _a, shell, projectList, config;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4, askUserForConfig()];
                case 1:
                    _a = _b.sent(), shell = _a.shell, projectList = _a.projectList;
                    config = {
                        'rcFilePath': shell,
                        'projectPaths': projectList
                    };
                    return [4, writeJson(configInit_1.locationForMainConfig, config)];
                case 2:
                    _b.sent();
                    console.log("Saved config on " + configInit_1.locationForMainConfig);
                    return [2, config];
            }
        });
    });
}
exports.askAndWriteConfigFile = askAndWriteConfigFile;
//# sourceMappingURL=configQuestions.js.map