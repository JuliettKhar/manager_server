
export class LoginService {
   public async login(userName: string, password: string) {
        if(userName === 'user' && password === '123') {
            return {
                username: 'Some user'
            } as any
        }
   }
}