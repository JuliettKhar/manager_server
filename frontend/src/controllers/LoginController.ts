import {BaseController} from "./BaseController";

export class LoginController extends BaseController {
    public createView(): HTMLDivElement {
        const title = this.createElement('h2', 'please, login')
        const userName = this.createElement('label', 'User Name')
        const input = this.createElement('input')
        const password = this.createElement('label', 'Password')
        const passwordInput = this.createElement('input')
        passwordInput.type = 'Password'
        const button = this.createElement('button', 'login')

        this.container.append(title, userName, input, password, passwordInput, button)
        return this.container
    }
}