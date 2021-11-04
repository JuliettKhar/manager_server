import { Server } from "./Server/Server";

class Launcher {
    private server: Server;

    constructor() {
        this.server = new Server();
    }

   public launcherApp() {
        console.log('start app');
        this.server.createServer();
    }
}

new Launcher().launcherApp();