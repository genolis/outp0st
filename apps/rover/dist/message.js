"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMessageSchemas = void 0;
const core_1 = require("@outp0st/core");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsf_1 = require("./jsf");
const log_1 = require("./log");
const utils_1 = require("./utils");
function processMessageSchemas(messageTitle, contractTitle, schemasPath, messageIdPart, contractId) {
    const filePath = path_1.default.join(schemasPath, messageTitle);
    const data = JSON.parse(fs_1.default.readFileSync(filePath, { encoding: 'utf8' }));
    let result;
    if (data.anyOf || data.oneOf) {
        const anyOfMessages = data.anyOf || data.oneOf;
        const def = data.definitions;
        result = anyOfMessages.map(aom => {
            aom['definitions'] = def;
            return generateMessage(messageIdPart, contractTitle, aom.required[0], contractId, messageTitle, aom);
        });
    }
    else {
        result = generateMessage(messageIdPart, contractTitle, getMessageSchemaTitle(data, messageTitle), contractId, messageTitle, data);
    }
    messageIdPart++;
    return result;
}
exports.processMessageSchemas = processMessageSchemas;
function generateMessage(messageIdPart, contractTitle, messageSchemaTitle, contractId, messageTitle, messageSchema) {
    messageIdPart++;
    const t = (0, utils_1.getMessageType)(messageTitle);
    (0, log_1.log)(`processing [${t}] ${messageSchemaTitle} message of ${contractTitle} contract`);
    return {
        id: (0, core_1.GetId)() + messageIdPart,
        contractId: contractId,
        collapsed: true,
        type: t,
        message: JSON.stringify(jsf_1.jsf.generate(messageSchema), null, 2),
        title: `[${t}] ${messageSchemaTitle}`,
        renderMode: core_1.ContractMessageRenderModes.JSON,
    };
}
function getMessageSchemaTitle(data, messageTitle) {
    let result = `${messageTitle} - unk`;
    if (data && data.title)
        result = data.title;
    if ((!data || !data.title) && data.required && data.required.length > 0)
        result = data.required[0];
    return result;
}
//# sourceMappingURL=message.js.map