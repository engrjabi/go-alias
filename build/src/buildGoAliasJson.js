"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = require("fs");
var lodash_1 = require("lodash");
var lodash_2 = require("lodash");
var fileOperations_1 = require("../utils/fileOperations");
var formatter_1 = require("../utils/formatter");
exports.buildGoAliasJson = function (filePath, projectDirectories) {
    var projectDirCollection = [];
    var aliasFileStructureInJson = {};
    var originalFile = null;
    var originalFileObject = {};
    try {
        originalFile = fs.readFileSync(filePath);
        originalFileObject = JSON.parse(originalFile);
    }
    catch (e) {
        originalFile = null;
        originalFileObject = {};
    }
    projectDirectories.map(function (currentDirCollection) {
        var allProjectsInDirectory = fileOperations_1.getDirectories(currentDirCollection);
        projectDirCollection = projectDirCollection.concat(allProjectsInDirectory);
    });
    projectDirCollection.map(function (currentProject) {
        var splitDir = currentProject.split('/');
        var lastElementIndex = splitDir.length - 1;
        var lastElement = splitDir[lastElementIndex];
        var secondToLastElement = splitDir[lastElementIndex - 1];
        var alias = formatter_1.formmatAlias("go " + lastElement + " " + secondToLastElement);
        aliasFileStructureInJson[alias] = {
            cd: "'" + currentProject + "'",
            nvm: '',
            source: '',
            alias: ''
        };
    });
    var mergedAliasesUnFiltered = lodash_1.merge(tslib_1.__assign({}, aliasFileStructureInJson), originalFileObject);
    var mergedAliases = lodash_2.pickBy(mergedAliasesUnFiltered, function (v, k) {
        return aliasFileStructureInJson[k];
    });
    return new Promise(function (resolve) {
        fs.writeFile(filePath, JSON.stringify(mergedAliases, null, 2), 'utf8', function (err) {
            if (err) {
                console.log(err);
            }
            console.log("Saved file to " + filePath);
            resolve(true);
        });
    });
};
//# sourceMappingURL=buildGoAliasJson.js.map