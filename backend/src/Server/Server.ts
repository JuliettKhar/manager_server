import {createServer, ServerResponse} from "http";
import {Utils} from "./Utils";
import {LoginHandler} from "./LoginHandler";
import {Authorizer} from "../Auth/Authorizer";
import {UsersHandler} from "./UsersHandler";
import {Monitor} from "../Shared/ObjectsCounter";

export class Server {
    private authorizer: Authorizer = new Authorizer();

    public createServer() {
        createServer((async (req, res) => {
            Server.addCourseHeader(res);
            const basePath = Utils.getUrlBasePath(`${req.headers.host}${req.url}`);

            switch (basePath) {
                case 'systemInfo':
                    res.write(Monitor.printInstances())
                    break;
                case 'login':
                   await new LoginHandler(req, res, this.authorizer).handleRequest()
                    break;
                case 'users':
                    await new UsersHandler(req, res, this.authorizer).handleRequest();
                    break;
                default:
                    break;
            }

            res.end();
        })).listen(4000);
        console.log('server started')
    }

    private static addCourseHeader(res: ServerResponse) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Methods', '*')
    }
}