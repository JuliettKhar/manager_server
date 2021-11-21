import {Router} from "./Router";

export class Main {
    private router: Router = new Router();

    public constructor() {
        console.log(1)
    }

    public launchApp() {
        this.router.handleRequest();
    }
}

new Main().launchApp();