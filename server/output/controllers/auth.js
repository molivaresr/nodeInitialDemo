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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = __importDefault(require("../models/users"));
const mongoose_1 = __importDefault(require("mongoose"));
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
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
                // console.log(password);
                // console.log(user.password);
                // Verificar password
                const validatePass = bcryptjs_1.default.compare(password, user.password);
                // console.log(validatePass)
                if (!validatePass) {
                    return res.status(400).json({
                        msg: 'Usuario y/o Password incorrectos - pass'
                    });
                }
                //Verificar estado
                if (!user.state) {
                    return res.status(400).json({
                        msg: 'Usuario y/o Password incorrectos - estado'
                    });
                }
                // Responder con el inicio de sesión
                res.status(200).json({
                    msg: 'Inicio de sesión',
                });
                mongoose_1.default.connection.close();
                // console.log(user); 
                return user;
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