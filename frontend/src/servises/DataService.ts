import {User} from "../models/DataModels";

const baseUrl = 'http://localhost:4000';
const usersUrl = `${baseUrl}/users`;

export class DataService {
    public async getUsers(auth: string, query: string): Promise<User[]> {
        const url = `${usersUrl}?name=${query}`;
        const options = {
            method: 'GET',
            headers: {
                Authorization: auth
            }
        }

        const res = await fetch(url, options);
        return await res.json()
    }

    public async deleteUser(auth: string, user: User): Promise<void> {
        const url = `${usersUrl}?id=${user.id}`;
        const options = {
            method: 'DELETE',
            headers: {
                Authorization: auth
            }
        }

        const res = await fetch(url, options);
        return await res.json()
    }
}