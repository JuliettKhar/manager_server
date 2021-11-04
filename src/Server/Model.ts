export interface Account {
    username: string;
    password: string;
}

export interface Handler {
    handleRequest(): void;
}

export interface SessionToken {
    
}

export interface TokenGenerator {
    generateToken(account: Account): Promise<SessionToken | undefined>;
}