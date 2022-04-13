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
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("config"));
const users_1 = __importDefault(require("../models/users"));
const mongoURL = config_1.default.get('mongodb');
const key = config_1.default.get('PRIVATEKEY');
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body.email);
    console.log('Intento de iniciar sesión');
    try {
        console.log('Intento 2 de inicio');
        let user;
        console.log('Intento 4 de inicio');
        yield mongoose_1.default.connect(mongoURL);
        // Verificar email
        user = yield users_1.default.findOne({ email: email });
        console.log('Intento 5 de inicio');
        if (!user) {
            console.log('Intento 6 de inicio');
            return res.status(400).json({
                msg: 'Usuario y/o Password incorrectos - email'
            });
        }
        console.log('Intento 8 de inicio');
        //Verificar contraseña
        const validPass = yield bcryptjs_1.default.compare(password, user.password);
        if (!validPass) {
            console.log('Intento 9 de inicio');
            return res.status(400).json({
                msg: 'Usuario y/o Password incorrectos - pass'
            });
        }
        console.log('Intento 10 de inicio');
        //Verificar estado
        // console.log(user.state);
        if (!user.state) {
            console.log('Intento 11 de inicio');
            return res.status(400).json({
                msg: 'Usuario inactivo volver a iniciar sesión'
            });
        }
        console.log('Intento 12 de inicio');
        mongoose_1.default.connection.close();
        // console.log(user); 
        const payload = { nickname: user.nickname, email: user.email, passport: user.passport };
        let token = jsonwebtoken_1.default.sign(payload, key);
        console.log('Sesión Iniciada');
        res.status(200).json({ user: user, token: token });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ error: error });
    }
});
exports.loginPost = loginPost;
//# sourceMappingURL=auth.js.map