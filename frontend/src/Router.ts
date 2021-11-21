

export class Router {

    public handleRequest() {
        console.log(Router.getRoute())
    }

    private static getRoute(): string {
        return location.pathname;
    }
    
}