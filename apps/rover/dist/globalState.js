"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateGlobalState = void 0;
const core_1 = require("@outp0st/core");
function generateGlobalState(env, data, showBanner) {
    const today = new Date();
    let result = (0, core_1.getDefaultGlobalState)(`Rover generated ${today.toLocaleTimeString()}`);
    result[env] = {
        contracts: data.map(x => x.contract),
        messages: data.map(x => x.messages).flat(),
        title: `[${env}] ` + result.title,
    };
    return result;
}
exports.generateGlobalState = generateGlobalState;
//# sourceMappingURL=globalState.js.map