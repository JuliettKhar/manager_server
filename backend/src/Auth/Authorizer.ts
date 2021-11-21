import {Account, SessionToken, TokenGenerator} from "../Server/Model";
import {UserCredentialsDBAccess} from "./UserCredentialsDBAccess";
import {SessionTokenDbAccess} from "./SessionTokenDbAccess";
import {TokenRights, TokenState, TokenValidator} from "../Shared/Model";


export class Authorizer implements TokenGenerator, TokenValidator {
    private userCredDbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    private sessionTokenDbAccess: SessionTokenDbAccess = new SessionTokenDbAccess()

    async generateToken(account: Account): Promise<SessionToken | undefined> {
        const {password, username} = account;

        const resAcc = await this.userCredDbAccess.getUserCredentials(password, username);
        console.log(resAcc)


        if (resAcc) {
            const token: SessionToken = {
                accessRights: resAcc.accessRights,
                expirationTime: Authorizer.generateExpirationTime(),
                username: resAcc.username,
                valid: true,
                tokenId: Authorizer.generateRandomTokenId()
            }
            await this.sessionTokenDbAccess.storeSessionToken(token);
            return token;
        } else {
            return undefined
        }
    }

    private static generateExpirationTime(): Date {
        return new Date((Date.now() + 36666000))
    }

    private static generateRandomTokenId() {
        return Math.random().toString(36).slice(2);
    }

    public async validateToken(tokenID: string): Promise<TokenRights> {
        const token = await this.sessionTokenDbAccess.getToken(tokenID)
        console.log(token, 'authorizer')

        if (!token?.valid) {
            return {
                accessRights: [],
                state: TokenState.INVALID
            }
        } else if(token.expirationTime < new Date()) {
            return {
                accessRights: [],
                state: TokenState.EXPIRED
            }
        }

        return {
            accessRights: token.accessRights,
            state: TokenState.VALID
        }
    }
}
