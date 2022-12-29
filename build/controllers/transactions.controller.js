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
exports.getLastTransactionStatusOfUser = exports.addTransaction = exports.getTransaction = exports.getAllTransactions = void 0;
var datasource_1 = require("../utils/datasource");
var entities_1 = require("../entities");
// @GET - baseUrl/transactions
function getAllTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var transactionsRepository, transactions, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    transactionsRepository = datasource_1.datasource.getRepository(entities_1.Transaction);
                    return [4 /*yield*/, transactionsRepository.find({
                            select: ["createdAt", "paymentStatus"],
                            relations: ["user"],
                            order: {
                                createdAt: "DESC",
                            },
                        })];
                case 1:
                    transactions = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "All transactions info found",
                            data: transactions,
                        })];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            error: "Swomthing went wrong",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllTransactions = getAllTransactions;
// @GET - baseUrl/transactions/:vehicleId
function getTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, vehicleId, user, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    vehicleId = req.params.vehicleId;
                    return [4 /*yield*/, usersRepository.findOne({
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
                            where: {
                                vehicleId: vehicleId,
                            },
                            order: {
                                transaction: {
                                    createdAt: "DESC",
                                },
                            },
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: "Vehicle Id is not correct",
                            })];
                    }
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "Vehicle info found",
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
exports.getTransaction = getTransaction;
// @POST - baseUrl/transactions
function addTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersRepository, transactionsRepository, vehicleId, user, newTransaction_1, newTransaction, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    usersRepository = datasource_1.datasource.getRepository(entities_1.User);
                    transactionsRepository = datasource_1.datasource.getRepository(entities_1.Transaction);
                    vehicleId = req.body.vehicleId;
                    return [4 /*yield*/, usersRepository.findOneBy({
                            vehicleId: vehicleId,
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.status(404).json({
                                success: false,
                                error: "Vehicle is not registered",
                            })];
                    }
                    if (!(user.balance < user.tollRate)) return [3 /*break*/, 3];
                    newTransaction_1 = new entities_1.Transaction();
                    newTransaction_1.user = user;
                    newTransaction_1.paymentStatus = "declined";
                    return [4 /*yield*/, transactionsRepository.save(newTransaction_1)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, res.status(400).json({
                            success: true,
                            message: "Transaction is declined due to low balance",
                        })];
                case 3:
                    newTransaction = new entities_1.Transaction();
                    newTransaction.user = user;
                    newTransaction.paymentStatus = "paid";
                    return [4 /*yield*/, transactionsRepository.save(newTransaction)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "New transaction added",
                        })];
                case 5:
                    error_3 = _a.sent();
                    console.error(error_3);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            error: "Something went wrong",
                        })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.addTransaction = addTransaction;
// @GET - baseUrl/transactions/last
// Check last transaction status of a user
function getLastTransactionStatusOfUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var vehicleId, transactionsRepository, lastTransaction, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    vehicleId = req.body.vehicleId;
                    transactionsRepository = datasource_1.datasource.getRepository(entities_1.Transaction);
                    return [4 /*yield*/, transactionsRepository.find({
                            select: {
                                id: true,
                                createdAt: true,
                            },
                            relations: {
                                user: true,
                            },
                            order: {
                                createdAt: "DESC",
                            },
                            where: {
                                user: {
                                    vehicleId: vehicleId,
                                },
                            },
                            take: 1,
                        })];
                case 1:
                    lastTransaction = _a.sent();
                    return [2 /*return*/, res.status(200).json({
                            success: true,
                            message: "Last plant reading found",
                            data: lastTransaction,
                        })];
                case 2:
                    error_4 = _a.sent();
                    console.error(error_4);
                    return [2 /*return*/, res.status(500).json({
                            success: false,
                            error: "Something went wrong",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getLastTransactionStatusOfUser = getLastTransactionStatusOfUser;
