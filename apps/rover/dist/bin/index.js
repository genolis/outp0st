#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@outp0st/core");
const commander_1 = require("commander");
require("dotenv/config");
const fs_1 = __importDefault(require("fs"));
// import * as packgeJSON from '../../package.json';
const contract_1 = require("../contract");
const globalState_1 = require("../globalState");
const log_1 = require("../log");
const utils_1 = require("../utils");
const program = new commander_1.Command();
const defaultOptions = {
    contractsPath: './contracts',
    artifactsPath: 'artifacts',
    basePayloadUrl: 'http://localhost:3000',
    web3storageToken: process.env.TOKEN_WEB3STORAGE,
    env: core_1.OutpostCurrentState.LOCAL,
    workspace: false,
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        program
            // .version(packgeJSON.version)
            // .command('run')
            .action(run);
        yield program.parseAsync(process.argv);
    });
}
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, log_1.log)('Generating UI state for contracts');
    const userOptions = (0, utils_1.tryReadJson)(`./rover.config.json`);
    const options = Object.assign(Object.assign({}, defaultOptions), userOptions);
    if (!validateOptions(options, log_1.log))
        return;
    const data = yield (0, contract_1.getContracts)(options);
    const globalState = (0, globalState_1.generateGlobalState)(options.env, data, log_1.log);
    const uploadedUrl = yield (0, utils_1.uploadAndGenerateUrl)(globalState, options.web3storageToken, options.basePayloadUrl);
    (0, log_1.log)(`${uploadedUrl}`);
    fs_1.default.writeFileSync('test.json', JSON.stringify(globalState, null, 2));
    fs_1.default.writeFileSync('last.rover.config.json', JSON.stringify(options, null, 2));
    (0, log_1.log)('DONE!');
});
main();
function validateOptions(options, log) {
    if (!options.web3storageToken) {
        log('ERROR: no web3.storage token provided - go to https://web3.storage register and obtain one, put it in .env file');
        return false;
    }
    return true;
}
//# sourceMappingURL=index.js.map