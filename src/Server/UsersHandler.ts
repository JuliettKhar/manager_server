import {IncomingMessage, ServerResponse} from "http";
import {AccessRights, HTTP_CODES, HTTP_METHODS, TokenValidator, User} from "../Shared/Model";
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
            case HTTP_METHODS.PUT:
                await this.handlePut();
                break;
            case HTTP_METHODS.DELETE:
                await this.handleDelete();
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
                if (parsedUrl?.query.id) {
                    const user = await this.usersDbAccess.getUserById(userId as string);
                    if (user) {
                        this.res.writeHead(HTTP_CODES.OK, {'Content-Type': 'application/json'});
                        this.respondJSONObject(HTTP_CODES.OK, user)
                    } else {
                        await this.handleNotFound();
                    }
                } else if (parsedUrl?.query.name) {
                    const users = await this.usersDbAccess.getUserByName(parsedUrl.query.name as string)
                    this.respondJSONObject(HTTP_CODES.OK, users)
                } else {
                    this.respondBadRequest('userId or name not presented')
                }
            }
        } else {
            this.respondUnauthorized('missing or invalid token')
        }

    }

    private async handlePut() {
        const operationAuthorized = await this.operationAuthorized(AccessRights.READ);

        if (operationAuthorized) {
            try {
                const user: User = await this.getRequestBody() as User;
                await this.usersDbAccess.putUser(user);
                this.respondText(HTTP_CODES.CREATED, `user ${user.name} created`)
            } catch (e: any) {
                this.respondBadRequest(e.message)
            }

        } else {
            this.respondUnauthorized('missing or invalid token')
        }
    }

    private async handleDelete() {
        const operationAuthorized = await this.operationAuthorized(AccessRights.READ);

        if (operationAuthorized) {
            const parsedUrl = Utils.getUrlParams(this.req.url);

                if (parsedUrl?.query.id) {
                    const deleteRes = await this.usersDbAccess.deleteUser(parsedUrl.query.id as string);

                    if (deleteRes) {
                        this.respondText(HTTP_CODES.OK, `user ${parsedUrl.query.id} deleted`)
                    } else {
                        this.respondText(HTTP_CODES.NOT_FOUND, `user ${parsedUrl.query.id} not found`)
                    }
                } else {
                    this.respondBadRequest('missing id')
                }

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