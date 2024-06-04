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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserHandler = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, express_validator_1.check)('email_usuario').notEmpty().withMessage('El campo de email está vacío').run(req);
        yield (0, express_validator_1.check)('passwd').notEmpty().withMessage('El campo de contraseña está vacío').run(req);
        yield (0, express_validator_1.check)('user_name').notEmpty().withMessage('El campo de nombre está vacío').run(req);
        const checkEmptyFiels = (0, express_validator_1.validationResult)(req);
        const errMsg = [];
        if (checkEmptyFiels.isEmpty()) {
            res.send({ errors: checkEmptyFiels.array() });
        }
        else {
            const user = req.body; //obtener el user desde el body.
            const emailExist = yield (0, user_model_1.findUserByEmail)(user.email_usuario);
            const userExist = yield (0, user_model_1.findUserByName)(user.user_name);
            if (user.passwd !== user.repeat_passwd) {
                errMsg.push('Las contraseñas no coinciden');
            }
            if (emailExist) {
                errMsg.push('El email ya está en uso');
            }
            if (userExist) {
                errMsg.push('El email ya está en uso');
            }
            if (errMsg.length != 0) {
                res.status(400).json({ error: 'El email ya está en uso', listError: errMsg });
            }
            const newUser = yield (0, user_model_1.createUser)(user);
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error: createUserHandler ' + error });
    }
});
exports.createUserHandler = createUserHandler;