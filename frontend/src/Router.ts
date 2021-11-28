import {MainController} from "./controllers/MainController";
import {LoginController} from "./controllers/LoginController";
import {SessionToken} from "./models/AuthModels";
import {DashboardController} from "./controllers/DashboardController";


export class Router {
    private mainElement = document.getElementById('main-container')

    public handleRequest() {
        const route = Router.getRoute();

        switch (route) {
            case '/login':
                this.switchToLoginView();
                break;
            case '/board':
                this.switchToDashboardView(undefined);
                break;
            default:
                if (this.mainElement) {
                    const mainController: MainController = new MainController(this);
                    this.mainElement.append(mainController.createView())
                }
                break;
        }
    }

    public switchToLoginView() {
        if (this.mainElement) {
            this.mainElement.innerHTML = ''
            const loginController: LoginController = new LoginController(this);
            this.mainElement.append(loginController.createView())
        }
    }

    public switchToDashboardView(token: SessionToken | undefined) {
        if (this.mainElement) {
            this.mainElement.innerHTML = ''
            const dashboardController: DashboardController = new DashboardController(this);
            if (token) {
                dashboardController.setSessionToken(token)
            }
            this.mainElement.append(dashboardController.createView())
        }

    }

    private static getRoute(): string {
        return location.pathname;
    }

}