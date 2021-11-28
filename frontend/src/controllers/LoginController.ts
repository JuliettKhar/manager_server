import {BaseController} from "./BaseController";

export class LoginController extends BaseController {
    private title = this.createElement('h2', 'please, login')
    private userName = this.createElement('label', 'User Name')
    private input = this.createElement('input')
    private br = this.createElement('br')
    private password = this.createElement('label', 'Password')
    private passwordInput = this.createElement('input')
     private br2 = this.createElement('br')
    private errorLabel = this.createElement('label')
     private br3= this.createElement('br')

    private button = this.createElement(
            'button',
            'login',
            () => {
                if (this.input.value && this.passwordInput.value) {
                    this.resetErrorLabel();
                } else {
                    this.showErrorLabel('fill in the form');
                }
            }
        )

    private resetErrorLabel() {
        this.errorLabel.style.visibility = 'hidden'
    }
        private showErrorLabel(msg :string) {
        this.errorLabel.innerText = msg;
        this.errorLabel.style.color = 'red';
        this.errorLabel.style.visibility = 'visible'
    }

    public createView(): HTMLDivElement {
        this.resetErrorLabel()
        this.passwordInput.type = 'Password'

        return this.container
    }
}