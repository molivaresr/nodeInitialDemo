"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function default_1(key, token, res, req) {
    if (token) {
        jsonwebtoken_1.default.verify(token, key, (err, decoded) => {
            if (err) {
                return res.json({ msg: 'Token no válida' });
            }
            else {
                console.log('Valido!');
            }
        });
    }
    else {
        res.send({
            msg: 'Token pendiente'
        });
    }
}
exports.default = default_1;
//# sourceMappingURL=validate.js.map