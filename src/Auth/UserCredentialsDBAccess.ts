import {UserCredentials} from "../Shared/Model";
import Nedb from 'nedb';

export class UserCredentialsDBAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/UserCredentials.db');
        this.nedb.loadDatabase();

    }


    public async putUserCredentials(userCreds: UserCredentials): Promise<any> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(userCreds, ((err, newDoc) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(newDoc);
                }
            }));
        })
    }

    public async getUserCredentials(password :string, username: string): Promise<UserCredentials | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find(
                {username, password},
                (err: Error, doc: (UserCredentials | PromiseLike<UserCredentials | undefined> | undefined)[]) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(doc[0])
                    }
                }
                )
        })
    }
}