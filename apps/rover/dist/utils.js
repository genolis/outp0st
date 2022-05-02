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
exports.tryReadJson = exports.uploadAndGenerateUrl = exports.getMessageType = exports.getOkMessages = void 0;
const core_1 = require("@outp0st/core");
const fs_1 = __importDefault(require("fs"));
const web3storage_1 = require("./web3storage");
function getOkMessages(messages) {
    return (messages
        .filter(m => m.indexOf('instantiate') !== -1 ||
        m.indexOf('query') !== -1 ||
        m.indexOf('execute') !== -1)
        // https://stackoverflow.com/questions/23921683/javascript-move-an-item-of-an-array-to-the-front
        .sort(function (x, y) {
        return x.indexOf('instantiate') !== -1
            ? -1
            : y.indexOf('instantiate') !== -1
                ? 1
                : 0;
    }));
}
exports.getOkMessages = getOkMessages;
function getMessageType(m) {
    if (m.indexOf('instantiate') !== -1)
        return core_1.ContractMessageTypes.INSTA;
    else if (m.indexOf('query') !== -1)
        return core_1.ContractMessageTypes.QUERY;
    else if (m.indexOf('execute') !== -1)
        return core_1.ContractMessageTypes.EXECUTE;
}
exports.getMessageType = getMessageType;
function uploadAndGenerateUrl(globalState, web3storageToken, basePayloadUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const stateUrl = yield (0, web3storage_1.web3Upload)({
            token: web3storageToken,
            type: 'json',
            json: globalState,
            title: 'rover_generated.json',
        });
        return `${basePayloadUrl}/outpost?state=${stateUrl.link}#CONFIG`;
    });
}
exports.uploadAndGenerateUrl = uploadAndGenerateUrl;
function tryReadJson(path) {
    try {
        const jsonString = fs_1.default.readFileSync(path, {
            encoding: 'utf-8',
        });
        return JSON.parse(jsonString);
    }
    catch (err) {
        //console.log(err);
        return;
    }
}
exports.tryReadJson = tryReadJson;
//# sourceMappingURL=utils.js.map