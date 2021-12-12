import {BaseController} from "./BaseController";
import {LoginService} from "../servises/LoginService";
import {LinkTextValue} from "./Decorators";

export class LoginController extends BaseController {
    private loginService = new LoginService();

    private title = this.createElement('h2', 'please, login')
    private userName = this.createElement('label', 'User Name')
    private input = this.createElement('input')
    private br = this.createElement('br')
    private password = this.createElement('label', 'Password')
    private passwordInput = this.createElement('input')
     private br2 = this.createElement('br')
    private errorLabel = this.createElement('label')
     private br3= this.createElement('br')

    @LinkTextValue('errorLabel')
    private errorLabelText: string = ''

    private button = this.createElement(
            'button',
            'login',
            async () => {
                if (this.input.value && this.passwordInput.value) {
                    this.errorLabelText = '';
                    const res = await this.loginService.login(this.input.value, this.passwordInput.value)

                    if (res) {
                        this.router.switchToDashboardView(res)
                    } else {
                        this.errorLabelText = 'invalid creds'
                    }
                } else {
                    this.errorLabelText = 'fill in the form';
                }
            }
        )

    public createView(): HTMLDivElement {
        this.errorLabel.id = 'errorLabel';
        this.errorLabel.style.color = 'red';
        this.passwordInput.type = 'Password'

        return this.container
    }
}