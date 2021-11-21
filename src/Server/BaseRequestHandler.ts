import {IncomingMessage, ServerResponse} from "http";
import {HTTP_CODES, User} from "../Shared/Model";
import {Account} from "./Model";

export abstract class BaseRequestHandler {
    protected constructor(protected req: IncomingMessage, protected res: ServerResponse) {
        this.req = req;
        this.res = res;
    }

    protected async handleNotFound() {
        this.res.statusCode = HTTP_CODES.NOT_FOUND;
        this.res.write('Not Found');
    }

    protected respondJSONObject(code: HTTP_CODES, obj: any) {
        this.res.writeHead(code, {'Content-Type': 'application/json'});
        this.res.write(JSON.stringify(obj))
    }

    protected respondBadRequest(message: string) {
        this.res.statusCode = HTTP_CODES.BAD_REQUEST;
        this.res.write(message)
    }

    protected respondUnauthorized(message: string) {
        this.res.statusCode = HTTP_CODES.UNAUTHORIZED;
        this.res.write(message);
        this.res.end();
    }

    protected respondText(httpCode: HTTP_CODES, message: string) {
        this.res.statusCode = httpCode;
        this.res.write(message);
        this.res.end();
    }

    protected async getRequestBody(): Promise<User | Account> {
        return new Promise((resolve, reject) => {
            let body = '';
            this.req.on('data', (data: string) => body += data)
            this.req.on('end', () => {
                try {
                    resolve(JSON.parse(body))
                } catch (e) {
                    reject(e)
                }
            })
            this.req.on('error', (e) => reject(e))
        })
    }

    abstract handleRequest(): Promise<void>
}