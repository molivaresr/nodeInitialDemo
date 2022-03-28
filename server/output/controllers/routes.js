"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noExist = exports.forbidden = exports.gotoChat = exports.register = exports.login = exports.home = void 0;
const home = (req, res) => {
    res.redirect('/login');
};
exports.home = home;
const login = (req, res) => {
    res.json({ msg: 'Login' });
};
exports.login = login;
const register = (req, res) => {
    res.json({ msg: 'Register a new user' });
};
exports.register = register;
const gotoChat = (req, res) => {
    res.json({ msg: 'Pointing to Chat' });
};
exports.gotoChat = gotoChat;
const forbidden = (req, res) => {
    res.json({ msg: 'Ups! No tienes acceso' });
};
exports.forbidden = forbidden;
const noExist = (req, res) => {
    res.json({ msg: 'Página no existe - 404' });
    res.sendStatus(404);
};
exports.noExist = noExist;
//# sourceMappingURL=routes.js.map