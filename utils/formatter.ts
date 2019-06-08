const _camelCase = require('lodash/camelCase');

export const formmatAlias = (aliasToBeFormatted) => {
	const formattedAlias = _camelCase(aliasToBeFormatted);
	return `${formattedAlias}`;
};
