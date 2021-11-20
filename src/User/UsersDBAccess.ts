import Nedb from 'nedb';
import {User} from "../Shared/Model";

export class UsersDBAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void> {
        return new Promise((resolve, reject) => {
            this.nedb.insert(user, (err) => {
                if(!err) { reject(err) }

                resolve();
            })
        })
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({id}, (err: Error | null, docs: any) => {
                if(err) { reject(err)}
                else { resolve(docs[0]) }
            })
        })
    }
}