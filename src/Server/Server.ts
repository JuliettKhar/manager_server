import { createServer } from "http";
import {Utils} from "./Utils";
import {LoginHandler} from "./LoginHandler";
import {Authorizer} from "../Auth/Authorizer";

export class Server {
    private authorizer: Authorizer = new Authorizer();

    public createServer() {
        createServer((async (req, res) => {
            console.log(`got req from ${req.url}`);
            const basePath = Utils.getUrlBasePath(`${req.headers.host}${req.url}`);

            switch (basePath) {
                case 'login':
                   await new LoginHandler(req, res, this.authorizer).handleRequest()
                    break;
                default:
                    break;
            }

            res.end();
        })).listen(4000);
        console.log('server started')
    }
}