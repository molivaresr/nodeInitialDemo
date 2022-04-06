"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../controllers/routes");
const auth_1 = require("../controllers/auth");
const path_1 = __importDefault(require("./path"));
const router = (0, express_1.Router)();
//Home
router.get(path_1.default.home, routes_1.home);
//Login
router.get(path_1.default.login, routes_1.forbidden);
router.post(path_1.default.login, auth_1.loginPost);
router.patch(path_1.default.login, routes_1.forbidden);
router.put(path_1.default.login, routes_1.forbidden);
router.delete(path_1.default.login, routes_1.forbidden);
//Register
router.get(path_1.default.register, routes_1.registerGet);
router.post(path_1.default.register, routes_1.registerPost);
router.put(path_1.default.register, routes_1.forbidden);
router.patch(path_1.default.register, routes_1.forbidden);
router.delete(path_1.default.register, routes_1.forbidden);
// 404 
router.get(path_1.default.others, routes_1.others);
router.post(path_1.default.others, routes_1.others);
router.patch(path_1.default.others, routes_1.others);
router.put(path_1.default.others, routes_1.others);
router.delete(path_1.default.others, routes_1.others);
exports.default = router;
//# sourceMappingURL=route.js.map