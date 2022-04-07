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
exports.loginPost = void 0;
const users_1 = __importDefault(require("../models/users"));
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const privatekey_1 = __importDefault(require("../env/privatekey"));
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let key = privatekey_1.default + password;
    try {
        let user;
        run().catch(err => console.log(err));
        function run() {
            return __awaiter(this, void 0, void 0, function* () {
                yield mongoose_1.default.connect('mongodb://localhost:27017/itchat');
                // Verificar email
                user = yield users_1.default.findOne({ email: email });
                if (!user) {
                    return res.status(400).json({
                        msg: 'Usuario y/o Password incorrectos - email'
                    });
                }
                //Verificar estado
                // console.log(user.state);
                if (!user.state) {
                    return res.status(400).json({
                        msg: 'Usuario inactivo volver a iniciar sesión'
                    });
                }
                mongoose_1.default.connection.close();
                // console.log(user); 
                const payload = { nickname: user.nickname, email: user.email };
                let token = jsonwebtoken_1.default.sign(payload, key);
                res.status(200).json({ token: token });
            });
        }
    }
    catch (error) {
        // console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.loginPost = loginPost;
//# sourceMappingURL=auth.js.map