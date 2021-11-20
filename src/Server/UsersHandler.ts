import {IncomingMessage, ServerResponse} from "http";
import {AccessRights, HTTP_CODES, HTTP_METHODS, TokenValidator} from "../Shared/Model";
import {Utils} from "./Utils";
import {BaseRequestHandler} from "./BaseRequestHandler";
import {UsersDBAccess} from "../User/UsersDBAccess";

export class UsersHandler extends BaseRequestHandler {
    private usersDbAccess = new UsersDBAccess();

    public constructor(protected req: IncomingMessage, protected res: ServerResponse, private tokenValidator: TokenValidator) {
        super(req, res)
        this.tokenValidator = tokenValidator;
    }

    async handleRequest(): Promise<void> {
        switch (this.req.method) {
            case HTTP_METHODS.GET:
                await this.handleGet();
                break;

            default:
                await this.handleNotFound();
                break;
        }
    }

    private async handleGet() {
        const operationAuthorized = await this.operationAuthorized(AccessRights.READ);

        if (operationAuthorized) {
            const parsedUrl = Utils.getUrlParams(this.req.url);

            if (parsedUrl) {
                const userId = parsedUrl?.query.id;
                if (userId) {
                    const user = await this.usersDbAccess.getUserById(userId as string);
                    if (user) {
                        this.res.writeHead(HTTP_CODES.OK, {'Content-Type': 'application/json'});
                        this.respondJSONObject(HTTP_CODES.OK, user)
                    } else {
                        await this.handleNotFound();
                    }
                } else {
                    this.respondBadRequest('userId not presented')
                }
            }
        } else {
                this.respondUnauthorized('missing or invalid token')
            }

    }

    public async operationAuthorized(operation: AccessRights): Promise<boolean> {
        const token = this.req.headers.authorization;

        if (token) {
            const tokenRights = await this.tokenValidator.validateToken(token);
            return !!tokenRights.accessRights.includes(operation)
        } else {
            return false;
        }
    }
}