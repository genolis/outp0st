"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = void 0;
const chalk_1 = __importDefault(require("chalk"));
const jsonfile_1 = __importDefault(require("jsonfile"));
function writeFile(fileName, order) {
    jsonfile_1.default.writeFile(fileName, order, function (err) {
        err
            ? console.log(chalk_1.default.red(err))
            : console.log(chalk_1.default.green('Order successfully written to file'));
    });
}
exports.writeFile = writeFile;
//# sourceMappingURL=file-access.js.map