import {BaseController} from "./BaseController";
import {SessionToken} from "../models/AuthModels";

export class DashboardController extends BaseController {
    private sessionToken: SessionToken | undefined;

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        this.createElement('h2', 'Dashboard')

        if (this.sessionToken) {
            this.createElement('label', `welcome ${this.sessionToken.username}`)
        }
        return this.container
    }
}