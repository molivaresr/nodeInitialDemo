"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = exports.getUser = exports.getUsers = void 0;
const getUsers = (req, res) => {
    res.json({ msg: 'Users' });
};
exports.getUsers = getUsers;
const getUser = (req, res) => {
    const id = req.params.id;
    res.json({
        msg: 'User',
        id
    });
};
exports.getUser = getUser;
const newUser = (req, res) => {
    const body = req.body;
    console.log(body);
    res.json(body);
};
exports.newUser = newUser;
//# sourceMappingURL=users.js.map