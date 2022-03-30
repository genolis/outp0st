"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.placeOrder = void 0;
const chalk_1 = __importDefault(require("chalk"));
const boxen_1 = __importDefault(require("boxen"));
const orderTitle = '\n' +
    '                                         _           \n' +
    '  _   _  ___  _   _ _ __    ___  _ __ __| | ___ _ __ \n' +
    " | | | |/ _ \\| | | | '__|  / _ \\| '__/ _` |/ _ \\ '__|\n" +
    ' | |_| | (_) | |_| | |    | (_) | | | (_| |  __/ |   \n' +
    '  \\__, |\\___/ \\__,_|_|     \\___/|_|  \\__,_|\\___|_|   \n' +
    '  |___/                                              \n';
function placeOrder(food, drink) {
    const foodOrder = `${chalk_1.default.green('You ordered the following food: ')} ${chalk_1.default.blue.bold(food)} \n`;
    const drinkOrder = `${chalk_1.default.green('You ordered the following drink: ')} ${chalk_1.default.blue.bold(drink)}`;
    const order = `${orderTitle} ${(0, boxen_1.default)(foodOrder + drinkOrder, {
        padding: 1,
        margin: 1,
        borderStyle: 'round'
    })}`;
    console.log(order);
}
exports.placeOrder = placeOrder;
//# sourceMappingURL=waiter.js.map