import {MainController} from "./controllers/MainController";
import {LoginController} from "./controllers/LoginController";


export class Router {
    private mainElement = document.getElementById('main-container')

    public handleRequest() {
        const route = Router.getRoute();

        switch (route) {
            case '/login':
                if (this.mainElement) {
                    this.mainElement.innerHTML = ''
                    const loginController: LoginController = new LoginController();
                    this.mainElement.append(loginController.createView())
                }
                break;
            default:
                if (this.mainElement) {
                    const mainController: MainController = new MainController();
                    this.mainElement.append(mainController.createView())
                }
                break;
        }
    }

    private static getRoute(): string {
        console.log(location.pathname)
        return location.pathname;
    }
    
}