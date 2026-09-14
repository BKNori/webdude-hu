"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processGenerationQueue = void 0;
const admin = require("firebase-admin");
admin.initializeApp();
var queueProcessor_1 = require("./queueProcessor");
Object.defineProperty(exports, "processGenerationQueue", { enumerable: true, get: function () { return queueProcessor_1.processGenerationQueue; } });
//# sourceMappingURL=index.js.map