import Nedb from 'nedb';
import {User} from "../Shared/Model";

export class UsersDBAccess {
    private nedb: Nedb;

    constructor() {
        this.nedb = new Nedb('database/Users.db');
        this.nedb.loadDatabase();
    }

    public async putUser(user: User): Promise<void> {
        if (!user.id) {
          user.id = UsersDBAccess.generateUserId();
        }

        return new Promise((resolve, reject) => {
            this.nedb.insert(user, (err) => {
                if(err) { reject(err) }
                else {resolve()}
            })
        })
    }

    private static generateUserId() {
        return Math.random().toString(36).slice(2);
    }

    public async getUserById(id: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            this.nedb.find({id}, (err: Error | null, docs: any) => {
                if(err) { reject(err)}
                else { resolve(docs[0]) }
            })
        })
    }

    public async getUserByName(name: string): Promise<User[]> {
        const regEx = new RegExp(name);
        return new Promise((resolve, reject) => {
            this.nedb.find({name: regEx}, (err: Error | null, docs: any) => {
                if(err) { reject(err)}
                else { resolve(docs) }
            })
        })
    }

    public async deleteUser(id: string): Promise<boolean> {
        const isOperationSuccess =  await this.deleteUserFromDb(id);
        this.nedb.loadDatabase();

        return isOperationSuccess;

    }

    public async deleteUserFromDb(id: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.nedb.remove({id}, (err: Error | null, numRemove: number) => {
                if(err) { reject(err)}
                else { resolve(!!numRemove) }
            })
        })
    }
}