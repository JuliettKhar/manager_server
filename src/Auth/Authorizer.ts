import {Account, SessionToken, TokenGenerator} from "../Server/Model";
import {UserCredentialsDBAccess} from "./UserCredentialsDBAccess";
import {SessionTokenDbAccess} from "./SessionTokenDbAccess";


export class Authorizer implements TokenGenerator{
    private userCredDbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDbAccess: SessionTokenDbAccess = new SessionTokenDbAccess()

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const { password, username} = account;

        const resAcc = await this.userCredDbAccess.getUserCredentials(password, username);
        console.log(resAcc)


        if (resAcc) {
            const token: SessionToken = {
                accessRights: resAcc.accessRights,
                expirationTime: Authorizer.generateExpirationTime(),
                username: resAcc.username,
                valid: true,
                tokenId: this.generateRandomTokenId()
            }
            await this.sessionTokenDbAccess.storeSessionToken(token);
            return token;
        } else {
            return undefined
        }
    }
    private static generateExpirationTime(): Date {
        return new Date(Date.now() + 3600)
    }
    generateRandomTokenId() {
        return Math.random().toString(36).slice(2);
    }
}
