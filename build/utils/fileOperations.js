"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _a = require('fs'), lstatSync = _a.lstatSync, readdirSync = _a.readdirSync;
var join = require('path').join;
exports.isDirectory = function (source) { return lstatSync(source).isDirectory(); };
exports.getDirectories = function (source) {
    return readdirSync(source).map(function (name) { return join(source, name); }).filter(exports.isDirectory);
};
//# sourceMappingURL=fileOperations.js.map