import { IncomingMessage, ServerResponse} from "http";
import {Account, Handler, TokenGenerator} from "./Model";

export class LoginHandler implements Handler {

    public constructor(private req: IncomingMessage, private res: ServerResponse, private tokenGenerator: TokenGenerator) {
        this.req = req;
        this.res = res;
        this.tokenGenerator = tokenGenerator;
    }

    public async handleRequest(): Promise<void> {
        try {
            const body = await this.getRequestBody();
            const sessionToken = await this.tokenGenerator.generateToken(body);

            sessionToken ? this.res.write('valid token') : this.res.write('invalid token')
            console.log(body, sessionToken)
        } catch (e) {
            this.res.write(`error ${e}`)
        }

    }

    private async getRequestBody(): Promise<Account> {
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
}