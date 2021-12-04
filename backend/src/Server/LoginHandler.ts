import {IncomingMessage, ServerResponse} from "http";
import {Account, TokenGenerator} from "./Model";
import {HTTP_CODES, HTTP_METHODS} from "../Shared/Model";
import {BaseRequestHandler} from "./BaseRequestHandler";

export class LoginHandler extends BaseRequestHandler {

    public constructor(protected req: IncomingMessage, protected res: ServerResponse, protected tokenGenerator: TokenGenerator) {
        super(req, res)
        this.tokenGenerator = tokenGenerator;
    }

    public async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.POST:
                await this.handlePost();
                break;
            case HTTP_METHODS.OPTIONS:
                this.res.writeHead(HTTP_CODES.OK)
                break;
            default:
                await this.handleNotFound();
                break;
        }
    }

    private async handlePost() {
        try {
            const body = await this.getRequestBody();
            const sessionToken = await this.tokenGenerator.generateToken(body as Account);

            if (sessionToken) {
                this.res.statusCode = HTTP_CODES.CREATED;
                this.res.writeHead(HTTP_CODES.CREATED, {'Content-Type': 'application/json'});
                this.res.write(JSON.stringify(sessionToken));
            } else {
                this.res.statusCode = HTTP_CODES.NOT_FOUND;
                this.res.write('wrong username or password');
            }
        } catch (e) {
            this.res.write(`error ${e}`)
        }
    }
}