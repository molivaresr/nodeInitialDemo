"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes_1 = require("../controllers/routes");
const auth_1 = require("../controllers/auth");
const router = (0, express_1.Router)();
//Home
router.get('/', routes_1.home);
//Login
router.get('/api/auth/login', routes_1.loginGet);
router.post('/api/auth/login', auth_1.loginPost);
router.patch('/api/auth/login', routes_1.forbidden);
router.put('/api/auth/login', routes_1.forbidden);
router.delete('/api/auth/login', routes_1.forbidden);
//Register
router.get('/api/auth/register', routes_1.registerGet);
router.post('/api/auth/register', routes_1.registerPost);
router.put('/api/auth/register', routes_1.registerPut);
router.patch('/api/auth/register', routes_1.forbidden);
router.delete('/api/auth/register', routes_1.registerDel);
// 404 
router.get('*', routes_1.others);
router.post('*', routes_1.others);
router.patch('*', routes_1.others);
router.put('*', routes_1.others);
router.delete('*', routes_1.others);
exports.default = router;
//# sourceMappingURL=route.js.map