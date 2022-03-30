#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const packgeJSON = __importStar(require("../../package.json"));
const file_access_1 = require("../file-access");
const waiter_1 = require("../waiter");
const program = new commander_1.Command();
program
    .version(packgeJSON.version)
    .arguments('<food> <drink>')
    .option('-w --write <string>', 'Specifies the path of the file the order will be written to')
    .action(function (food, drink, options) {
    const fileName = options.write;
    (0, waiter_1.placeOrder)(food, drink);
    if (fileName) {
        (0, file_access_1.writeFile)(fileName, { food, drink });
    }
})
    .parse(process.argv);
//# sourceMappingURL=order.bin.js.map