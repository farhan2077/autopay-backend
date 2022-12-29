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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserBalance = exports.deleteUser = exports.updateUser = exports.addUser = exports.getUser = exports.getAllUsers = void 0;
var datasource_1 = require("../utils/datasource");
var entities_1 = require("../entities");
// @GET - baseUrl/users
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, users, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    return [4 /*yield*/, usersRepository.find({
                            select: {
                                id: true,
                                name: true,
                                address: true,
                                phone: true,
                                balance: true,
                                vehicleType: true,
                                vehicleId: true,
                                tollRate: true,
                            },
                            relations: {
                                transaction: true,
                            },
                        })];
                case 1:
                    users = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "All users info found",
                            data: users,
                        })];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
// @GET - baseUrl/users/:usersId
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, userId, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    userId = req.params.userId;
                    return [4 /*yield*/, usersRepository.findOneBy({
                            id: userId,
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "User not found",
                            })];
                    }
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "User info found",
                            data: user,
                        })];
                case 2:
                    error_2 = _a.sent();
                    console.error(error_2);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
// @POST - baseUrl/users
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, _a, name_1, address, phone, balance, vehicleType, vehicleId, tollRate, newUser, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    _a = req.body, name_1 = _a.name, address = _a.address, phone = _a.phone, balance = _a.balance, vehicleType = _a.vehicleType, vehicleId = _a.vehicleId, tollRate = _a.tollRate;
                    newUser = new entities_1.User();
                    newUser.name = name_1;
                    newUser.address = address;
                    newUser.phone = phone;
                    newUser.balance = balance;
                    newUser.vehicleType = vehicleType;
                    newUser.vehicleId = vehicleId;
                    newUser.tollRate = tollRate;
                    return [4 /*yield*/, usersRepository.save(newUser)];
                case 1:
                    _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "New user added",
                            data: newUser,
                        })];
                case 2:
                    error_3 = _b.sent();
                    console.error(error_3);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.addUser = addUser;
// @PUT - baseUrl/users/:userId
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, userId, user, _a, name_2, address, phone, balance, vehicleType, vehicleId, tollRate, newUser, result, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    userId = req.params.userId;
                    return [4 /*yield*/, usersRepository.findOneBy({
                            id: userId,
                        })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "User not found",
                            })];
                    }
                    _a = req.body, name_2 = _a.name, address = _a.address, phone = _a.phone, balance = _a.balance, vehicleType = _a.vehicleType, vehicleId = _a.vehicleId, tollRate = _a.tollRate;
                    newUser = new entities_1.User();
                    newUser.name = name_2;
                    newUser.address = address;
                    newUser.phone = phone;
                    newUser.balance = balance;
                    newUser.vehicleType = vehicleType;
                    newUser.vehicleId = vehicleId;
                    newUser.tollRate = tollRate;
                    usersRepository.merge(user, newUser);
                    return [4 /*yield*/, usersRepository.save(user)];
                case 2:
                    result = _b.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "User info updated",
                            data: result,
                        })];
                case 3:
                    error_4 = _b.sent();
                    console.error(error_4);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUser = updateUser;
// @DELETE - baseUrl/users/:userId
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, userId, user, error_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    userId = req.params.userId;
                    return [4 /*yield*/, usersRepository.findOneBy({
                            id: userId,
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "User not found",
                            })];
                    }
                    usersRepository.delete(user);
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "User deleted",
                        })];
                case 2:
                    error_5 = _a.sent();
                    console.error(error_5);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.deleteUser = deleteUser;
// @PATCH - baseUrl/users/balance/update
// @PATCH - baseUrl/users/:userId/balance/update
function updateUserBalance(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, vehicleId, user, newUser, result, error_6;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    vehicleId = req.body.vehicleId;
                    return [4 /*yield*/, usersRepository.findOneBy({
                            vehicleId: vehicleId,
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "Vehicle is not registered",
                            })];
                    }
                    newUser = new entities_1.User();
                    newUser.balance = user.balance - user.tollRate;
                    usersRepository.merge(user, newUser);
                    return [4 /*yield*/, usersRepository.save(user)];
                case 2:
                    result = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "Toll has been deducted from user balance",
                            data: result,
                        })];
                case 3:
                    error_6 = _a.sent();
                    console.error(error_6);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            message: "Something want wrong!",
                        })];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.updateUserBalance = updateUserBalance;
