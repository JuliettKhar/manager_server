import Nedb from 'nedb';
import {SessionToken} from "../Server/Model";

export class SessionTokenDbAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/SessionTokens.db');
        this.nedb.loadDatabase();
    }

    public async storeSessionToken(token: SessionToken): Promise<any>{
        return new Promise((resolve, reject) => {
            this.nedb.insert(token, ((err, newDoc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(token);
                }
            }));
        })
    }
}