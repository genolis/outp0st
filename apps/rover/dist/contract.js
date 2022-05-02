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
exports.processContractsFolders = exports.getContracts = void 0;
const core_1 = require("@outp0st/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const log_1 = require("./log");
const message_1 = require("./message");
const utils_1 = require("./utils");
const web3storage_1 = require("./web3storage");
// TODO refactor id generation (guid?)
function getContracts(options) {
    return __awaiter(this, void 0, void 0, function* () {
        const contracts = fs_1.default.readdirSync(options.contractsPath);
        let contractIdPart = 0;
        let messageIdPart = 0;
        const result = yield Promise.all(contracts.map(x => processContractsFolders(x, contractIdPart, messageIdPart, options)));
        return result;
    });
}
exports.getContracts = getContracts;
function processContractsFolders(contractTitle, contractIdPart, messageIdPart, options) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, log_1.log)(`processing ${contractTitle} contract`);
        const schemasPath = path_1.default.join(options.contractsPath, contractTitle, 'schema');
        const contractId = (0, core_1.GetId)() + contractIdPart;
        contractIdPart++;
        const messageSchemas = fs_1.default.readdirSync(schemasPath);
        const messages = (0, utils_1.getOkMessages)(messageSchemas)
            .map(m => (0, message_1.processMessageSchemas)(m, contractTitle, schemasPath, messageIdPart, contractId))
            .flat();
        const wasmTitle = (options.wasm_prefix || '') + contractTitle + '.wasm';
        const afp = generateArtifactsPath(options, contractTitle);
        let url;
        if (!options.cid) {
            (0, log_1.log)(`saving ${contractTitle} wasm to web3.storage`);
            const uploaded = yield (0, web3storage_1.web3Upload)({
                token: options.web3storageToken,
                type: 'wasm',
                filepath: afp,
                title: path_1.default.join(options.artifactsPath, wasmTitle),
            });
            options.cid = uploaded.cid;
            url = uploaded.link;
        }
        else {
            (0, log_1.log)(`getting link for ${contractTitle}.wasm using cid: ${options.cid}`);
            url = (0, web3storage_1.getLink)(path_1.default.join(options.artifactsPath, wasmTitle), options.cid);
        }
        (0, log_1.log)(`${url}`);
        const contract = {
            id: contractId,
            title: contractTitle,
            binUrl: url,
            tabTitle: (0, core_1.getTabTitle)(contractTitle),
            messages: messages.map(mx => mx.id),
        };
        return { contract, messages };
    });
}
exports.processContractsFolders = processContractsFolders;
function generateArtifactsPath(options, contractTitle) {
    let result = '';
    if (options.workspace)
        result = path_1.default.join(options.artifactsPath);
    else
        result = path_1.default.join(options.contractsPath, contractTitle, options.artifactsPath);
    return result;
}
//# sourceMappingURL=contract.js.map