"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const node_fs_1 = __importDefault(require("node:fs"));
const server = http_1.default.createServer((req, res) => {
    var _a, _b;
    if (req.url === '/') {
        const htmlFile = node_fs_1.default.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlFile);
    }
    else if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.endsWith('.css')) {
        res.writeHead(200, { 'Content-Type': 'text/css' });
    }
    else if ((_b = req.url) === null || _b === void 0 ? void 0 : _b.endsWith('.js')) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
    }
    node_fs_1.default.readFile(`./public/${req.url}`, 'utf-8', (error, content) => {
        if (error) {
            // res.writeHead(404, { 'Content-Type': 'text/html' });
            // res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            return res.end('not fount');
        }
        res.end(content);
    });
});
server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
