import {AccessRights} from "../Shared/Model";

export interface Account {
    username: string;
    password: string;
}

export interface Handler {
    handleRequest(): void;
}

export interface SessionToken {
    username: string;
    valid: boolean;
    expirationTime: Date;
    accessRights: AccessRights[]
    tokenId: string;
}

export interface TokenGenerator {
    generateToken(account: Account): Promise<SessionToken | undefined>;
}