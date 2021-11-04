import {Account, SessionToken, TokenGenerator} from "../Server/Model";


export class Authorizer implements TokenGenerator{
    async generateToken(account: Account): Promise<SessionToken | undefined> {
        return Promise.resolve(undefined);
    }
    
}