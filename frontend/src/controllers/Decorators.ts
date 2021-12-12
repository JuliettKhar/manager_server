import {BaseController} from "./BaseController";

export function LinkTextValue(elementId: string) {
    return function (target: BaseController, key: string) {
        let prop = (target as any)[key]

        const getter = () => prop;
        const setter = (newVal: any) => {
            const element = document.getElementById(elementId)
            prop = newVal;

            if (element) {
                element.innerText = newVal;

                if (newVal) {
                    element.style.visibility = 'visible'
                } else {
                    element.style.visibility = 'hidden'
                }
            }
        };

        Object.defineProperty(target, key, {
            get: getter,
            set: setter,
            configurable: true,
            enumerable: true
        })
    }
}