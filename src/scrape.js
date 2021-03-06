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
var puppeteer = require('puppeteer');
var fs = require('fs');
var twitter = require("./post");
scrape();
function scrape() {
    var _this = this;
    var jsonString = fs.readFileSync("./database.json");
    var data = JSON.parse(jsonString);
    var dataSet = new Set(data);
    (function () { return __awaiter(_this, void 0, void 0, function () {
        function pushData(result, res) {
            if (data.length >= 10) {
                data.shift();
            }
            data.push(result);
            fs.writeFile("./database.json", JSON.stringify(data), function (err) {
                if (err)
                    throw err;
            });
            twitter.post(res);
        }
        var browser, page, i, res, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer.launch({ args: ['--single-process', '--no-zygote', '--no-sandbox'], headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.goto('https://www.gurufocus.com/insider/summary', {
                            waitUntil: 'networkidle0',
                            timeout: 0
                        })];
                case 3:
                    _a.sent();
                    i = 10;
                    _a.label = 4;
                case 4:
                    if (!(i > 0)) return [3 /*break*/, 7];
                    return [4 /*yield*/, page.evaluate(function (i) {
                            var info = [];
                            info.push({
                                ticker: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[0].innerText,
                                insiderName: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[4].innerText,
                                insiderPosition: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[5].innerText,
                                positionType: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[7].innerText,
                                quantity: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[8].innerText,
                                priceChange: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[9].innerText,
                                cost: document.querySelector("#wrapper > div.table-section.full-width-on-print.full-width > table > tbody > tr:nth-child(".concat(i, ")")).querySelectorAll('td')[11].innerText
                            });
                            return info;
                        }, i)];
                case 5:
                    res = _a.sent();
                    result = res[0].cost;
                    if (dataSet.has(result)) {
                        console.log(result);
                        return [3 /*break*/, 6];
                    }
                    else {
                        pushData(result, res);
                        return [2 /*return*/];
                    }
                    _a.label = 6;
                case 6:
                    i--;
                    return [3 /*break*/, 4];
                case 7:
                    browser.close();
                    return [2 /*return*/];
            }
        });
    }); })();
    setTimeout(scrape, 30000);
}
module.exports = { scrape: scrape };
