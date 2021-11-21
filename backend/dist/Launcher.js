"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Server_1 = require("./Server/Server");
var Launcher = /** @class */ (function () {
    function Launcher() {
        this.server = new Server_1.Server();
    }
    Launcher.prototype.launcherApp = function () {
        console.log('start app');
        this.server.createServer();
    };
    return Launcher;
}());
new Launcher().launcherApp();
