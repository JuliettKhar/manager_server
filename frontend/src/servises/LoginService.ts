const baseUrl = 'http://localhost:4000';
const loginUrl = `${baseUrl}/login`;

export class LoginService {
   public async login(username: string, password: string) {
       let options = {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               username,
               password
           })
       }

       const res = await fetch(loginUrl, options)
       if (res.status === 201) {
           return await res.json();
       } else {
           return undefined;
       }
        // if(username === 'user' && password === '123') {
        //     return {
        //         username: 'Some user'
        //     } as any
        // }
   }
}