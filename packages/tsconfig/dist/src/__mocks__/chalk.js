'use strict';
const chalk = jest.genMockFromModule('chalk');
chalk.red = jest.fn();
chalk.green = jest.fn();
chalk.blue = {
    bold: jest.fn()
};
module.exports = chalk;
//# sourceMappingURL=chalk.js.map