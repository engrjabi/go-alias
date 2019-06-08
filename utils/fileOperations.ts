const { lstatSync, readdirSync } = require('fs');
const { join } = require('path');

export const isDirectory = source => lstatSync(source).isDirectory();
export const getDirectories = source =>
	readdirSync(source).map(name => join(source, name)).filter(isDirectory);

