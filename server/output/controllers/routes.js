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
exports.others = exports.forbidden = exports.registerPost = exports.registerGet = exports.home = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_1 = __importDefault(require("../models/users"));
const privatekey_1 = __importDefault(require("../env/privatekey"));
const home = (req, res) => {
    res.redirect('/api/auth/login');
};
exports.home = home;
const registerGet = (req, res) => {
    res.json({ msg: 'Ver mis datos de usuario' });
};
exports.registerGet = registerGet;
const registerPost = (req, res) => {
    const schema = joi_1.default.object({
        nickname: joi_1.default.string().required().min(5),
        email: joi_1.default.string().email(),
        password: joi_1.default.string().required().min(4)
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.json(error.details[0].message);
    const newUser = req.body;
    // console.log(newUser.email, newUser.password)
    const salt = bcryptjs_1.default.genSaltSync(10);
    // const passwordHash = bcrypt.hashSync(newUser.password, salt);
    let key = privatekey_1.default + newUser.password;
    run().catch(err => console.log(err));
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect('mongodb://localhost:27017/itchat');
            let findUser = yield users_1.default.findOne({ email: newUser.email });
            let token = jsonwebtoken_1.default.sign({ nickname: newUser.nickname, email: newUser.email }, key);
            // console.log(token)
            // console.log('finUser',findUser)
            if (!(findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
                const user = new users_1.default({
                    nickname: newUser.nickname,
                    email: newUser.email,
                    token: token
                });
                yield user.save();
                mongoose_1.default.connection.close();
                res.json({
                    msg: 'Usuario creado ',
                });
            }
            else {
                res.json({ msg: 'El email ya está en uso' });
            }
        });
    }
};
exports.registerPost = registerPost;
const forbidden = (req, res) => {
    res.json({ msg: 'Ups! No tienes acceso' });
};
exports.forbidden = forbidden;
const others = (req, res) => {
    res.status(404).json({ msg: 'Página no existe - 404' });
};
exports.others = others;
//# sourceMappingURL=routes.js.map