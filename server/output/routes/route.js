"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../controllers/routes");
const router = (0, express_1.Router)();
router.get('/', routes_1.home);
router.get('/register', routes_1.register);
router.get('/login', routes_1.login);
router.get('/chat', routes_1.gotoChat);
router.get('*', routes_1.noExist);
exports.default = router;
//# sourceMappingURL=route.js.map