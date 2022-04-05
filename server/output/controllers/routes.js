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
exports.others = exports.forbidden = exports.gotoChat = exports.loginPost = exports.loginGet = exports.registerDel = exports.registerPatch = exports.registerPut = exports.registerPost = exports.registerGet = exports.home = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const joi_1 = __importDefault(require("joi"));
const users_1 = __importDefault(require("../models/users"));
const home = (req, res) => {
    res.redirect('/auth/login');
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
        password: joi_1.default.string().required().min(8)
    });
    const { error } = schema.validate(req.body);
    if (error)
        return res.json(error.details[0].message);
    const newUser = req.body;
    run().catch(err => console.log(err));
    function run() {
        return __awaiter(this, void 0, void 0, function* () {
            yield mongoose_1.default.connect('mongodb://localhost:27017/itchat');
            const user = new users_1.default({
                nickname: newUser.nickname,
                email: newUser.email,
                password: newUser.password
            });
            yield user.save();
            mongoose_1.default.connection.close();
        });
    }
    res.json({
        msg: 'Usuario creado ',
    });
};
exports.registerPost = registerPost;
const registerPut = (req, res) => {
    res.json({ msg: 'User update ' });
};
exports.registerPut = registerPut;
const registerPatch = (req, res) => {
    res.json({ msg: 'User modify ' });
};
exports.registerPatch = registerPatch;
const registerDel = (req, res) => {
    res.json({ msg: 'Dar de baja usuario' });
};
exports.registerDel = registerDel;
const loginGet = (req, res) => {
    res.json({ msg: 'Login Get' });
};
exports.loginGet = loginGet;
const loginPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        msg: 'Inicio de sesión',
    });
});
exports.loginPost = loginPost;
const gotoChat = (req, res) => {
    res.json({ msg: 'Pointing to Chat' });
};
exports.gotoChat = gotoChat;
const forbidden = (req, res) => {
    res.json({ msg: 'Ups! No tienes acceso' });
};
exports.forbidden = forbidden;
const others = (req, res) => {
    res.json({ msg: 'Página no existe - 404' });
    res.sendStatus(404);
};
exports.others = others;
//# sourceMappingURL=routes.js.map