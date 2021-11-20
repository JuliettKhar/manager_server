import { Account } from "../Server/Model";

export enum AccessRights {
    READ = 0,
    DELETE = 1,
    UPDATE = 2,
    CREATE = 3
}

export enum HTTP_CODES {
    OK=200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401
}

export enum HTTP_METHODS {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE'
}

export interface UserCredentials extends Account {
    accessRights:AccessRights[];
}

export interface User {
    id: string;
    name: string;
    age: number;
    email: string;
    workingPosition: workingPosition;
}

export enum workingPosition {
    JUNIOR,
    PROGRAMMER,
    ENGINEER,
    MANAGER,
    EXPERT
}

export enum TokenState {
    VALID,
    INVALID,
    EXPIRED
}

export interface TokenRights {
    accessRights:AccessRights[];
    state: TokenState
}

export interface TokenValidator {
    validateToken: (tokenID: string) => Promise<TokenRights>;
}