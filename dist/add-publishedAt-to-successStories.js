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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var client_1 = require("@sanity/client");
// Initialize the Sanity client
var client = (0, client_1.createClient)({
    projectId: 'pdp3nq38',
    dataset: 'production', // or your dataset name
    apiVersion: '2023-01-01', // Use a safe API date
    token: 'sk4QkCzSgbSlUZwLneuC20h2X2qNV4a1TEF5IiC9NmK53sspkZm7Wd0DTnzFmRYXE0C4xnhRCCAsRwz7CoAdgbF8BauAGo1fz8K06BmTErWv2wGDY2UV9Xo4vERMREGkkEpaQVCmL94LTY1jbWDeVEmgGxvQgbIMh5fIerWw5ylAENMX8LHU', // ⚠️ keep this secret, don't commit it
    useCdn: false,
});
function migratePublishedAtAndCategory() {
    return __awaiter(this, void 0, void 0, function () {
        var stories, _i, stories_1, story, updates;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.fetch("*[_type == \"successStory\" && (!defined(publishedAt) || !defined(category))]{_id, _rev, publishedAt, category}")];
                case 1:
                    stories = _a.sent();
                    console.log("\uD83D\uDCCC Found ".concat(stories.length, " stories missing publishedAt or category"));
                    _i = 0, stories_1 = stories;
                    _a.label = 2;
                case 2:
                    if (!(_i < stories_1.length)) return [3 /*break*/, 5];
                    story = stories_1[_i];
                    updates = {};
                    if (!story.publishedAt) {
                        updates.publishedAt = new Date().toISOString();
                    }
                    if (!story.category) {
                        updates.category = "smart-industry"; // 👈 default category
                    }
                    if (!(Object.keys(updates).length > 0)) return [3 /*break*/, 4];
                    return [4 /*yield*/, client.patch(story._id).set(updates).commit()];
                case 3:
                    _a.sent();
                    console.log("\u2705 Updated ".concat(story._id, " with:"), updates);
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log("🎉 Migration complete.");
                    return [2 /*return*/];
            }
        });
    });
}
migratePublishedAtAndCategory().catch(function (err) {
    console.error("❌ Migration failed:", err);
});
