import {Router} from "./Router";

export class Main {
    private router: Router = new Router();

    public constructor() {}

    public launchApp() {
        this.router.handleRequest();
    }
}

new Main().launchApp();