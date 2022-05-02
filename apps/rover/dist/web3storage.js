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
Object.defineProperty(exports, "__esModule", { value: true });
exports.web3Upload = exports.getLink = exports.storeFiles = exports.makeFileObjectsJson = exports.getStateTitle = void 0;
// https://web3.storage/docs/how-tos/store
const web3_storage_1 = require("web3.storage");
function getStateTitle(title, version) {
    return `outpost.${title.replace(/\s/g, '_')}.${version || '1.0.0'}.${Date.now()}.json`;
}
exports.getStateTitle = getStateTitle;
function makeFileObjectsJson(filename = 'hello.json', outpost) {
    const obj = outpost;
    const buffer = Buffer.from(JSON.stringify(obj));
    const files = [new web3_storage_1.File([buffer], filename)];
    return files;
}
exports.makeFileObjectsJson = makeFileObjectsJson;
function storeFiles(files, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new web3_storage_1.Web3Storage({
            token,
        });
        const cid = yield client.put(files);
        console.log('stored files with cid:', cid);
        return cid;
    });
}
exports.storeFiles = storeFiles;
function getLink(title, cid) {
    return `https://dweb.link/ipfs/${cid}/${title}`;
}
exports.getLink = getLink;
function web3Upload(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const { token, type, filepath, json, title } = params;
        const files = type === 'wasm'
            ? yield (0, web3_storage_1.getFilesFromPath)(filepath || '')
            : makeFileObjectsJson(title, json);
        const cid = yield storeFiles(files, token);
        return { cid, link: getLink(title || '', cid) };
    });
}
exports.web3Upload = web3Upload;
//# sourceMappingURL=web3storage.js.map