import {BaseController} from "./BaseController";
import {AccessRights, SessionToken} from "../models/AuthModels";
import {DataService} from "../servises/DataService";

export class DashboardController extends BaseController {
    private sessionToken: SessionToken | undefined;
    private searchArea: HTMLInputElement | undefined;
    private searchResultArea: HTMLDivElement | undefined;
    private dataService: DataService = new DataService();

    public setSessionToken(sessionToken: SessionToken) {
        this.sessionToken = sessionToken;
    }

    public createView(): HTMLDivElement {
        this.createElement('h2', 'Dashboard')

        if (this.sessionToken) {
            this.createElement('label', `welcome ${this.sessionToken.username}`)
            this.createBreak();
            this.generateButtons();
        }
        return this.container
    }

    private generateButtons() {
        if (this.sessionToken) {
            for (const access of this.sessionToken.accessRights) {
                this.createElement('button', AccessRights[access], async () => {
                    await this.triggerActionButton(access);
                })
            }

            if (this.sessionToken.accessRights.includes(AccessRights.READ)) {
                this.createBreak();
                this.createElement('label', 'Search');
                this.searchArea = this.createElement('input');
                this.searchResultArea = this.createElement('div');

            }
        }
    }

    public async triggerActionButton(access: AccessRights) {
        switch (access) {
            case AccessRights.READ:
                const users = await this.dataService.getUsers(
                    this.sessionToken!.tokenId,
                    this.searchArea!.value
                )

                for (const user of users) {
                    this.searchResultArea?.append(
                        this.createElement('label', user.name)
                    )
                    this.searchResultArea?.append(
                        this.createElement('br')

                    )
                }
                break;

            default:
                break
        }
    }
}