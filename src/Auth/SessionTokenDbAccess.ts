import Nedb from 'nedb';
import {SessionToken} from "../Server/Model";

export class SessionTokenDbAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/SessionTokens.db');
        this.nedb.loadDatabase();
    }

    public async storeSessionToken(token: SessionToken): Promise<any> {
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

    public async getToken(tokenId: string): Promise<SessionToken | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({tokenId}, (err: Error, docs: any[]) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(docs[0])
                }
            })
        })
    }
}