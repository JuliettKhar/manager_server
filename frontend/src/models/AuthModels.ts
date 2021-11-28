
export interface SessionToken {
    username: string;
    valid: boolean;
    expirationTime: Date;
    accessRights: AccessRights[]
    tokenId: string;
}

export enum AccessRights {
    READ = 0,
    DELETE = 1,
    UPDATE = 2,
    CREATE = 3
}