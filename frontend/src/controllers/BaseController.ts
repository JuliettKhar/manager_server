import {Router} from "../Router";

export abstract class BaseController {
    protected container = document.createElement('div');

    constructor(protected router: Router) {
        this.router = new Router();
    }

    public abstract createView(): HTMLDivElement

    protected createElement<K extends keyof HTMLElementTagNameMap>(
        elementType: K,
        innerText?: string,
        action?: any
    ): HTMLElementTagNameMap[K] {
        const element = document.createElement(elementType)
        if (innerText) {
            element.innerText = innerText;
        }
        if (action) {
            element.onclick = action;
        }
        this.container.append(element)
        return element
    }

    protected createBreak() {
        this.createElement('br');
    }
}