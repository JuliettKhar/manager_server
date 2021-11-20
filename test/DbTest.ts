import {UserCredentialsDBAccess} from "../src/Auth/UserCredentialsDBAccess";
import {UsersDBAccess} from "../src/User/UsersDBAccess";

class DbTest {
    public DbAccess: UserCredentialsDBAccess = new UserCredentialsDBAccess();
    public UserDbAccess: UsersDBAccess = new UsersDBAccess();
}

new DbTest().DbAccess.putUserCredentials({
    password: '123',
    username: "test",
    accessRights: [0, 1,2,3]
});

new DbTest().UserDbAccess.putUser({
    name: "test",
    age: 30,
    email: 'test@mail.ru',
    id: 'fgsfgs',
    workingPosition: 3
});