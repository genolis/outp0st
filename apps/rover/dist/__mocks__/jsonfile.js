'use strict';
const jsonfile = jest.genMockFromModule('jsonfile');
let error;
const setup = createError => (error = createError);
const writeFile = jest.fn((fileName, order, cb) => {
    error ? cb('Something went wrong') : cb();
});
jsonfile.setup = setup;
jsonfile.writeFile = writeFile;
module.exports = jsonfile;
//# sourceMappingURL=jsonfile.js.map