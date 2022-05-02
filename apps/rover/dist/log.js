"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const boxen_1 = __importDefault(require("boxen"));
// https://manytools.org/hacker-tools/ascii-banner/
const banner = '\n' +
    `
    ::::::::  :::    ::: ::::::::::: :::::::::   ::::::::   :::::::: :::::::::::   ::: :::::::::   ::::::::  :::     ::: :::::::::: :::::::::  
   :+:    :+: :+:    :+:     :+:     :+:    :+: :+:    :+: :+:    :+:    :+:      :+:  :+:    :+: :+:    :+: :+:     :+: :+:        :+:    :+: 
   +:+    +:+ +:+    +:+     +:+     +:+    +:+ +:+    +:+ +:+           +:+     +:+   +:+    +:+ +:+    +:+ +:+     +:+ +:+        +:+    +:+ 
   +#+    +:+ +#+    +:+     +#+     +#++:++#+  +#+    +:+ +#++:++#++    +#+    +#+    +#++:++#:  +#+    +:+ +#+     +:+ +#++:++#   +#++:++#:  
   +#+    +#+ +#+    +#+     +#+     +#+        +#+    +#+        +#+    +#+   +#+     +#+    +#+ +#+    +#+  +#+   +#+  +#+        +#+    +#+ 
   #+#    #+# #+#    #+#     #+#     #+#        #+#    #+# #+#    #+#    #+#  #+#      #+#    #+# #+#    #+#   #+#+#+#   #+#        #+#    #+# 
    ########   ########      ###     ###         ########   ########     ### ###       ###    ###  ########      ###     ########## ###    ### `;
let msgs = [];
function log(msg) {
    console.clear();
    msgs.push(msg);
    const messages = msgs.join('\n');
    const boxed = (0, boxen_1.default)(messages, {
        padding: 1,
        margin: 1,
        borderStyle: 'round',
    });
    const result = banner + boxed;
    console.log(result);
}
exports.log = log;
//# sourceMappingURL=log.js.map