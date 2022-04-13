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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_1 = __importDefault(require("../models/users"));
const config_1 = __importDefault(require("config"));
const mongoURL = config_1.default.get('mongodb');
const key = config_1.default.get('PRIVATEKEY');
const home = (req, res) => {
    // res.redirect('/api/auth/login')
    res.json({ msg: 'conexión Ok' });
};
exports.home = home;
const registerGet = (req, res) => {
    res.json({ msg: 'Ver mis datos de usuario' });
};
exports.registerGet = registerGet;
const registerPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const schema = Joi.object ({
    //     nickname: Joi.string().required().min(5),
    //     email: Joi.string().email(),
    //     password: Joi.string().required().min(4)
    // });
    // const {error} = schema.validate(req.body)
    // if(error) return res.json(error.details[0].message)
    const newUser = req.body;
    const newPassport = newUser.nickname + newUser.email;
    const salt = bcryptjs_1.default.genSaltSync(10);
    const passwordHashed = bcryptjs_1.default.hashSync(newUser.password, salt);
    const passport = bcryptjs_1.default.hashSync(newPassport, salt);
    yield mongoose_1.default.connect(mongoURL);
    let users = yield users_1.default.find({});
    let findName = yield users_1.default.findOne({ nickname: newUser.nickname });
    let findUser = yield users_1.default.findOne({ email: newUser.email });
    let token = jsonwebtoken_1.default.sign({ nickname: newUser.nickname, email: newUser.email, password: passport }, key);
    console.log(users);
    if (!(findUser === null || findUser === void 0 ? void 0 : findUser.email)) {
        if (findName) {
            let nicknameRepeated = newUser.nickname + `${users.length}`;
            const user = new users_1.default({
                nickname: nicknameRepeated,
                email: newUser.email,
                password: passwordHashed,
                passport: passport,
                token: token
            });
            yield user.save();
            mongoose_1.default.connection.close();
            res.json({
                msg: 'Tu nickname ya existe, pero te hemos sugerido uno! Podrás modificarlo luego',
                nickname: nicknameRepeated
            });
        }
        const user = new users_1.default({
            nickname: newUser.nickname,
            email: newUser.email,
            password: passwordHashed,
            passport: passport,
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